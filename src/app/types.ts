import type { ReactNode } from "react";

export interface ITodo {
  id: number,
  name: string,
}

export interface ITodoContext {
  todos: ITodo[],
  addTodo: (todo: ITodo) => void,
  updateTodo: (newTodo: ITodo, oldTodo: ITodo) => void,
  deleteTodo: (id: number) => void,
}

export interface ITodoProvider {
  children: ReactNode,
}
