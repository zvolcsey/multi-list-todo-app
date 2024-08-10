import type { ReactNode } from "react";

interface ITodoItemProps {
  children: ReactNode,
}

export default function TodoItem({ children }: ITodoItemProps) {
  return (
    <li
      className="pb-8 last-of-type:p-0"
      data-testid="todo-item"
    >
      {children}
    </li>
  )
}