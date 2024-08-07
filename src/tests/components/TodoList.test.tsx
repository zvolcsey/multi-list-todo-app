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

      // Check if the todo item element is present in the document
      expect(todoListElement).toBeInTheDocument()
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
      
      // Check if the default message is in the document
      expect(screen.getByText(/no tasks/i)).toBeInTheDocument()

      // Restore the original implementation
      vi.restoreAllMocks()
    })
  })
})