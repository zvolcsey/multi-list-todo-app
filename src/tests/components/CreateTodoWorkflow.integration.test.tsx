import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '../testUtilities/testUtils';
import TodoList from '../../components/TodoList/TodoList';
import AddTodo from '../../components/AddTodo/AddTodo';

describe('Create todo workflow', () => {
  it('displays the valid todo in the todo list', async () => {
    // Create a new dummy todo
    const newTodo = 'Cleaning the bathroom'

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

    // Check if the todo item element is in the document
    expect(screen.queryByTestId('todo-list')).toBeInTheDocument()
    // Check if the todo item contains the correct text
    expect(screen.queryAllByTestId('todo-item')[0]).toHaveTextContent(newTodo)
    // Check if the default message is NOT in the document
    expect(screen.queryByText(/no tasks/i)).toBe(null)
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
})
