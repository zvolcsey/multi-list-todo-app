import { useContext } from "react"
import { TodoContext } from "./index"

import type { ITodoContext } from "../../app/types"

// Custom hook to use the TodoContext
export function useTodoContext(): ITodoContext {
  const context = useContext(TodoContext)

  if (context === undefined) throw new Error("useTodoContext must be used within a TodoProvider")

  return context
}