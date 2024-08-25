import { describe, it, expect } from 'vitest';
import { render, screen } from '../testUtilities/testUtils';
import TodoList from '../../components/TodoList/TodoList';

import type { ITodo } from '../../app/types';

describe('TodoList component', () => {
  describe('Basic functionality', () => {
    it('displays the list element if there are todos', () => {
      // Create a dummy todos array
      const initialTodoState: ITodo[] = [
        { id: new Date().getTime(), isCompleted: true, name: "Take out the trash" },
        { id: new Date().getTime() + 1, isCompleted: false, name: "Cleaning the bathroom" },
      ]

      // Render the "TodoList" component
      render(<TodoList />, { initialTodoState })

      // Find the ul tag on the screen
      const todoListElement = screen.getByRole('list')
      
      // Check if the todo list element is visible to the user
      expect(todoListElement).toHaveClass('tw-list-none')
      expect(todoListElement).toHaveClass('tw-p-4')

      // Check that the todo list element does not have classes that would make it invisible
      expect(todoListElement).not.toHaveClass('tw-hidden')
      expect(todoListElement).not.toHaveClass('tw-invisible')
      expect(todoListElement).not.toHaveClass('tw-opacity-0')

      // Check if the default message is NOT in the document
      expect(screen.queryByText(/no tasks/i)).toBe(null)
    })

    it('displays text message if there are no todos yet', () => {
     // Render the "TodoList" component
      render(<TodoList />)

      const noTodosElement = screen.getByTestId('no-todos-text')
      
      // Check if the "no todo text" element is present in the document
      expect(noTodosElement).toBeInTheDocument()
      
      // Check if the "no todo text" element is visible to the user
      expect(noTodosElement).toHaveClass('tw-uppercase')
      expect(noTodosElement).toHaveClass('tw-text-center')

      // Check that the "no todo text" element does not have classes that would make it invisible
      expect(noTodosElement).not.toHaveClass('tw-hidden')
      expect(noTodosElement).not.toHaveClass('tw-invisible')
      expect(noTodosElement).not.toHaveClass('tw-opacity-0')
    })
  })
})