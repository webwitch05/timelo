import { useState } from "react";
import { type Theme, THEMES } from "../theme";
import TimerButtons from "./TimerButtons";
import TaskPickerPanel from "./TaskPickerPanel";
import CountdownTimer from "./CountdownTimer";
import { useCountdown } from "../hooks/useCountdown";
import { type Task, durationToSeconds } from "../data/timerViewData";
import "../css/TimerView.css";

// ── Types ─────────────────────────────────────────────────────────────────────

type Panel = "default" | "picker";

interface TimerViewProps {
  theme: Theme;
}

// ── TimerView ─────────────────────────────────────────────────────────────────

export default function TimerView({ theme }: TimerViewProps){
  const t = THEMES[theme];
  const [panel, setPanel]= useState<Panel>("default");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editedSeconds, setEditedSeconds] = useState(0);
  const { secondsLeft, timerState, start, pause, resume, extend, setInitial, setExtendMode } = useCountdown();

// ── Handlers ────────────────────────────────────────────────────────────────

  function handleSelectTask(task: Task) {
    setSelectedTask(task);
    setInitial(durationToSeconds(task.duration));
    setPanel("default");
  }

  function handleStartPauseResume() {
    if (timerState === "idle")   start();
    if (timerState === "running") pause();
    if (timerState === "paused")  resume();
  }  
  function handleYes() {
    setSelectedTask(null);
    setInitial(0);
    setEditedSeconds(0);
  }  
  function handleNo() {
    setExtendMode();
  }  
  function handleExtend() {
    if (editedSeconds > 0) extend(editedSeconds);
  }

  // ── Derived ─────────────────────────────────────────────────────────────────
  
  const taskLabel = selectedTask
    ? `${selectedTask.title}`
    : "Select Task";  

  return (
    <>
      {/* Timer card */}
      <div className="timer-card" style={{ background: `linear-gradient(to left, ${t.timerCardL}99, ${t.timerCardR}99)` }}>

        {/* Time */}
        <div className="timer-display">
          <CountdownTimer secondsLeft={secondsLeft} timerState={timerState} color={t.timerText} onEditTime={setEditedSeconds} />
        </div>

        <div className="timer-select-task">
          {/* Select task bar */}
          {panel === "default" && timerState !== "extend" && timerState !== "completed" && (
            <button className= "timer-select-content" style={{ color: t.timeCardText }} onClick={() => timerState === "idle" && setPanel("picker")  }>
              {taskLabel}
            </button>
          )}          

          {/* Extend mode — show task name as plain label */}
          {timerState === "extend" && (
            <div className="timer-select-content" style={{ color: t.timeCardText }}>
              {taskLabel}
            </div>
          )}          

          {/* Extend mode — show task name in bar */}
          {timerState === "completed" && (
            <div className="timer-select-task" style={{ color: t.timeCardText }}>
              Task Completed?
            </div>
          )}

          {/* Task picker panel */}
          {panel === "picker" && (
            <TaskPickerPanel
              theme={theme}
              onTaskSelect={handleSelectTask}
              onClose={() => setPanel("default")}
            />
          )}
        </div>

      </div>

      {/* Start button */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <TimerButtons
          theme={theme}
          timerState={timerState}
          hasTask={!!selectedTask}
          hasEditedTime={editedSeconds > 0}
          onStartPauseResume={handleStartPauseResume}
          onYes={handleYes}
          onNo={handleNo}
          onExtend={handleExtend}
        />
      </div>
    </>
  );
}