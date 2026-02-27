import { useState, useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type TimerState = "idle" | "running" | "paused" | "completed" | "extend";

interface UseCountdownReturn {
  secondsLeft: number;
  timerState: TimerState;
  start: () => void;
  pause: () => void;
  resume: () => void;
  extend: (extraSecs: number) => void;
  reset: (newSeconds: number) => void;
  setInitial: (seconds: number) => void;
  setExtendMode: () => void;
}

// ── useCountdown ──────────────────────────────────────────────────────────────

export function useCountdown(): UseCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerState, setTimerState]   = useState<TimerState>("idle");
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Tick ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (timerState === "running") {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setTimerState("completed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerState]);

  // ── Actions ────────────────────────────────────────────────────────────────

  function setInitial(seconds: number) {
    setSecondsLeft(seconds);
    setTimerState("idle");
  }

  function setExtendMode() {
    setSecondsLeft(0);
    setTimerState("extend");
  }

  function start() {
    if (timerState === "idle") setTimerState("running");
  }

  function pause() {
    if (timerState === "running") setTimerState("paused");
  }

  function resume() {
    if (timerState === "paused") setTimerState("running");
  }

  function extend(extraSecs: number) {
    setSecondsLeft(extraSecs);
    setTimerState("running");
  }

  function reset(newSeconds: number) {
    setSecondsLeft(newSeconds);
    setTimerState("idle");
  }

  return { secondsLeft, timerState, start, pause, resume, extend, reset, setInitial, setExtendMode };
}