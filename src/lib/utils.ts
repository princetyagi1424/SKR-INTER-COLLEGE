import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined, locale = "en-IN") {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateAdmissionNumber(prefix = "SKR", year?: number) {
  const y = year || new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${y}${rand}`;
}

export function generateApplicationNumber() {
  const y = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `APP${y}${rand}`;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
