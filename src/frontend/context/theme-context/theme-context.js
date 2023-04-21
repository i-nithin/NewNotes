import { createContext, useState, useLayoutEffect, useContext } from "react";

const themeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [menu, setMenu] = useState(false);

  useLayoutEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark-theme");
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.documentElement.classList.add("dark-theme");
    }
  }, [theme]);

  function themeToggle() {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }

  return (
    <themeContext.Provider value={{ themeToggle, theme, menu, setMenu }}>
      {children}
    </themeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(themeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
