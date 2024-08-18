// Source: https://ui.shadcn.com/docs/dark-mode/vite
import { useContext } from "react"
import { ThemeProviderContext } from "./themeContext"

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}