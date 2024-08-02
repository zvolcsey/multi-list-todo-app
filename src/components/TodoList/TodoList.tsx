import TodoItem from "./TodoItem"
import { useTodoContext } from "../../contexts/TodoContext";

export default function TodoList() {
  const { todos } = useTodoContext();

  if (!todos) {
    return <p>There are no tasks to do yet.</p>
  }

  const todoItems = todos.map((todo, idx) => (
    <TodoItem key={idx}>{todo.name}</TodoItem>
  ))

  return (
    <ul>{todoItems}</ul>
  )
}