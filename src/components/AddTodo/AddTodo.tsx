import { ChangeEvent, FormEvent, useState, type ReactNode } from "react"

import { useTodoContext } from "../../contexts/TodoContext"
import { validateTodo } from "../../utilities/validation.utilities"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function AddTodo() {
  const { todos, addTodo } = useTodoContext();

  const [todoName, setTodoName] = useState<string>('');
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
    const newTodo = { 
      id: new Date().getTime(),
      isCompleted: false,
      name: todoName 
    }

    // Send the current todoName to the TodoContext state
    addTodo(newTodo)
    
    // Reset the error state if there are errors from previous todo addition
    if (errors) {
      setErrors(null)
    }

    // Reset the todoName state
    setTodoName('')

    // Close the modal
    setIsOpen(false)
  }

  function handleClose() {
    // Reset the error state if there are errors from previous todo addition
    if (errors) {
      setErrors(null)
    }
    // Reset the todoName state
    setTodoName('')
  }

  let errorResult: ReactNode | null = null
  if (errors) {
    const errorItems = errors.map((error, idx) => (
      <li 
        key={idx}
        className="tw-pb-4 last-of-type:tw-p-0 tw-text-red-400"
        data-testid="error-item"
      >
        {error}
      </li>
    ))
    
    errorResult = (
      <ul 
        className="tw-list-none tw-p-4 tw-border tw-border-solid tw-border-red-400 tw-rounded"
        data-testid="error-list"
      >
        {errorItems}
      </ul>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="tw-w-full tw-justify-normal"
        >
          + Add To-Do
        </Button>
      </DialogTrigger>
      <DialogContent
        onClickClose={handleClose}
      >
        <DialogHeader>
          <DialogTitle className="tw-text-center">
            Add New To-Do
          </DialogTitle>
          <DialogDescription className="tw-pt-2 tw-text-center">
            Add a new to-do item to your list. Click the save when you're done.
          </DialogDescription>
          {errorResult}
        </DialogHeader>
        <form className="tw-w-full tw-max-w-sm tw-mx-auto" onSubmit={handleSubmit}>
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
          <DialogFooter>
            <Button
              type="submit"
              data-testid="add-todo-button"
            >
              Add To-Do
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}