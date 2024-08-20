import TodoItem from "./TodoItem"
import { useTodoContext } from "../../contexts/TodoContext";

export default function TodoList() {
  const { todos } = useTodoContext();

  if (todos.length === 0) {
    return (
      <p
        className="tw-mb-4 tw-pt-16 tw-font-bold tw-text-center tw-tracking-widest tw-uppercase"
        data-testid="no-todos-text"
      >There are no tasks to do yet.</p>
    )
  }

  const todoItems = todos.map((todo) => (
    <TodoItem 
      key={todo.name} 
      data={todo} 
    />
  ))

  return (
    <section>
      <h2 className="tw-mb-4 tw-pt-16 tw-w-full tw-font-bold tw-text-center tw-tracking-widest tw-uppercase">To-dos</h2>
      <ul
        className="tw-list-none tw-w-full tw-mx-auto tw-p-4 md:tw-p-4 tw-w-4/5 tw-max-w-xl"
        data-testid='todo-list'
      >
        {todoItems}
      </ul>
    </section>
  )
}