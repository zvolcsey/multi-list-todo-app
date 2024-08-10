import { render, screen, userEvent } from "../testUtilities/testUtils"
import { describe, expect, it, vi } from "vitest"
import AddTodo from "../../components/AddTodo/AddTodo"
import * as TodoContextModule from "../../contexts/TodoContext"

describe('AddTodo component', () => {
  describe('Basic functionality', () => {
    it('ensures that the input field is present in the document and visible', () => {
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Check if the input element is present in the document
      expect(todoNameInputElement).toBeInTheDocument()

      // Check if the input element is visible to the user
      expect(todoNameInputElement).toHaveClass('border')
      expect(todoNameInputElement).toHaveClass('text-white')

      // Check that the input element does not have classes that would make it invisible
      expect(todoNameInputElement).not.toHaveClass('hidden')
      expect(todoNameInputElement).not.toHaveClass('invisible')
      expect(todoNameInputElement).not.toHaveClass('opacity-0')
    })
    
    it('ensures the "Add Todo" button is in the document and visible', () => {
      // Render "AddTodo" component
      render(<AddTodo />)
      
      // Find the "Add Todo" button
      const addTodoButtonElement = screen.getByTestId('add-todo-button')

      // Check if the button element is in the document
      expect(addTodoButtonElement).toBeInTheDocument()

      // Check if the button element is visible to the user
      expect(addTodoButtonElement).toHaveClass('bg-sky-700')
      expect(addTodoButtonElement).toHaveClass('text-white')
      
      // Check that the input element does not have classes that would make it invisible
      expect(addTodoButtonElement).not.toHaveClass('hidden')
      expect(addTodoButtonElement).not.toHaveClass('invisible')
      expect(addTodoButtonElement).not.toHaveClass('opacity-0')
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

    it('ensures the label is correctly associated with the input field and visible', () => {
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Find todo name label and input field
      const todoNameLabelElement = screen.getByTestId('todo-name-label')
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Check if the label and input element are present in the document
      expect(todoNameLabelElement).toBeInTheDocument()
      expect(todoNameInputElement).toBeInTheDocument()

      // Check if the label element is visible to the user
      expect(todoNameLabelElement).toHaveClass('block')
      expect(todoNameLabelElement).toHaveClass('uppercase')
      
      // Check that the input element does not have classes that would make it invisible
      expect(todoNameLabelElement).not.toHaveClass('hidden')
      expect(todoNameLabelElement).not.toHaveClass('invisible')
      expect(todoNameLabelElement).not.toHaveClass('opacity-0')

      // Check if the label elements's for attribute is the same as the input's id
      expect(todoNameLabelElement).toHaveAttribute('for', todoNameInputElement.id)
    })
  })

  describe('Error state', () => {
    it('does NOT display the error list on the initial render', () => {
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Try to find the error list element
      const errorListElement = screen.queryByTestId('error-list')

      //Check if the error list element is NOT in the document
      expect(errorListElement).not.toBeInTheDocument()
    })

    it('displays the error list if the user tries to add an invalid todo', async () => {
      // Create a new dummy todo
      const newTodo = '/'

      // Create a spy on "addTodo" function
      const addTodo = vi.fn()

      // Spy on the "useTodoContext" function
      vi.spyOn(TodoContextModule, 'useTodoContext').mockReturnValue({
        todos: [],
        addTodo
      })
      
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Write the todo in the input field and click the button
      await userEvent.type(todoNameInputElement, newTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))
      
      // Try to find the error list element
      const errorListElement = screen.queryByTestId('error-list')

      // Check if the error list element is present in the document
      expect(errorListElement).toBeInTheDocument()

      // Check if the error list element is visible to the user
      expect(errorListElement).toHaveClass('border-red-400')
      
      // Check that the error list element does not have classes that would make it invisible
      expect(errorListElement).not.toHaveClass('hidden')
      expect(errorListElement).not.toHaveClass('invisible')
      expect(errorListElement).not.toHaveClass('opacity-0')

      // Restore the original implementation
      vi.restoreAllMocks()
    })

    it('clears previous errors if the user successfully adds a todo', async () => {
      // Create new dummy todos
      const validTodo = 'Clean the bathroom'
      const invalidTodo = '/'

      // Create a spy on "addTodo" function
      const addTodo = vi.fn()

      // Spy on the "useTodoContext" function
      vi.spyOn(TodoContextModule, 'useTodoContext').mockReturnValue({
        todos: [],
        addTodo
      })
      
      // Render the "AddTodo" component
      render(<AddTodo />)
      
      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')
      
      // Write an invalid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, invalidTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))

      // Try to find the error list element
      let errorListElement = screen.queryByTestId('error-list')
      
      // Check if the error list element is present in the document
      expect(errorListElement).toBeInTheDocument()

      // Check if the error list element is visible to the user
      expect(errorListElement).toHaveClass('border-red-400')
      
      // Check that the error list element does not have classes that would make it invisible
      expect(errorListElement).not.toHaveClass('hidden')
      expect(errorListElement).not.toHaveClass('invisible')
      expect(errorListElement).not.toHaveClass('opacity-0')

      // Write a valid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, validTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))
      
      // Try to find the error list element
      errorListElement = screen.queryByTestId('error-list')

      //Check if the error list element is NOT present in the document
      expect(errorListElement).not.toBeInTheDocument()

      // Restore the original implementation
      vi.restoreAllMocks()
    })
    
    it('updates the previous errors if the user adds another invalid todo', async () => {
      // Create new dummy todos
      const invalidTodoOne = 'A'
      const invalidTodoTwo = 'Take out the trash'

      // Create a spy on "addTodo" function
      const addTodo = vi.fn()

      // Spy on the "useTodoContext" function
      vi.spyOn(TodoContextModule, 'useTodoContext').mockReturnValue({
        todos: [{ name: 'Take out the trash'}],
        addTodo
      })

      // Render the "AddTodo" component
      render(<AddTodo />)
      
      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')
      
      // Write an invalid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, invalidTodoOne)
      await userEvent.click(screen.getByTestId('add-todo-button'))

      // Try to find the error list and item elements
      let errorListElement = screen.queryByTestId('error-list')
      let errorItemElements = screen.queryAllByTestId('error-item')
      
      // Check if the error list element is present in the document
      expect(errorListElement).toBeInTheDocument()

      // Check if the error list and item elements are visible to the user
      expect(errorListElement).toHaveClass('border-red-400')
      expect(errorItemElements[0].textContent).toContain('between');
      expect(errorItemElements[0]).toHaveClass('text-red-400')
      
      // Check that the error list and item elements do not have classes that would make it invisible
      expect(errorListElement).not.toHaveClass('hidden')
      expect(errorListElement).not.toHaveClass('invisible')
      expect(errorListElement).not.toHaveClass('opacity-0')
      expect(errorItemElements[0]).not.toHaveClass('hidden')
      expect(errorItemElements[0]).not.toHaveClass('invisible')
      expect(errorItemElements[0]).not.toHaveClass('opacity-0')

      // Write a valid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, invalidTodoTwo)
      await userEvent.click(screen.getByTestId('add-todo-button'))
      
      // Try to find the error list and item elements
      errorListElement = screen.queryByTestId('error-list')
      errorItemElements = screen.queryAllByTestId('error-item')

      // Check if the error list element is present in the document
      expect(errorListElement).toBeInTheDocument()

      // Check if the error list and item elements are visible to the user
      expect(errorListElement).toHaveClass('border-red-400')
      expect(errorItemElements[0].textContent).toContain('exists');
      expect(errorItemElements[0]).toHaveClass('text-red-400')
      
      // Check that the error list and item elements do not have classes that would make it invisible
      expect(errorListElement).not.toHaveClass('hidden')
      expect(errorListElement).not.toHaveClass('invisible')
      expect(errorListElement).not.toHaveClass('opacity-0')
      expect(errorItemElements[0]).not.toHaveClass('hidden')
      expect(errorItemElements[0]).not.toHaveClass('invisible')
      expect(errorItemElements[0]).not.toHaveClass('opacity-0')


      // Restore the original implementation
      vi.restoreAllMocks()
    })
  })
})