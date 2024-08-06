import TodoItem from "./TodoItem"
import { useTodoContext } from "../../contexts/TodoContext";

export default function TodoList() {
  const { todos } = useTodoContext();

  if (todos.length === 0) {
    return (
      <p
        data-testid="no-todos-text"
      >There are no tasks to do yet.</p>
    )
  }

  const todoItems = todos.map((todo, idx) => (
    <TodoItem key={idx}>{todo.name}</TodoItem>
  ))

  return (
    <ul
      data-testid='todo-list'
    >{todoItems}</ul>
  )
}