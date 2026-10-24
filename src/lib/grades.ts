export function gradeFromPercentage(pct: number | null | undefined): string {
  if (pct == null || Number.isNaN(pct)) return "—";
  if (pct >= 90) return "A+";
  if (pct >= 75) return "A";
  if (pct >= 60) return "B";
  if (pct >= 45) return "C";
  if (pct >= 33) return "D";
  return "F";
}

export function resultFromPercentage(pct: number | null | undefined, passing = 33): string {
  if (pct == null || Number.isNaN(pct)) return "INCOMPLETE";
  return pct + 1e-9 >= passing ? "PASS" : "FAIL";
}
