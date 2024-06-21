import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "morning" | "afternoon" | "evening" | "night";

export const themes: Theme[] = ["morning", "afternoon", "evening", "night"];

interface ThemeContextType {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "morning",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const getInitialTheme = (): Theme => {
  return "night";
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 21) return "evening";
  return "night";
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || getInitialTheme()
  );

  const setNewTheme = (theme: Theme) => {
    if (themes.includes(theme)) {
      setTheme(theme);
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setNewTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
