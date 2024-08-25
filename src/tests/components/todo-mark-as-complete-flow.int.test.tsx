import { describe, it, expect } from 'vitest';
import { render, screen, userEvent, within } from '../testUtilities/testUtils';
import TodoList from '@/components/TodoList/TodoList';

describe('Mark as complete workflow', () => {
  it('successfully marks a todo as complete', async () => {
      // Create new todo item
      const todoItem = {id: new Date().getTime(), isCompleted: false, name: "milk" }

      // Render the "TodoList" component
      render(<TodoList />, { initialTodoState: [todoItem] })

      // Find the todo items on the screen
      const todoItemElements = screen.queryAllByTestId('todo-item')

      // Find the checkbox and the to-do name
      const checkBoxElement = within(todoItemElements[0]).getByRole('checkbox')
      const todoNameElement = within(todoItemElements[0]).getByText(todoItem.name)

      // Click the checkbox
      await userEvent.click(checkBoxElement)

      // Check if the checkbox element is checked
      expect(checkBoxElement).toBeChecked()
      // Check if the todo name element has line-through on the todo name
      expect(todoNameElement).toHaveClass('tw-line-through')
  })

  it('successfully marks a todo as not complete', async () => {
      // Create new todo item
      const todoItem = {id: new Date().getTime(), isCompleted: true, name: "milk" }

      // Render the "TodoList" component
      render(<TodoList />, { initialTodoState: [todoItem] })

      // Find the todo items on the screen
      const todoItemElements = screen.queryAllByTestId('todo-item')

      // Find the checkbox and the to-do name
      const checkBoxElement = within(todoItemElements[0]).getByRole('checkbox')
      const todoNameElement = within(todoItemElements[0]).getByText(todoItem.name)

      // Click the checkbox
      await userEvent.click(checkBoxElement)

      // Check if the checkbox element is NOT checked
      expect(checkBoxElement).not.toBeChecked()
      // Check if the todo name element has NOT line-through on the todo name
      expect(todoNameElement).not.toHaveClass('tw-line-through')
  })
})