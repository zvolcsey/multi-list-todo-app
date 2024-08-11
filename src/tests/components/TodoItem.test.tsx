import { describe, it, expect } from 'vitest';
import { render, screen } from '../testUtilities/testUtils';
import TodoItem from "../../components/TodoList/TodoItem";


describe('TodoItem component', () => {
  describe('Basic functionality', () => {
    it('displays the todo item', () => {
      // Create a dummy todo
      const todoItem = 'Cleaning the bathroom'

      // Render the TodoItem component
      render(<TodoItem>{todoItem}</TodoItem>)

      // Find the todo items on the screen
      const todoItemElement = screen.queryAllByTestId('todo-item')

      // Check if the todo item element is present in the document
      expect(todoItemElement[0]).toBeInTheDocument()

      // Check if the todo item contains the correct text
      expect(todoItemElement[0]).toHaveTextContent(todoItem)
      
      // Check if the todo item element is visible to the user
      expect(todoItemElement[0]).toHaveClass('pb-8')
      expect(todoItemElement[0]).toHaveClass('last-of-type:p-0')

      // Check that the todo item element does not have classes that would make it invisible
      expect(todoItemElement[0]).not.toHaveClass('hidden')
      expect(todoItemElement[0]).not.toHaveClass('invisible')
      expect(todoItemElement[0]).not.toHaveClass('opacity-0')
    })
  })
})