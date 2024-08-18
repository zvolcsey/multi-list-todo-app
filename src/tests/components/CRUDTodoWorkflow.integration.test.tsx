import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '../testUtilities/testUtils';
import TodoList from '../../components/TodoList/TodoList';
import AddTodo from '../../components/AddTodo/AddTodo';

describe('Create and Update todo workflow', () => {
  it('successfully creates and updates a todo item', async () => {
    // Create a new dummy todo
    const newGroceryTodo = 'Milk'
    const updatedGroceryTodo = 'Bread'

    // Render the "AddTodo" and the "TodoList" components
    render(
      <>
        <AddTodo />
        <TodoList />
      </>
    )
    
    // Check if the default message is in the document
    expect(screen.getByTestId('no-todos-text')).toBeInTheDocument()

    // Write the todo in the input field and click the button
    await userEvent.type(screen.getByTestId('todo-name-input'), newGroceryTodo)
    await userEvent.click(screen.getByRole('button', { name: /add to-do/i}))

    // Check if the todo item element is in the document
    expect(screen.queryByTestId('todo-list')).toBeInTheDocument()
    // Check if the todo item contains the correct text
    expect(screen.queryAllByTestId('todo-item')[0]).toHaveTextContent(newGroceryTodo)
    // Check if the default message is NOT in the document
    expect(screen.queryByText(/no tasks/i)).toBe(null)

    // Find the todo item on the screen
    const editTodoNameElement = screen.getByTestId('edit-todo-name')

    // Click the todo item element
    await userEvent.click(editTodoNameElement)

    // Find the edit input element on the screen
    const editInputElement = screen.getByTestId('edit-input')

    // Clear the input field and enter the new todo item
    await userEvent.clear(editInputElement)
    await userEvent.type(editInputElement, updatedGroceryTodo)
    await userEvent.click(screen.getByTestId('edit-save-button'))
    
    // Check if the updated todo item is present in the document
    expect(screen.getByText(updatedGroceryTodo)).toBeInTheDocument()
  })
  
  it('does not display the invalid todo in the todo list', async () => {
    // Create a new dummy todo
    const newTodo = '#1 Task is cleaning the bathroom'

    // Render the "AddTodo" and the "TodoList" components
    render(
      <>
        <AddTodo />
        <TodoList />
      </>
    )

    // Check if the default message is in the document
    expect(screen.getByTestId('no-todos-text')).toBeInTheDocument()

    // Write the todo in the input field and click the button
    await userEvent.type(screen.getByTestId('todo-name-input'), newTodo)
    await userEvent.click(screen.getByRole('button', { name: /add to-do/i}))

    // Check if the todo list element is NOT in the document
    expect(screen.queryByTestId('todo-list')).toBe(null)
    // Check if the todo item element is NOT in the document
    expect(screen.queryAllByTestId('todo-item')).toEqual([])
    // Check if the default message is in the document
    expect(screen.getByText(/no tasks/i)).toBeInTheDocument()
  })
  
  it('does not display the invalid updated todo in the todo list', async () => {
    // Create a new dummy todo
    const newGroceryTodo = 'Milk'
    const updatedGroceryTodo = '/'

    // Render the "AddTodo" and the "TodoList" components
    render(
      <>
        <AddTodo />
        <TodoList />
      </>
    )
    
    // Check if the default message is in the document
    expect(screen.getByTestId('no-todos-text')).toBeInTheDocument()

    // Write the todo in the input field and click the button
    await userEvent.type(screen.getByTestId('todo-name-input'), newGroceryTodo)
    await userEvent.click(screen.getByRole('button', { name: /add to-do/i}))

    // Find the todo item on the screen
    const editTodoNameElement = screen.getByTestId('edit-todo-name')

    // Click the todo item element
    await userEvent.click(editTodoNameElement)

    // Find the edit input element on the screen
    const editInputElement = screen.getByTestId('edit-input')

    // Clear the input field and enter the new todo item
    await userEvent.clear(editInputElement)
    await userEvent.type(editInputElement, updatedGroceryTodo)
    await userEvent.click(screen.getByTestId('edit-save-button'))
    
    // Check if the updated todo item is present in the document
    expect(screen.queryByText(updatedGroceryTodo)).toBe(null)

    // Check if the error list element is present in the document
    expect(screen.queryByTestId('error-list')).toBeInTheDocument()
  })

})
