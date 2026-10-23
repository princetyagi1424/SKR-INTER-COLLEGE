import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { requireAuth, canManageStudents, AuthError } from "@/lib/auth";
import { Gender, EnrollmentStatus } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_ROWS = 2000;

// In-memory job store for demo; use Redis/DB in production
const jobs = new Map<string, {
  rows: Array<Record<string, string>>;
  mapping: Record<string, string>;
  valid: Array<{ row: number; data: Record<string, string> }>;
  createdById: string;
}>();

function parseSheet(buffer: Buffer): { headers: string[]; rows: Record<string, string>[] } {
  const wb = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
  if (json.length === 0) return { headers: [], rows: [] };
  const headers = Object.keys(json[0]);
  const rows = json.map((r) => {
    const out: Record<string, string> = {};
    for (const h of headers) {
      const v = r[h];
      out[h] = v == null ? "" : String(v).trim();
    }
    return out;
  });
  return { headers, rows };
}

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");
  if (action === "template") {
    // Generate Excel template
    const ws = XLSX.utils.aoa_to_sheet([
      [
        "Admission Number",
        "First Name",
        "Last Name",
        "Class",
        "Section",
        "Roll Number",
        "Gender",
        "Date of Birth",
        "Phone",
        "Email",
        "Father Name",
        "Mother Name",
        "Address",
      ],
      [
        "SKR2025100",
        "Demo",
        "Student",
        "Class 11",
        "A",
        "10",
        "Male",
        "2010-05-15",
        "9876543210",
        "demo@example.com",
        "Father Name",
        "Mother Name",
        "Village, Agra",
      ],
      [],
      ["INSTRUCTIONS:"],
      ["1. Do not change the header row."],
      ["2. Admission Number must be unique."],
      ["3. Class must match an existing class name (e.g. Class 11)."],
      ["4. Gender: Male / Female / Other"],
      ["5. Date of Birth: YYYY-MM-DD preferred."],
      ["6. Never put passwords in this file."],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    return new NextResponse(buf, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="SKR_Student_Import_Template.xlsx"',
      },
    });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    if (!canManageStudents(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const contentType = req.headers.get("content-type") || "";

    // JSON confirm
    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (body.action === "confirm") {
        const job = jobs.get(body.jobId);
        if (!job || job.createdById !== user.id) {
          return NextResponse.json({ error: "Job not found or expired" }, { status: 404 });
        }

        const session = await prisma.academicSession.findFirst({ where: { isCurrent: true } });
        if (!session) {
          return NextResponse.json({ error: "No current academic session" }, { status: 400 });
        }

        let imported = 0;
        let skipped = 0;
        let failed = 0;

        for (const item of job.valid) {
          const d = item.data;
          try {
            const existing = await prisma.student.findUnique({
              where: { admissionNumber: d.admissionNumber },
            });
            if (existing) {
              skipped++;
              continue;
            }

            // Resolve class
            const cls = await prisma.class.findFirst({
              where: {
                name: { equals: d.className, mode: "insensitive" },
                academicSessionId: session.id,
              },
              include: { sections: true },
            });
            if (!cls) {
              failed++;
              continue;
            }

            let sectionId: string | undefined;
            if (d.sectionName) {
              const sec = cls.sections.find(
                (s) => s.name.toLowerCase() === d.sectionName.toLowerCase()
              );
              sectionId = sec?.id;
            }

            let gender: Gender | undefined;
            if (d.gender) {
              const g = d.gender.toLowerCase();
              if (g === "male" || g === "m" || g === "पुरुष") gender = Gender.MALE;
              else if (g === "female" || g === "f" || g === "महिला") gender = Gender.FEMALE;
              else gender = Gender.OTHER;
            }

            const student = await prisma.student.create({
              data: {
                admissionNumber: d.admissionNumber,
                firstName: d.firstName,
                lastName: d.lastName || null,
                gender,
                phone: d.phone || null,
                email: d.email || null,
                address: d.address || null,
                dateOfBirth: d.dateOfBirth ? new Date(d.dateOfBirth) : null,
              },
            });

            await prisma.enrollment.create({
              data: {
                studentId: student.id,
                classId: cls.id,
                sectionId: sectionId || null,
                academicSessionId: session.id,
                rollNumber: d.rollNumber || null,
                status: EnrollmentStatus.ENROLLED,
              },
            });

            imported++;
          } catch {
            failed++;
          }
        }

        // Audit
        await prisma.importJob.create({
          data: {
            type: "STUDENTS",
            status: "COMPLETED",
            totalRows: job.rows.length,
            validRows: job.valid.length,
            importedRows: imported,
            skippedRows: skipped,
            createdById: user.id,
            completedAt: new Date(),
            mapping: job.mapping,
          },
        });

        await prisma.auditLog.create({
          data: {
            actorId: user.id,
            action: "BULK_IMPORT_STUDENTS",
            entityType: "Student",
            details: { imported, skipped, failed },
          },
        });

        jobs.delete(body.jobId);
        return NextResponse.json({ imported, skipped, failed });
      }
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    // Multipart form
    const form = await req.formData();
    const action = form.get("action") as string;
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 400 });
    }

    const name = file.name.toLowerCase();
    if (!name.endsWith(".xlsx") && !name.endsWith(".xls") && !name.endsWith(".csv")) {
      return NextResponse.json({ error: "Invalid file type. Use .xlsx, .xls or .csv" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Basic magic-byte check for xlsx (PK zip)
    if (name.endsWith(".xlsx") && buffer[0] !== 0x50 && buffer[1] !== 0x4b) {
      // soft check only
    }

    const { headers, rows } = parseSheet(buffer);
    if (rows.length === 0) {
      return NextResponse.json({ error: "Spreadsheet is empty" }, { status: 400 });
    }
    if (rows.length > MAX_ROWS) {
      return NextResponse.json({ error: `Too many rows (max ${MAX_ROWS})` }, { status: 400 });
    }

    if (action === "headers") {
      return NextResponse.json({ headers, rowCount: rows.length });
    }

    if (action === "preview") {
      const mapping = JSON.parse((form.get("mapping") as string) || "{}") as Record<string, string>;
      // Invert mapping: field -> column
      const fieldToCol: Record<string, string> = {};
      for (const [col, field] of Object.entries(mapping)) {
        if (field) fieldToCol[field] = col;
      }

      const previewRows = [];
      let validCount = 0;
      let invalidCount = 0;
      let dupCount = 0;
      const valid: Array<{ row: number; data: Record<string, string> }> = [];

      for (let i = 0; i < rows.length; i++) {
        const raw = rows[i];
        const data: Record<string, string> = {};
        for (const [field, col] of Object.entries(fieldToCol)) {
          data[field] = raw[col] || "";
        }
        const errors: string[] = [];
        if (!data.admissionNumber) errors.push("Missing admission number");
        if (!data.firstName) errors.push("Missing first name");
        if (!data.className) errors.push("Missing class");

        let isDuplicate = false;
        if (data.admissionNumber) {
          const exists = await prisma.student.findUnique({
            where: { admissionNumber: data.admissionNumber },
            select: { id: true },
          });
          if (exists) {
            isDuplicate = true;
            dupCount++;
          }
        }

        const isValid = errors.length === 0 && !isDuplicate;
        if (isValid) {
          validCount++;
          valid.push({ row: i + 2, data });
        } else if (!isDuplicate) {
          invalidCount++;
        }

        previewRows.push({
          row: i + 2,
          data,
          errors,
          isDuplicate,
          isValid,
        });
      }

      const jobId = crypto.randomUUID();
      jobs.set(jobId, { rows, mapping, valid, createdById: user.id });

      // Expire after 30 min
      setTimeout(() => jobs.delete(jobId), 30 * 60 * 1000);

      return NextResponse.json({
        totalRows: rows.length,
        validRows: validCount,
        invalidRows: invalidCount,
        duplicates: dupCount,
        rows: previewRows,
        mapping,
        jobId,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("Import error:", err);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
