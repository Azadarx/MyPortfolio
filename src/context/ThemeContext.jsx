import { createContext, useState, useEffect, useContext } from "react";

// Create the context
export const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });
  
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light"; // Default fallback
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyTheme = (currentTheme) => {
      localStorage.setItem("theme", currentTheme);

      const root = window.document.documentElement;
      root.classList.remove("dark", "light");

      if (currentTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
        setCurrentTheme(systemTheme);
        
        // Dispatch a custom event to notify theme change
        window.dispatchEvent(new CustomEvent('themeChange', { 
          detail: { theme: systemTheme } 
        }));
      } else {
        root.classList.add(currentTheme);
        setCurrentTheme(currentTheme);
        
        // Dispatch a custom event to notify theme change
        window.dispatchEvent(new CustomEvent('themeChange', { 
          detail: { theme: currentTheme } 
        }));
      }
    };

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme(
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );
      }
    };

    const systemThemeMatcher = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    systemThemeMatcher.addEventListener("change", handleSystemThemeChange);

    applyTheme(theme);

    return () => {
      systemThemeMatcher.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};