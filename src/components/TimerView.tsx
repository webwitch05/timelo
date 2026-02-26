import "../css/TimerView.css";
import { type Theme, THEMES } from "../theme";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TimerViewProps {
  theme: Theme;
  timeDisplay?: string;       // e.g. "00:00" or "60:00"
  selectedTask?: string;      // task name, undefined = none selected
  onSelectTask?: () => void;
  onStart?: () => void;
}

// ── TimerView ─────────────────────────────────────────────────────────────────

export default function TimerView({
  theme,
  timeDisplay = "00:00",
  selectedTask,
  onSelectTask,
  onStart,
}: TimerViewProps) {
  const t = THEMES[theme];

  return (
    <>
      {/* Timer card */}
      <div className="timer-card" style={{ background: `linear-gradient(to left, ${t.timerCardL}99, ${t.timerCardR}99)` }}>

        {/* Time */}
        <div className="timer-display">
          <span className="timer-display-time" style={{ color: t.timerText }}>
            {timeDisplay}
          </span>
        </div>

        {/* Select task bar */}
        <button
          className="timer-select-task"
          style={{
            color: t.subtext,
          }}
          onClick={onSelectTask}
        >
          {selectedTask ?? "Select Task"}
        </button>

      </div>

      {/* Start button */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button
          className="timer-start-btn"
          style={{
            background: t.cardBg,
            color: t.text,
          }}
          onClick={onStart}
        >
          Start
        </button>
      </div>
    </>
  );
}