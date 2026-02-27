import { type Theme, THEMES } from "../theme";
import { type DateCard, getRecentDates } from "../data/homePageData";

// ── DateCard ──────────────────────────────────────────────────────────────────
interface DateCardTileProps {
  card: DateCard;
  theme: Theme;
}

function DateCardTile({ card, theme }: DateCardTileProps) {
  const t = THEMES[theme];

  return (
    <div
      className="date-card"
      style={{ background: t.cardBg }}
    >
      <span
        className="completion-badge"
        style={{ color: t.text }}
      >
        {card.completion}%
      </span>

      <div className="card-date" style={{ color: t.text }}>
        {card.date}
      </div>
    </div>
  );
}


// ── DateCardGrid ──────────────────────────────────────────────────────────────────
interface DateCardGridProps {
  theme: Theme;
}

export default function DateCardGrid({ theme }: DateCardGridProps) {
  const dates = getRecentDates();

  return (
    <div className="tile-grid">
      {dates.map((card, i) => (
        <DateCardTile key={i} card={card} theme={theme} />
      ))}
    </div>
  );
}