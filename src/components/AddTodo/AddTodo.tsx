import { ChangeEvent, FormEvent, useState, type ReactNode } from "react"
import { useTodoContext } from "../../contexts/TodoContext"
import { validateTodo } from "../../utilities/validation.utilities"
import { Input } from "../ui/input"
import { Button } from "../ui/button";

export default function AddTodo() {
  const { todos, addTodo } = useTodoContext();

  const [todoName, setTodoName] = useState<string>('');
  const [errors, setErrors] = useState<string[] | null>(null);

  function handleTodoNameChange(newTodoName: string) {
    // Save the user input in the todoName state
    setTodoName(newTodoName)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Prevent default behavior
    e.preventDefault()

    // Validate todo element
    const errorsResult = validateTodo({ todoName, todos })

    if (errorsResult.length > 0) {
      setErrors(errorsResult);
      setTodoName('')
      return;
    }

    // Creating the new todo object
    const newTodo = { id: new Date().getTime(), name: todoName }

    // Send the current todoName to the TodoContext state
    addTodo(newTodo)
    
    // Reset the error state if there are errors from previous todo addition
    if (errors) {
      setErrors(null)
    }

    // Reset the todoName state
    setTodoName('');
  }

  let errorResult: ReactNode | null = null
  if (errors) {
    const errorItems = errors.map((error, idx) => (
      <li 
        key={idx}
        className="tw-pb-4 tw-last-of-type:p-0 tw-text-red-400"
        data-testid="error-item"
      >
        {error}
      </li>
    ))
    
    errorResult = (
      <ul 
        className="tw-list-none tw-mb-4 tw-p-4 tw-border tw-border-solid tw-border-red-400 tw-rounded"
        data-testid="error-list"
      >
        {errorItems}
      </ul>
    )
  }

  return (
    <section className="tw-w-4/5 tw-max-w-3xl tw-mx-auto">
      <form className="tw-w-full tw-max-w-sm tw-mx-auto" onSubmit={handleSubmit}>
        <h2 
          className="tw-mb-10 tw-pt-16 tw-w-full tw-font-bold tw-text-center tw-tracking-widest tw-uppercase"
        >
          Add New To-do
        </h2>
        {errorResult}
        <div className="tw-w-full tw-mb-4">
          <label 
            htmlFor="todo-name"
            className="tw-block tw-mb-2 tw-tracking-widest tw-uppercase"
            data-testid="todo-name-label"
          >
            To-do name
          </label>
          <Input 
            id="todo-name"
            type="text" 
            name="todo-name"
            className="tw-tracking-widest"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTodoNameChange(e.target.value)}
            value={todoName}
            data-testid='todo-name-input'
          />
        </div>
        <Button
          type="submit"
          data-testid="add-todo-button"
        >
          Add To-do
        </Button>
      </form>
    </section>
  )
}