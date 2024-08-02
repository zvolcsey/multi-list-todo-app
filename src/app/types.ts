import type { ReactNode } from "react";

export interface ITodo {
  name: string,
}

export interface ITodoContext {
  todos: ITodo[],
  addTodo: (todo: ITodo) => void,
}

export interface ITodoProvider {
  children: ReactNode,
}