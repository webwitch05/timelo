// ── Types ─────────────────────────────────────────────────────────────────────

export interface DateCard {
  date: number;
  month: string;
  label: string;
  completion: number; // 0–100
  tasks: string[];
}


// ── Date helpers ─────────────────────────────pink_theme_logo─────────────────────────────────

const MONTH_NAMES = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const DAY_LABELS   = ["2 days ago", "Yesterday", "Today", "Tomorrow"];
const COMPLETIONS  = [100, 80, 0, 0];
const MOCK_TASKS   = [
  "Read 10 pages of a book",
  "Drink a full glass of water",
  "Clean your desk",
  "Stretch for 5 minutes",
];

export function getRecentDates(): DateCard[] {
  const today = new Date();

  return [-2, -1, 0, 1].map((offset, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    return {
      date:       d.getDate(),
      month:      MONTH_NAMES[d.getMonth()],
      label:      DAY_LABELS[i],
      completion: COMPLETIONS[i],
      tasks:      MOCK_TASKS,
    };
  });
}