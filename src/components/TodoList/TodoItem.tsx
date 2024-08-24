import { ChangeEvent, KeyboardEvent, ReactNode, useState } from "react";
import { ITodo } from "../../app/types";
import { validateTodo } from "../../utilities/validation.utilities";
import { useTodoContext } from "../../contexts/TodoContext";
import { Button } from "../ui/button";
import { Pencil, Save, X } from "lucide-react";
import { Input } from "../ui/input";
import DeleteTodoAlertDialog from "../delete-alert-dialog";
import { Checkbox } from "../ui/checkbox";

interface ITodoItemProps {
  data: ITodo,
}

export default function TodoItem({ data }: ITodoItemProps) {
  const { isCompleted, name } = data
  const { todos, updateTodo, toggleCompletion } = useTodoContext()
  
  const [isLocalCompleted, setIsLocalCompleted] = useState<boolean>(isCompleted);
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newTodoName, setNewTodoName] = useState<string>(name)
  const [errors, setErrors] = useState<string[] | null>(null)

  function handleCheckedChange(checked: boolean | string) {
    toggleCompletion(data.id, Boolean(checked))
    setIsLocalCompleted(Boolean(checked))
  }

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
    const updatedTodo = { 
      id: data.id,
      isCompleted,
      name: newTodoName 
    }

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
        className="tw-pb-1 last-of-type:tw-p-0 tw-text-red-400 tw-text-xs"
        data-testid="error-item"
      >
        {error}
      </li>
    ))
    
    errorResult = (
      <ul 
        className="tw-list-none tw-mt-1 tw-p-1 tw-border tw-border-solid tw-border-red-400 tw-rounded"
        data-testid="error-list"
      >
        {errorItems}
      </ul>
    )
  }

  return (
    <li
      className="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-pb-8 last-of-type:tw-p-0"
      data-testid="todo-item"
    >
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={(checked) => handleCheckedChange(checked)}
        />
        {!editMode && (
          <div 
            className={`
              tw-w-full md:tw-w-fit tw-h-10 tw-flex tw-items-center tw-gap-2 tw-py-2 tw-pl-3 tw-pr-0 tw-rounded-md 
              tw-text-sm tw-cursor-pointer hover:tw-bg-background hover:tw-border 
              hover:tw-border-input dark:hover:tw-bg-background
            `}
            onClick={handleEditMode}
            data-testid="edit-todo-name"
          >
            <p className={`peer ${isLocalCompleted && "tw-line-through"}`}>{ name }</p>
            <Button 
              variant="ghost" 
              size="icon" 
              className="tw-hidden md:tw-inline-flex tw-opacity-0 peer-hover:tw-opacity-100"
            >
              <Pencil className="tw-h-3.5 tw-w-3.5" />
            </Button>
          </div>
        )}
        {editMode && (
          <div>
            <div className="tw-flex tw-items-center tw-gap-4 tw-w-full tw-max-w-2xl">
              <Input 
                type="text"
                name="edit-todo-name-input"
                autoFocus
                className="tw-tracking-widest"
                value={newTodoName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeNewTodoName(e)} 
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDownEnter(e)}
                data-testid="edit-todo-name-input"
              />
              <Button 
                type="submit"
                name="save"
                size="icon"
                className="md:tw-w-fit md:tw-px-4 md:tw-py-2"
                onClick={handleSave}
                data-testid='edit-save-button'
              >
                <Save className="tw-h-4 tw-w-4"/>
                <span className="tw-hidden md:tw-block md:tw-ml-0.5">Save</span>
              </Button>
              <Button 
                type="button"
                variant="secondary"
                size="icon"
                className="md:tw-w-fit md:tw-px-4 md:tw-py-2"
                onClick={handleCancel}
                data-testid='edit-cancel-button'
              >
                <X className="tw-h-4 tw-w-4"/> 
                <span className="tw-hidden md:tw-block md:tw-ml-0.5">Cancel</span>
              </Button>
            </div>
            {errorResult}
          </div>
        )}
      </div>
      <DeleteTodoAlertDialog id={data.id} />
    </li>
  )
}