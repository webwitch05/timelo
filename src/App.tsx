// App.tsx
import { useState } from "react";
import { type Theme } from "./theme";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";

type Page = "home" | "main";

export default function App() {
  const [page, setPage]   = useState<Page>("home");
  const [theme, setTheme] = useState<Theme>("red");

  return (
    <>
      {page === "home" && (
        <HomePage
          theme={theme}
          onNavigate={() => setPage("main")}
          onThemeChange={setTheme}
        />
      )}
      {page === "main" && (
        <MainPage
          theme={theme}
          onGoHome={() => setPage("home")}
        />
      )}
    </>
  );
}