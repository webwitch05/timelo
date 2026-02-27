// ── Types ─────────────────────────────────────────────────────────────────────

export type Theme = "red" | "pink";

export interface ThemeConfig {
  bg: string;
  cardBg: string;
  tileBg: string;
  text: string;
  subtext: string;
  timerText: string;
  activeColor: string;
  timerCardL: string;
  timerCardR: string;
  timeCardText:string;

  progressBg: string;
  progressFill: string;
  badgeBg: string;
  badgeText: string;
  imageUrl: string;
}

// ── Theme configs ─────────────────────────────────────────────────────────────

export const THEMES: Record<Theme, ThemeConfig> = {
  red: {
    bg: "#8B0B28",
    cardBg: "#FAE4EA",
    tileBg: "#E79AA2",
    text: "#313131",
    subtext: "#F2E0D2",
    timerText: "#D41F44",
    activeColor: "#D41F44",
    timerCardL: "#FFE2E7",
    timerCardR: "#FFFFFF",
    timeCardText: "#FFFFFF",
    imageUrl: "./red_theme_logo.png",

    // havent cnfm
    progressBg: "rgba(255,255,255,0.2)",
    progressFill: "#FF6B6B",
    badgeBg: "#FF4444",
    badgeText: "#fff",
  },
  pink: {
    bg: "#F8E8EE",
    cardBg: "#D6506F",
    tileBg: "#FAD0D7",
    text: "#FDF9F9",
    subtext: "#313131",
    timerText:"#D6506F",
    activeColor: "#FAD0D7",
    timerCardL: "#F69DB3",
    timerCardR: "#FFFFFF",  
    timeCardText: "#313131",
    imageUrl: "./pink_theme_logo2.png",

    //havent cnfm
    progressBg: "rgba(192,56,90,0.15)",
    progressFill: "#C0385A",
    badgeBg: "#C0385A",
    badgeText: "#fff",
  },
};