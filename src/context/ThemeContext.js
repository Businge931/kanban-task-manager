import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useThemeContext() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      "Must be wrapped in Conponent must be wrapped inside theme context"
    );
  }

  return themeContext;
}
