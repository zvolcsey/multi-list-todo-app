import TodoItem from "./TodoItem"
import { useTodoContext } from "../../contexts/TodoContext";

export default function TodoList() {
  const { todos } = useTodoContext();

  if (todos.length === 0) {
    return (
      <p
        className="mb-4 pt-16 font-bold text-center tracking-widest uppercase"
        data-testid="no-todos-text"
      >There are no tasks to do yet.</p>
    )
  }

  const todoItems = todos.map((todo, idx) => (
    <TodoItem key={idx}>{todo.name}</TodoItem>
  ))

  return (
    <section>
      <h2 className="mb-4 pt-16 w-full font-bold text-center tracking-widest uppercase">To-dos</h2>
      <ul
        className="list-none mx-auto p-4 w-4/5 max-w-xl"
        data-testid='todo-list'
      >
        {todoItems}
      </ul>
    </section>
  )
}