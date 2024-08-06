import { MAX_TODO_NAME_LENGTH, MIN_TODO_NAME_LENGTH } from "../app/constant";
import { ITodo } from "../app/types";

interface IValidateTodoParams {
  todoName: string,
  todos: ITodo[],
}

export function validateTodo({ todoName, todos }: IValidateTodoParams): string[] {
  const errors: string[] = []

  // Check if the todo name is NOT empty
  if (!todoName) {
    errors.push("Todo name cannot be empty")
    return errors;
  }

  // Check if the length of todo name is between 2 and 30 characters
  const todoNameLength = todoName.length
  if (
    todoNameLength <= MIN_TODO_NAME_LENGTH 
    || todoNameLength >= MAX_TODO_NAME_LENGTH
  ) {
    errors.push(`
      Todo name must be between ${MIN_TODO_NAME_LENGTH} 
      and ${MAX_TODO_NAME_LENGTH} characters
    `)
  }
  
  // Check if the todo contains only letters (both lowercase and uppercase), numbers, and spaces
  const isValidFormat = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/.test(todoName)
  if (!isValidFormat) {
    errors.push(`
      Todo name can only contain alphanumeric characters and spaces,
      but it cannot start with a space.
    `)
  }

  // Check if the to-do does NOT exist
  for (const todo of todos) {
    if (todo.name === todoName) errors.push("Todo already exists")
  }

  return errors
}