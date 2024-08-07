import { createContext, useState } from "react"

import type { ITodo, ITodoContext, ITodoProvider } from "../../app/types"

export const TodoContext = createContext<ITodoContext | undefined>(undefined)

export default function TodoProvider({ children }: ITodoProvider) {
  const [todos, setTodos] = useState<ITodo[]>([]);

  function addTodo(todo: ITodo) {
    setTodos((prevTodos) => [todo, ...prevTodos])
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodoContext.Provider>
  )
}