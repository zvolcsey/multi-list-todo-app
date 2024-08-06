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

      // Check if the todo item element is in the document
      expect(todoItemElement[0]).toBeInTheDocument()
      // Check if the todo item contains the correct text
      expect(todoItemElement[0]).toHaveTextContent(todoItem)
    })
  })
})