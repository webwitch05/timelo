import { type Theme, THEMES,  } from "../theme";
// ── ThemeTileGrid ─────────────────────────────────────────────────────────────

interface ThemeSelectorProps {
  activeTheme: Theme;
  onSelect: (theme: Theme) => void;
}

export default function ThemeTileGrid({ activeTheme, onSelect }: ThemeSelectorProps) {
  const t = THEMES[activeTheme];

  return (
    <div className="tile-grid">
      {(Object.keys(THEMES) as Theme[]).map((themeKey) => (
        <div
          key={themeKey}
          className={`theme-tile ${activeTheme === themeKey ? "active" : ""}`}
          style={{ background: THEMES[themeKey].bg }}
          onClick={() => onSelect(themeKey)}
        >
          <img src={THEMES[themeKey].imageUrl} alt={`${themeKey} theme preview`} />
        </div>
      ))}

      {/* Placeholder tiles for future themes */}
      <div className="theme-tile theme-tile--placeholder"
        style={{ color: t.subtext, background: "#A0A0A0" }}>
        <span>To be designed</span>
      </div>
      <div className="theme-tile theme-tile--placeholder"
        style={{ color: t.subtext, background: "#A0A0A0" }}>
        <span>To be designed</span>
      </div>      
    </div>
  );
}