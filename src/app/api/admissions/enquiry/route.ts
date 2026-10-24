import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const studentName = String(body.studentName || "").trim();
    const guardianName = String(body.guardianName || body.fatherName || "").trim();
    const phone = String(body.phone || "").trim().replace(/\s+/g, "");
    const email = String(body.email || "").trim().toLowerCase() || null;
    const applyingClass = String(body.applyingClass || "").trim() || null;
    const address = String(body.address || "").trim() || null;
    const message = String(body.message || "").trim() || null;

    if (!studentName || !phone) {
      return NextResponse.json(
        { error: "Student name and phone are required" },
        { status: 400 }
      );
    }
    if (!/^[6-9]\d{9}$/.test(phone) && !/^\+?\d{10,15}$/.test(phone)) {
      return NextResponse.json({ error: "Enter a valid mobile number" }, { status: 400 });
    }

    const applicationNo = `SKR-ADM-${Date.now().toString(36).toUpperCase()}`;

    const app = await prisma.admissionApplication.create({
      data: {
        applicationNo,
        studentName,
        fatherName: guardianName || null,
        phone,
        email,
        applyingClass,
        address,
        remarks: message,
        status: "SUBMITTED",
      },
    });

    return NextResponse.json({
      applicationNo: app.applicationNo,
      id: app.id,
      message: "Enquiry submitted successfully",
    });
  } catch (err) {
    console.error("Admission enquiry error:", err);
    return NextResponse.json({ error: "Could not save enquiry. Please try again." }, { status: 500 });
  }
}
