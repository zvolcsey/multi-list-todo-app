import type { ReactNode } from "react";

export interface ITodo {
  id: number,
  isCompleted: boolean,
  name: string,
}

export interface ITodoContext {
  todos: ITodo[],
  addTodo: (todo: ITodo) => void,
  updateTodo: (newTodo: ITodo, oldTodo: ITodo) => void,
  deleteTodo: (id: number) => void,
  toggleCompletion: (id: number, checked: boolean) => void,
}

export interface ITodoProvider {
  children: ReactNode,
  initialState?: ITodo[],
}
