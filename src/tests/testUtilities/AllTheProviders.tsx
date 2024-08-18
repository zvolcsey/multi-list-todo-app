import type { ReactNode } from "react"
import { ThemeProvider } from "@/contexts/ThemeProvider/themeContext"
import { TodoProvider } from "@/contexts/TodoContext"

interface IAllTheProviders {
  children: ReactNode,
}

export default function AllTheProviders({ children }: IAllTheProviders) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TodoProvider>
        {children}
      </TodoProvider>
    </ThemeProvider>
  )
}