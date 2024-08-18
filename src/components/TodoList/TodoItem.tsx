import { ChangeEvent, KeyboardEvent, ReactNode, useState } from "react";
import { ITodo } from "../../app/types";
import { validateTodo } from "../../utilities/validation.utilities";
import { useTodoContext } from "../../contexts/TodoContext";
import { Button } from "../ui/button";
import { Pencil, Save, X } from "lucide-react";
import { Input } from "../ui/input";

interface ITodoItemProps {
  data: ITodo,
}

export default function TodoItem({ data }: ITodoItemProps) {
  const { name } = data
  const { todos, updateTodo } = useTodoContext()
  
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newTodoName, setNewTodoName] = useState<string>(name)
  const [errors, setErrors] = useState<string[] | null>(null)
  
  function handleEditMode() {
    setEditMode(prevEditMode => !prevEditMode)
  }

  function handleChangeNewTodoName (e: ChangeEvent<HTMLInputElement>) {
    setNewTodoName(e.target.value)
  }

  function handleCancel() {
    setNewTodoName(name)
    setEditMode(false)
    setErrors(null)
  }
  
  function handleSave() {
    // Validate todo element
    const errorsResult = validateTodo({ todoName: newTodoName, todos })

    if (errorsResult.length > 0) {
      setErrors(errorsResult);
      return;
    }
    
    // Create the new todo object
    const updatedTodo = { name: newTodoName }

    // Update the todo item
    updateTodo(updatedTodo, data)

    // Reset edit mode
    setEditMode(false)

    // Reset errors
    setErrors(null)
  }
  
  function handleKeyDownEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave()
  }
  
  let errorResult: ReactNode | null = null
  if (errors) {
    const errorItems = errors.map((error, idx) => (
      <li 
        key={idx}
        className="pb-1 last-of-type:p-0 text-red-400 text-xs"
        data-testid="error-item"
      >
        {error}
      </li>
    ))
    
    errorResult = (
      <ul 
        className="list-none mt-1 p-1 border border-solid border-red-400 rounded"
        data-testid="error-list"
      >
        {errorItems}
      </ul>
    )
  }

  return (
    <li
      className="pb-8 last-of-type:p-0"
      data-testid="todo-item"
    >
      {!editMode && (
        <div 
          className={`
            w-full md:w-fit flex gap-2 py-0.5 px-1.5 rounded-sm cursor-pointer
            hover:bg-gray-200 dark:hover:bg-gray-800
          `}
          onClick={handleEditMode}
          data-testid="edit-todo-name"
        >
          <p className="peer">{ name }</p>
          <Button 
            variant="outline" 
            size="icon" 
            className="hidden md:block opacity-0 peer-hover:opacity-100"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
      {editMode && (
        <div>
          <div className="flex gap-1 w-full max-w-sm items-center space-x-2">
            <Input 
              type="text"
              autoFocus
              className="w-full py-0.5 px-1.5 rounded-sm bg-gray-200 dark:bg-gray-800"
              value={newTodoName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeNewTodoName(e)} 
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDownEnter(e)}
              data-testid="edit-input"
            />
            <Button 
              type="submit"
              name="save"
              variant="outline" 
              size="icon" 
              className="items-center space-x-2 gap-1 hidden md:flex"
              onClick={handleSave}
              data-testid='edit-save-button'
            >
              <Save className="h-4 w-4"/> Save
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="flex items-center space-x-2 gap-0.5"
              onClick={handleCancel}
              data-testid='edit-cancel-button'
            >
              <X className="h-4 w-4"/> 
              <p className="hidden md:block">Cancel</p>
            </Button>
          </div>
          {errorResult}
        </div>
      )}
    </li>
  )
}