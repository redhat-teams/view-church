import { createContext, useContext, useState } from "react";
const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
