import type { ReactNode } from "react";


interface ITodoItemProps {
  children: ReactNode,
}

export default function TodoItem({ children }: ITodoItemProps) {

  return (
    <li>{children}</li>
  )
}