import TodoItem from "./TodoItem"
import { useTodoContext } from "../../contexts/TodoContext";
import AddTodo from "../AddTodo/AddTodo";
import { ScrollArea } from "../ui/scroll-area";

export default function TodoList() {
  const { todos } = useTodoContext();

  const noTodosElement = (
    <p
      className="tw-my-4 tw-p-4 tw-w-full tw-rounded-md tw-border tw-border-solid tw-font-bold tw-text-center tw-tracking-widest tw-uppercase"
      data-testid="no-todos-text"
    >There are no tasks to do yet.</p>
  )

  const todoItems = todos.map((todo) => (
    <TodoItem 
      key={todo.name}
      data={todo} 
    />
  ))

  return (
    <section
      className="tw-mx-auto tw-p-4 tw-w-11/12 tw-max-w-xl tw-h-screen"
    >
      <h2 className="tw-w-full tw-font-bold tw-text-center tw-tracking-widest tw-uppercase">Groceries</h2>
      {todos.length === 0 && noTodosElement}
      {todos.length > 0 &&
        <ScrollArea
          className="tw-my-4 tw-w-full tw-h-96 tw-rounded-md tw-border tw-border-solid"
        >
          <ul
            className="tw-list-none tw-w-full tw-mx-auto tw-p-4 md:tw-p-4 "
            data-testid='todo-list'
          >
            {todoItems}
          </ul>
        </ScrollArea>
      }
      <AddTodo />
    </section>
  )
}