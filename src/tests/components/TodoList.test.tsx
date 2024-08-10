import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../testUtilities/testUtils';
import TodoList from '../../components/TodoList/TodoList';
import * as TodoContextModule from '../../contexts/TodoContext';

import type { ITodo } from '../../app/types';

describe('TodoList component', () => {
  describe('Basic functionality', () => {
    it('displays the list element if there are todos', () => {
      // Create a dummy todos array
      const todos: ITodo[] = [
        { name: "Take out the trash" },
        { name: "Cleaning the bathroom" },
      ]

      // Spy on the "useTodoContext" function
      vi.spyOn(TodoContextModule, "useTodoContext").mockReturnValue({
        todos,
        addTodo: vi.fn()
      })

      // Render the "TodoList" component
      render(<TodoList />)

      // Find the ul tag on the screen
      const todoListElement = screen.getByRole('list')

      // Check if the todo list element is present in the document
      expect(todoListElement).toBeInTheDocument()
      
      // Check if the todo list element is visible to the user
      expect(todoListElement).toHaveClass('list-none')
      expect(todoListElement).toHaveClass('p-4')

      // Check that the todo list element does not have classes that would make it invisible
      expect(todoListElement).not.toHaveClass('hidden')
      expect(todoListElement).not.toHaveClass('invisible')
      expect(todoListElement).not.toHaveClass('opacity-0')

      // Check if the default message is NOT in the document
      expect(screen.queryByText(/no tasks/i)).toBe(null)

      // Restore the original implementation
      vi.restoreAllMocks()
    })
    it('displays text message if there are no todos yet', () => {
      // Create a dummy todos array
      const todos: ITodo[] = []
      
      // Spy on the "useTodoContext" function
      vi.spyOn(TodoContextModule, "useTodoContext").mockReturnValue({
        todos,
        addTodo: vi.fn()
      })

      // Render the "TodoList" component
      render(<TodoList />)

      const noTodosElement = screen.getByTestId('no-todos-text')
      
      // Check if the "no todo text" element is present in the document
      expect(noTodosElement).toBeInTheDocument()
      
      // Check if the "no todo text" element is visible to the user
      expect(noTodosElement).toHaveClass('uppercase')
      expect(noTodosElement).toHaveClass('text-center')

      // Check that the "no todo text" element does not have classes that would make it invisible
      expect(noTodosElement).not.toHaveClass('hidden')
      expect(noTodosElement).not.toHaveClass('invisible')
      expect(noTodosElement).not.toHaveClass('opacity-0')

      // Restore the original implementation
      vi.restoreAllMocks()
    })
  })
})