import { type Theme, THEMES } from "../theme";
import { type TimerState } from "../hooks/useCountdown";
import "../css/TimerButtons.css";

// ── Types ─────────────────────────────────────────────────────────────────────

interface TimerButtonsProps {
  theme: Theme;
  timerState: TimerState;
  hasTask: boolean;
  hasEditedTime: boolean;
  onStartPauseResume: () => void;
  onYes: () => void;
  onNo: () => void;
  onExtend: () => void;
}

// ── TimerButtons ──────────────────────────────────────────────────────────────

export default function TimerButtons({
  theme,
  timerState,
  hasTask,
  hasEditedTime,
  onStartPauseResume,
  onYes,
  onNo,
  onExtend,
}: TimerButtonsProps) {
  const t = THEMES[theme];

  const startLabel =
    timerState === "running" ? "Pause"  :
    timerState === "paused"  ? "Resume" :
    "Start";

  return (
    <div className="timer-buttons">

      {/* ── Start / Pause / Resume ── */}
      {(timerState === "idle" || timerState === "running" || timerState === "paused") && (
        <button
          className="timer-btn timer-btn--main"
          style={{ background: t.cardBg, color: t.text }}
          onClick={onStartPauseResume}
          disabled={!hasTask}
        >
          {startLabel}
        </button>
      )}

      {/* ── Yes / No ── */}
      {timerState === "completed" && (
        <div className="timer-btn-group">
          <button
            className="timer-btn timer-btn--half"
            style={{ background: t.cardBg, color: t.text }}
            onClick={onYes}
          >
            Yes
          </button>
          <button
            className="timer-btn timer-btn--half"
            style={{ background: t.cardBg, color: t.text }}
            onClick={onNo}
          >
            No
          </button>
        </div>
      )}

      {/* ── Extend ── */}
      {timerState === "extend" && (
        <button
          className="timer-btn timer-btn--main"
          style={{ background: t.cardBg, color: t.text }}
          onClick={onExtend}
          disabled={!hasEditedTime}
        >
          Extend
        </button>
      )}
    </div>
  );
}