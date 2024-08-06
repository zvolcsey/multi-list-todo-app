import type { ReactNode } from "react";


interface ITodoItemProps {
  children: ReactNode,
}

export default function TodoItem({ children }: ITodoItemProps) {

  return (
    <li
      data-testid="todo-item"
    >
      {children}
    </li>
  )
}