import { type Theme, THEMES } from "../theme";
import { useState, useRef, useCallback } from "react";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { getAvailableDates, getTasksByDate, type Task } from "../data/timerViewData";
import "../css/TaskPickerPanel.css";

// ── Types ─────────────────────────────────────────────────────────────────────

type PickerPanel = "dates" | "tasks";

interface TaskPickerPanelProps {
  theme: Theme;
  onTaskSelect: (task: Task) => void;
  onClose: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
function formatDuration(d: Duration): string {
  const parts = [];
  if (d.hours > 0) parts.push(`${d.hours}hr`);
  if (d.mins > 0) parts.push(`${d.mins}mins`);
  return parts.join(" ");
}

// ── DrumPicker ────────────────────────────────────────────────────────────────

interface DrumPickerProps {
  items: string[];
  color: string;
  onSelect: (item: string) => void;
}

function DrumPicker({ items, color, onSelect }: DrumPickerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ITEM_HEIGHT = 50;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_HEIGHT);
    setActiveIdx(Math.max(0, Math.min(idx, items.length - 1)));
  }, [items.length]);

  return (
    <div className="drum-wrapper">
      <div className="drum-scroll" ref={scrollRef} onScroll={handleScroll}>
        {/* top padding so first item can center */}
        <div style={{ height: ITEM_HEIGHT, flexShrink: 0 }} />
        {items.map((item, i) => (
          <div
            key={item}
            className={`timer-select-content drum-item ${i === activeIdx ? "active" : ""}`}
            style={{ color, height: ITEM_HEIGHT }}
            onClick={() => onSelect(item)}
          >
            {item}
          </div>
        ))}
        {/* bottom padding so last item can center */}
        <div style={{ height: ITEM_HEIGHT, flexShrink: 0 }} />
      </div>
    </div>
  );
}

// ── TaskPickerPanel ───────────────────────────────────────────────────────────

export default function TaskPickerPanel({ theme, onTaskSelect, onClose }: TaskPickerPanelProps) {
  const t = THEMES[theme];
  const [pickerPanel, setPickerPanel] = useState<PickerPanel>("dates");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const availableDates = getAvailableDates();
  const dateLabels = availableDates.map(formatDate);

  function handleDateSelect(label: string) {
    const date = availableDates.find((d) => formatDate(d) === label);
    if (!date) return;
    setSelectedDate(date);
    setPickerPanel("tasks");
  }

  function handleTaskSelect(label: string) {
    if (!selectedDate) return;
    const task = getTasksByDate(selectedDate).find(
      (t) => `${t.title} (${formatDuration(t.duration)})` === label
    );
    if (!task) return;
    onTaskSelect(task);
  }

  const taskLabels = selectedDate
    ? getTasksByDate(selectedDate).map((t) => `${t.title} (${formatDuration(t.duration)})`)
    : [];

  return (
    <div className="picker-panel">

      {/* Back button */}
      <button
        className="picker-back-btn"
        style={{ color: t.timeCardText }}
        onClick={pickerPanel === "dates" ? onClose : () => setPickerPanel("dates")}
      >
        <IoReturnDownBackOutline size={24} />
      </button>

      {/* Date drum */}
      {pickerPanel === "dates" && (
        <DrumPicker items={dateLabels} color={t.timeCardText} onSelect={handleDateSelect}/>
      )}

      {/* Task drum */}
      {pickerPanel === "tasks" && (
        <>
          <span className="picker-date-label" style={{ color: t.timerText }}>
            {selectedDate ? formatDate(selectedDate) : ""}
          </span>
          <DrumPicker
            items={taskLabels}
            color={t.timeCardText}
            onSelect={handleTaskSelect}
          />
        </>
      )}

    </div>
  );
}