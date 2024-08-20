import { describe, it, expect } from 'vitest';
import { render, screen, userEvent, within } from '../testUtilities/testUtils';
import TodoList from '../../components/TodoList/TodoList';
import AddTodo from '../../components/AddTodo/AddTodo';

describe('CRUD todo workflow', () => {
  it('successfully creates and updates a todo item', async () => {
    // Create new dummy todos
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

    // Check if the todo list element is present in the document
    expect(screen.queryByTestId('todo-list')).toBeInTheDocument()
    // Check if the todo item contains the correct text
    expect(screen.queryAllByTestId('todo-item')[0]).toHaveTextContent(newGroceryTodo)
    // Check if the default message is NOT in the document
    expect(screen.queryByText(/no tasks/i)).toBe(null)

    // Find the todo item's name on the screen
    const editTodoNameElement = screen.getByTestId('edit-todo-name')

    // Click the todo item's name
    await userEvent.click(editTodoNameElement)

    // Find the edit input element on the screen
    const editInputElement = screen.getByTestId('edit-todo-name-input')

    // Clear the input field and enter the new todo item
    await userEvent.clear(editInputElement)
    await userEvent.type(editInputElement, updatedGroceryTodo)
    await userEvent.click(screen.getByTestId('edit-save-button'))
    
    // Check if the updated todo item is present in the document
    expect(screen.getByText(updatedGroceryTodo)).toBeInTheDocument()
  })

  it('successfully creates and deletes a todo item', async () => {
    // Create a new dummy todo
    const newGroceryTodo = 'Milk'

    // Render the "AddTodo" and the "TodoList" components
    render(
      <>
        <AddTodo />
        <TodoList />
      </>
    )
    
    // Check if the default message is present in the document
    expect(screen.getByTestId('no-todos-text')).toBeInTheDocument()

    // Write the todo in the input field and click the button
    await userEvent.type(screen.getByTestId('todo-name-input'), newGroceryTodo)
    await userEvent.click(screen.getByRole('button', { name: /add to-do/i}))
    
    // Find the todo items on the screen
    const todoItemElements = screen.queryAllByTestId('todo-item')

    // Check if the todo item element is present in the document
    expect(screen.queryByTestId('todo-list')).toBeInTheDocument()
    // Check if the todo item contains the correct text
    expect(todoItemElements[0]).toHaveTextContent(newGroceryTodo)
    // Check if the default message is NOT in the document
    expect(screen.queryByText(/no tasks/i)).toBe(null)

    // Find the remove button on the screen
    const removeButton = within(todoItemElements[0]).getByRole('button', { name: /remove/i })

    // Click the remove button
    await userEvent.click(removeButton)

    // Find the remove button on the "AlertDialog" component
    const deleteConfirmationButton = screen.getByTestId('delete-confirmation')

    // Click the delete confirmation button
    await userEvent.click(deleteConfirmationButton)
    
    // Check if the updated todo item is NOT present in the document
    expect(screen.queryByText(newGroceryTodo)).toBe(null)
  })
  it('successfully creates and cancels the delete process', async () => {
    // Create a new dummy todo
    const newGroceryTodo = 'Milk'

    // Render the "AddTodo" and the "TodoList" components
    render(
      <>
        <AddTodo />
        <TodoList />
      </>
    )
    
    // Check if the default message is present in the document
    expect(screen.getByTestId('no-todos-text')).toBeInTheDocument()

    // Write the todo in the input field and click the button
    await userEvent.type(screen.getByTestId('todo-name-input'), newGroceryTodo)
    await userEvent.click(screen.getByRole('button', { name: /add to-do/i}))
    
    // Find the todo items on the screen
    const todoItemElements = screen.queryAllByTestId('todo-item')

    // Check if the todo item element is in the document
    expect(screen.queryByTestId('todo-list')).toBeInTheDocument()
    // Check if the todo item contains the correct text
    expect(todoItemElements[0]).toHaveTextContent(newGroceryTodo)
    // Check if the default message is NOT in the document
    expect(screen.queryByText(/no tasks/i)).toBe(null)

    // Find the remove button on the screen
    const removeButton = within(todoItemElements[0]).getByRole('button', { name: /remove/i })

    // Click the remove button
    await userEvent.click(removeButton)

    // Find the cancel button on the "AlertDialog" component
    const deleteCancelButton = screen.getByTestId('delete-cancel')

    // Click the cancel button
    await userEvent.click(deleteCancelButton)
    
    // Check if the updated todo item is present in the document
    expect(screen.queryByText(newGroceryTodo)).toHaveTextContent(newGroceryTodo)
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
    const editInputElement = screen.getByTestId('edit-todo-name-input')

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
