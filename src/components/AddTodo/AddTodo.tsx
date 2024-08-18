import { ChangeEvent, FormEvent, useState, type ReactNode } from "react"
import { useTodoContext } from "../../contexts/TodoContext"
import { validateTodo } from "../../utilities/validation.utilities"
import { Input } from "../ui/input"

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
    const newTodo = { name: todoName }

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
        className="pb-4 last-of-type:p-0 text-red-400"
        data-testid="error-item"
      >
        {error}
      </li>
    ))
    
    errorResult = (
      <ul 
        className="list-none mb-4 p-4 border border-solid border-red-400 rounded"
        data-testid="error-list"
      >
        {errorItems}
      </ul>
    )
  }

  return (
    <section className="w-4/5 max-w-3xl mx-auto">
      <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h2 
          className="mb-10 pt-16 w-full font-bold text-center tracking-widest uppercase"
        >
          Add New To-do
        </h2>
        {errorResult}
        <div className="w-full mb-4">
          <label 
            htmlFor="todo-name"
            className="block mb-2 tracking-widest uppercase"
            data-testid="todo-name-label"
          >
            To-do name
          </label>
          <Input 
            id="todo-name"
            type="text" 
            name="todo-name"
            className={`
              py-3.5 px-6 w-full border border-solid border-black rounded tracking-widest 
              bg-gray-200 dark:bg-gray-800
            `}
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTodoNameChange(e.target.value)}
            value={todoName}
            data-testid='todo-name-input'
          />
        </div>
        <button 
          type="submit"
          className={`
            py-2.5 px-4 w-full bg-sky-700 border hover:bg-sky-800 active:bg-sky-900 
            focus:outline-none focus:ring focus:ring-sky-300 border-solid border-sky-700 
            rounded font-bold cursor-pointer uppercase text-white
          `}
          data-testid="add-todo-button"
        >
          Add To-do
        </button>
      </form>
    </section>
  )
}