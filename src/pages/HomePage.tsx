import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { type Theme, THEMES } from "../theme";
import DateCardGrid from '../components/DateCardGrid'
import ThemeTileGrid from '../components/ThemeTileGrid'
import "../css/HomePage.css";

// ── HomePage ──────────────────────────────────────────────────────────────────

interface HomePageProps {
  theme: Theme;
  onNavigate?: () => void;
  onThemeChange?: (theme: Theme) => void;
}

export default function HomePage({ theme, onNavigate, onThemeChange }: HomePageProps) {
  const t = THEMES[theme];

  const handleThemeSelect = (newTheme: Theme) => {
    onThemeChange?.(newTheme);   // notify App.tsx
  };  

  return (
    <div className="home-page" style={{ background: t.bg }}>

      {/* Arrow */}
      <button
        className="rightArrow-btn"
        style={{ color: t.cardBg }}
        onClick={onNavigate}
      >
        <BsArrowRight size={40} strokeWidth={0.5} />
      </button>

      {/* Logo */}
      <h1 className="logo" style={{ color: t.cardBg }}>
        Timelo
      </h1>

      {/* Body: theme tiles left, date cards right */}
      <div className="home-body">
        <ThemeTileGrid activeTheme={theme} onSelect={handleThemeSelect} />
        <DateCardGrid theme={theme} />
      </div>

    </div>
  );
}