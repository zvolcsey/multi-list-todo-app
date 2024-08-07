import { render, screen, userEvent } from "../testUtilities/testUtils"
import { describe, expect, it, vi } from "vitest"
import AddTodo from "../../components/AddTodo/AddTodo"
import * as TodoContextModule from "../../contexts/TodoContext"

describe('AddTodo component', () => {
  describe('Basic functionality', () => {
    it('displays the input field', () => {
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Find the Todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      //Check if the input element is in the document
      expect(todoNameInputElement).toBeInTheDocument()
    })
    
    it('displays the "Add todo" button', () => {
      // Render "AddTodo" component
      render(<AddTodo />)
      
      // Find the "Add Todo" button
      const addTodoButtonElement = screen.getByTestId('add-todo-button')

      // Check if the button element is in the document
      expect(addTodoButtonElement).toBeInTheDocument()
    })

    it('triggers the addition of todo item when "Add todo" button is clicked and clears the input field', async () => {
      // Create a new dummy todo
      const newTodo = 'Take out the trash'
      // Create a spy on "addTodo" function
      const addTodo = vi.fn()

      // Spy on the "useTodoContext" function
      vi.spyOn(TodoContextModule, 'useTodoContext').mockReturnValue({
        todos: [],
        addTodo
      })
      
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Find the Todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Write the todo in the input field and click the button
      await userEvent.type(todoNameInputElement, newTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))

      // Check if the addTodo function is invoked and the input field was cleared
      expect(addTodo).toBeCalledWith({ name: newTodo })
      expect(todoNameInputElement).toHaveValue('')

      // Restore the original implementation
      vi.restoreAllMocks()
    })

    it('ensures the label is correctly associated with the input field', () => {
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Find Todo name label and input field
      const todoNameLabelElement = screen.getByTestId('todo-name-label')
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Check if the label and input element are in the document
      expect(todoNameLabelElement).toBeInTheDocument()
      expect(todoNameInputElement).toBeInTheDocument()
      // Check if the label elements's for attribute is the same as the input's id
      expect(todoNameLabelElement).toHaveAttribute('for', todoNameInputElement.id)
    })
  })
})