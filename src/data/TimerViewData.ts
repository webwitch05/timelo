// ── Types ─────────────────────────────────────────────────────────────────────

export interface Task {
  id: number;
  date: string;       // "YYYY-MM-DD"
  title: string;
  duration: string;   // "1hr", "30mins", etc.
}

// ── Fake database ─────────────────────────────────────────────────────────────

export const TASK_DB: Task[] = [
  { id: 1, date: "2026-02-27", title: "Clean your room",         duration: "1hr"     },
  { id: 2, date: "2026-02-27", title: "Home workout",            duration: "30mins"  },
  { id: 3, date: "2026-02-27", title: "Read a book chapter",     duration: "45mins"  },
  { id: 4, date: "2026-02-28", title: "Journal your thoughts",   duration: "20mins"  },
  { id: 5, date: "2026-02-28", title: "Draw something creative", duration: "1hr"     },
  { id: 6, date: "2026-03-01", title: "Cook a new recipe",       duration: "1hr 30mins" },
  { id: 7, date: "2026-03-01", title: "Digital detox",           duration: "2hrs"    },
  { id: 8, date: "2026-03-03", title: "Meditate & stretch",      duration: "15mins"  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns unique sorted dates that have at least one task */
export function getAvailableDates(): string[] {
  const dates = [...new Set(TASK_DB.map((t) => t.date))];
  return dates.sort();
}

/** Returns tasks for a specific date */
export function getTasksByDate(date: string): Task[] {
  return TASK_DB.filter((t) => t.date === date);
}