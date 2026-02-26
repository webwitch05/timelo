import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";
import { type Theme, THEMES } from "../theme";
import TimerView from "../components/TimerView";
import "../css/MainPage.css";

// ── Tab type ──────────────────────────────────────────────────────────────────

type Tab = "timer" | "todo";

// ── MainPage ──────────────────────────────────────────────────────────────────

interface MainPageProps {
  theme: Theme;
  onGoHome?: () => void;
}

export default function MainPage({ theme, onGoHome }: MainPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("timer");
  const t = THEMES[theme];

  return (
    <div className="main-page" style={{ background: t.bg }}>

      {/* Home icon */}
      <button 
        className="leftArrow-btn" 
        style={{ color: t.cardBg }}
        onClick={onGoHome}
      >
        <BsArrowLeft size={40} strokeWidth={0.5} />
      </button>

      {/* Theme / palette icon */}
      <button className="theme-btn" style={{ color: t.cardBg }}>
        <IoColorPaletteOutline size={40}/>
      </button>

      {/* Tab toggle */}
      <div className="tab-toggle" style={{ background: t.cardBg }}>
        <button
          className="tab-toggle-btn" 
          style= {activeTab === "timer"
            ? { background: t.activeColor, color: t.subtext } 
            : { background: t.cardBg, color: t.text }
          }
          onClick={() => setActiveTab("timer")}
        >
          Timer
        </button>
        <button
          className="tab-toggle-btn" 
          style= {activeTab === "todo"
            ? { background: t.activeColor, color: t.subtext } 
            : { background: t.cardBg, color: t.text }
          }
          onClick={() => setActiveTab("todo")}
        >
          To-Do
        </button>
      </div>

      {/* Content */}
      <div className="main-page-content">
        {activeTab === "timer" && (
          <TimerView
            theme={theme}
            timeDisplay="00:00"
            onSelectTask={() => console.log("select task")}
            onStart={() => console.log("start")}
          />
        )}
        {activeTab === "todo" && (
          <div style={{ color: t.text }}>To-Do coming soon</div>
        )}
      </div>

    </div>
  );
}