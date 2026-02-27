// ── Types ─────────────────────────────────────────────────────────────────────

export interface Duration {
  hours: number;
  mins: number;
}

export interface Task {
  id: number;
  date: string;       // "YYYY-MM-DD"
  title: string;
  duration: Duration;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert Duration to total seconds */
export function durationToSeconds(duration: Duration): number {
  return duration.hours * 3600 + duration.mins * 60;
}

/** Convert total seconds to "HH:MM:SS" display string */
export function secondsToDisplay(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

/** Convert Duration to display string directly */
export function durationToDisplay(duration: Duration): string {
  return secondsToDisplay(durationToSeconds(duration));
}

// ── Fake database ─────────────────────────────────────────────────────────────

export const TASK_DB: Task[] = [
  { id: 1, date: "2026-02-27", title: "Clean your room",         duration: { hours: 1, mins: 0  } },
  { id: 2, date: "2026-02-27", title: "Home workout",            duration: { hours: 0, mins: 30 } },
  { id: 3, date: "2026-02-27", title: "Read a book chapter",     duration: { hours: 0, mins: 45 } },
  { id: 4, date: "2026-02-28", title: "Journal your thoughts",   duration: { hours: 0, mins: 20 } },
  { id: 5, date: "2026-02-28", title: "Draw something creative", duration: { hours: 1, mins: 0  } },
  { id: 6, date: "2026-03-01", title: "Cook a new recipe",       duration: { hours: 1, mins: 30 } },
  { id: 7, date: "2026-03-01", title: "Digital detox",           duration: { hours: 2, mins: 0  } },
  { id: 8, date: "2026-03-03", title: "Meditate & stretch",      duration: { hours: 0, mins: 0.2 } },
];

// ── Query helpers ─────────────────────────────────────────────────────────────

/** Returns unique sorted dates that have at least one task */
export function getAvailableDates(): string[] {
  const dates = [...new Set(TASK_DB.map((t) => t.date))];
  return dates.sort();
}

/** Returns tasks for a specific date */
export function getTasksByDate(date: string): Task[] {
  return TASK_DB.filter((t) => t.date === date);
}