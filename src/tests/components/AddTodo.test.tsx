import { render, screen, userEvent } from "../testUtilities/testUtils"
import { describe, expect, it } from "vitest"
import AddTodo from "../../components/AddTodo/AddTodo"

describe('AddTodo component', () => {
  describe('Basic functionality', () => {
    it('ensures that the todo name input field is present in the document and visible', async () => {
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))

      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Check if the input element is visible to the user
      expect(todoNameInputElement).toHaveClass('tw-border')

      // Check that the input element does not have classes that would make it invisible
      expect(todoNameInputElement).not.toHaveClass('tw-hidden')
      expect(todoNameInputElement).not.toHaveClass('tw-invisible')
      expect(todoNameInputElement).not.toHaveClass('tw-opacity-0')
    })
    
    it('ensures the "Add To-Do" submit button is in the document and visible', async () => {
      // Render "AddTodo" component
      render(<AddTodo />)

      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))
      
      // Find the "Add Todo" button
      const addTodoButtonElement = screen.getByTestId('add-todo-button')

      // Check if the button element is visible to the user
      expect(addTodoButtonElement).toHaveClass('tw-bg-primary')
      
      // Check that the input element does not have classes that would make it invisible
      expect(addTodoButtonElement).not.toHaveClass('tw-hidden')
      expect(addTodoButtonElement).not.toHaveClass('tw-invisible')
      expect(addTodoButtonElement).not.toHaveClass('tw-opacity-0')
    })

    it('ensures the label is correctly associated with the input field and visible', async () => {
      // Render the "AddTodo" component
      render(<AddTodo />)

      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))

      // Find todo name label and input field
      const todoNameLabelElement = screen.getByTestId('todo-name-label')
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Check if the label element is visible to the user
      expect(todoNameLabelElement).toHaveClass('tw-block')
      expect(todoNameLabelElement).toHaveClass('tw-uppercase')
      
      // Check that the input element does not have classes that would make it invisible
      expect(todoNameLabelElement).not.toHaveClass('tw-hidden')
      expect(todoNameLabelElement).not.toHaveClass('tw-invisible')
      expect(todoNameLabelElement).not.toHaveClass('tw-opacity-0')

      // Check if the label elements's for attribute is the same as the input's id
      expect(todoNameLabelElement).toHaveAttribute('for', todoNameInputElement.id)
    })
  })

  describe('Error state', () => {
    it('does NOT display the error list on the initial render', async () => {
      // Render the "AddTodo" component
      render(<AddTodo />)
      
      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))

      // Try to find the error list element
      const errorListElement = screen.queryByTestId('error-list')

      //Check if the error list element is NOT in the document
      expect(errorListElement).toBe(null)
    })

    it('displays the error list if the user tries to add an invalid todo', async () => {
      // Create a new dummy todo
      const newTodo = '/'
      
      // Render the "AddTodo" component
      render(<AddTodo />, { initialTodoState: [] })
      
      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))

      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')

      // Write the todo in the input field and click the button
      await userEvent.type(todoNameInputElement, newTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))
      
      // Try to find the error list element
      const errorListElement = screen.getByTestId('error-list')

      // Check if the error list element is visible to the user
      expect(errorListElement).toHaveClass('tw-border-red-400')
      
      // Check that the error list element does not have classes that would make it invisible
      expect(errorListElement).not.toHaveClass('tw-hidden')
      expect(errorListElement).not.toHaveClass('tw-invisible')
      expect(errorListElement).not.toHaveClass('tw-opacity-0')
    })

    it('clears previous errors if the user successfully adds a todo', async () => {
      // Create new dummy todos
      const validTodo = 'Clean the bathroom'
      const invalidTodo = '/'
      
      // Render the "AddTodo" component
      render(<AddTodo />, { initialTodoState: [] })
      
      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))
      
      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')
      
      // Write an invalid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, invalidTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))

      // Try to find the error list element
      let errorListElement = screen.queryByTestId('error-list')

      // Check if the error list element is visible to the user
      expect(errorListElement).toHaveClass('tw-border-red-400')
      
      // Check that the error list element does not have classes that would make it invisible
      expect(errorListElement).not.toHaveClass('tw-hidden')
      expect(errorListElement).not.toHaveClass('tw-invisible')
      expect(errorListElement).not.toHaveClass('tw-opacity-0')

      // Write a valid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, validTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))

      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))
      
      // Try to find the error list element
      errorListElement = screen.queryByTestId('error-list')

      //Check if the error list element is NOT present in the document
      expect(errorListElement).toBe(null)
    })
    
    it('updates the previous errors if the user adds another invalid todo', async () => {
      // Create new dummy todos
      const invalidTodoOne = '/'
      const alreadyExistsTodo = 'milk'
      const todoItem = {id: new Date().getTime(), isCompleted: false, name: "milk" }

      // Render the "AddTodo" component
      render(<AddTodo />, { initialTodoState: [todoItem] })
      
      // Click the "Add To-Do" button
      await userEvent.click(screen.getByText(/add to-do/i))
      
      // Find the todo name input element
      const todoNameInputElement = screen.getByTestId('todo-name-input')
      
      // Write an invalid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, invalidTodoOne)
      await userEvent.click(screen.getByTestId('add-todo-button'))

      // Try to find the error list and item elements
      let errorListElement = screen.queryByTestId('error-list')
      let errorItemElements = screen.queryAllByTestId('error-item')

      // Check if the error list and item elements are visible to the user
      expect(errorListElement).toHaveClass('tw-border-red-400')
      expect(errorItemElements[0].textContent).toContain('between');
      expect(errorItemElements[0]).toHaveClass('tw-text-red-400')

      // Write a valid todo in the input field and click the button
      await userEvent.type(todoNameInputElement, alreadyExistsTodo)
      await userEvent.click(screen.getByTestId('add-todo-button'))
      
      // Try to find the error list and item elements
      errorListElement = screen.queryByTestId('error-list')
      errorItemElements = screen.queryAllByTestId('error-item')

      // Check if the error list and item elements are visible to the user
      expect(errorListElement).toHaveClass('tw-border-red-400')
      expect(errorItemElements[0].textContent).toContain('exists');
      expect(errorItemElements[0]).toHaveClass('tw-text-red-400')
    })
  })
})