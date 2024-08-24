import { createContext, useState } from "react"

import type { ITodo, ITodoContext, ITodoProvider } from "../../app/types"

export const TodoContext = createContext<ITodoContext | undefined>(undefined)

export default function TodoProvider({ 
  children,
  initialState = []
}: ITodoProvider) {
  const [todos, setTodos] = useState<ITodo[]>(initialState);

  function addTodo(todo: ITodo) {
    setTodos((prevTodos) => [todo, ...prevTodos])
  }

  function updateTodo(newTodo: ITodo, oldTodo: ITodo) {
    setTodos((prevTodos) => (
      prevTodos.map((todo) => (todo.name === oldTodo.name ? newTodo : todo))
    ))
  }

  function deleteTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  function toggleCompletion(id: number, checked: boolean) {
    setTodos((prevTodos) => (
      prevTodos.map((todo) => (todo.id === id) ? { ...todo, isCompleted: checked } : todo)
    ))
  }

  return (
    <TodoContext.Provider value={{ 
      todos, 
      addTodo,
      updateTodo,
      deleteTodo,
      toggleCompletion
    }}>
      {children}
    </TodoContext.Provider>
  )
}