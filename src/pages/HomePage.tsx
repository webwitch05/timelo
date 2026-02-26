import { useState } from "react";
import { type Theme, THEMES } from "../theme";
import DateCardGrid from '../components/DateCardGrid'
import ThemeTileGrid from '../components/ThemeTileGrid'
import "../css/HomePage.css";

// ── HomePage ──────────────────────────────────────────────────────────────────

interface HomePageProps {
  onNavigate?: () => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [theme, setTheme] = useState<Theme>("red");
  const t = THEMES[theme];

  return (
    <div className="home-page" style={{ background: t.bg }}>

      {/* Arrow */}
      <button
        className="arrow-btn"
        style={{ color: t.cardBg }}
        onClick={onNavigate}
      >
        →
      </button>

      {/* Logo */}
      <h1 className="logo" style={{ color: t.cardBg }}>
        Timelo
      </h1>

      {/* Body: theme tiles left, date cards right */}
      <div className="home-body">
        <ThemeTileGrid activeTheme={theme} onSelect={setTheme} />
        <DateCardGrid theme={theme} />
      </div>

    </div>
  );
}