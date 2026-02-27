import { useEffect, useState } from "react";
import { secondsToDisplay } from "../data/timerViewData";
import { type TimerState } from "../hooks/useCountdown";
import "../css/CountdownTimer.css";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CountdownTimerProps {
  secondsLeft: number;
  timerState: TimerState;
  color: string;
  onEditTime?: (seconds: number) => void;
}

// ── ScrollDigit ───────────────────────────────────────────────────────────────

interface ScrollDigitProps {
  value: string;
  color: string;
}

function ScrollDigit({ value, color }: ScrollDigitProps) {
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    if (value === prev) return;
      const timeout = setTimeout(() => setPrev(value), 350); 
      return () => clearTimeout(timeout);
  }, [value]);

  return (
    <span className="scroll-digit-wrapper">
      {/* outgoing digit */}
      <div
        className={`scroll-digit-strip ${value !== prev ? 'is-moving' : ''}`}
        style={{ color }}
      >
        <span className="scroll-digit">{prev}</span>
        <span className="scroll-digit">{value}</span>
      </div>
    </span>
  );
}

// ── EditableTime ──────────────────────────────────────────────────────────────

interface EditableTimeProps {
  color: string;
  onChange: (seconds: number) => void;
}

function EditableTime({ color, onChange }: EditableTimeProps) {
  const [hh, setHh] = useState("00");
  const [mm, setMm] = useState("00");
  const [ss, setSs] = useState("00");

  function clamp(val: string, max: number): string {
    const n = parseInt(val) || 0;
    return String(Math.min(n, max)).padStart(2, "0");
  }

  function handleChange(
    setter: (v: string) => void,
    max: number,
    val: string
  ) {
    const clean = val.replace(/\D/g, "").slice(0, 2);
    setter(clean);

    // compute new total seconds and notify parent
    const h = setter === setHh ? parseInt(clean) || 0 : parseInt(hh) || 0;
    const m = setter === setMm ? parseInt(clean) || 0 : parseInt(mm) || 0;
    const s = setter === setSs ? parseInt(clean) || 0 : parseInt(ss) || 0;
    onChange(h * 3600 + m * 60 + s);
  }

  function handleBlur(setter: (v: string) => void, val: string, max: number) {
    setter(clamp(val, max));
  }

  const inputStyle = { color, caretColor: color };

  return (
    <div className="editable-time">
      <input
        className="editable-time-input"
        style={inputStyle}
        value={hh}
        maxLength={2}
        onChange={(e) => handleChange(setHh, 99, e.target.value)}
        onBlur={() => handleBlur(setHh, hh, 99)}
      />
      <span className="countdown-colon" style={{ color }}>:</span>
      <input
        className="editable-time-input"
        style={inputStyle}
        value={mm}
        maxLength={2}
        onChange={(e) => handleChange(setMm, 59, e.target.value)}
        onBlur={() => handleBlur(setMm, mm, 59)}
      />
      <span className="countdown-colon" style={{ color }}>:</span>
      <input
        className="editable-time-input"
        style={inputStyle}
        value={ss}
        maxLength={2}
        onChange={(e) => handleChange(setSs, 59, e.target.value)}
        onBlur={() => handleBlur(setSs, ss, 59)}
      />
    </div>
  );
}

// ── CountdownTimer ────────────────────────────────────────────────────────────

export default function CountdownTimer({ secondsLeft, timerState, color, onEditTime }: CountdownTimerProps) {
  const display = secondsToDisplay(secondsLeft);
  const [hh, mm, ss] = display.split(":");

  // extend mode — show editable inputs
  if (timerState === "extend") {
    return (
      <div className="countdown-timer">
        <EditableTime color={color} onChange={onEditTime ?? (() => {})} />
      </div>
    );
  }

  return (
    <div className="countdown-timer">
      <ScrollDigit value={hh} color={color} />
      <span className="countdown-colon" style={{ color }}>:</span>
      <ScrollDigit value={mm} color={color} />
      <>
          <span className="countdown-colon" style={{ color }}>:</span>
          <ScrollDigit value={ss} color={color} />
      </>
    </div>
  );
}