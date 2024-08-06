import { describe, expect, it } from "vitest";
import { validateTodo } from "../../utilities/validation.utilities";

import type { ITodo } from "../../app/types";

describe('Validation utilites functions', () => {
  describe('validateTodo function', () => {
    it('returns an empty array if the todo item is valid', () => {
      // Create a new todo
      const todoWithCorrectFormatOne = "Buy 4 apples"
      
      // Create a new todos array
      const todos: ITodo[] = [{ name: "Cleaning the bathroom" }]

      // Run the "validateTodo" function
      const errors = validateTodo({ todoName: todoWithCorrectFormatOne, todos })

      // Check if the "errors" array is empty
      expect(errors).toEqual([])
    })
    
    it('returns an array with one error message that matches the required patthern for empty string', () => {
      // Create a new todo
      const emptyString = ""
      
      // Create a new todos array
      const todos: ITodo[] = [{ name: "Cleaning the bathroom" }]

      // Run the "validateTodo" function
      const errors = validateTodo({ todoName: emptyString, todos })

      // Check if the "errors" array contains exactly one item with the correct pattern
      expect(errors.some(error => /cannot be empty/.test(error))).toBe(true)
      expect(errors).toHaveLength(1)
    })
    it('returns an array with one error message that matches the required patthern for short string', () => {
      // Create a new todo
      const shortString = "A"
      
      // Create a new todos array
      const todos: ITodo[] = [{ name: "Cleaning the bathroom" }]

      // Run the "validateTodo" function
      const errors = validateTodo({ todoName: shortString, todos })

      // Check if the "errors" array contains exactly one item with the correct pattern
      expect(errors.some(error => /between/.test(error))).toBe(true)
      expect(errors).toHaveLength(1)
    })

    it(`
      returns an array with two error message that matches the required patthern for short string and invalid format
    `, () => {
      // Create a new todo
      const invalidAndShortString = "/"
      
      // Create a new todos array
      const todos: ITodo[] = [{ name: "Cleaning the bathroom" }]

      // Run the "validateTodo" function
      const errors = validateTodo({ todoName: invalidAndShortString, todos })

      // Check if the "errors" array contains exactly two items with the correct pattern
      expect(errors.some(error => /between/i.test(error))).toBe(true)
      expect(errors.some(error => /can only contain/i.test(error))).toBe(true)
      expect(errors).toHaveLength(2)
    })
    it('returns an array with one error message that matches the required patthern for long string', () => {
      // Create a new todo
      const longString = "Take out the trash and clean the bathroom"
      
      // Create a new todos array
      const todos: ITodo[] = [{ name: "Cleaning the bathroom" }]

      // Run the "validateTodo" function
      const errors = validateTodo({ todoName: longString, todos })

      // Check if the "errors" array contains exactly one item with the correct pattern
      expect(errors.some(error => /between/i.test(error))).toBe(true)
      expect(errors).toHaveLength(1)
    })
    it('returns an array with one error message that matches the required patthern for invalid format', () => {
      // Create new todos
      const newTodoWithInvalidFormatOne = "Finish the #2 issue"
      const newTodoWithInvalidFormatTwo = "1 + 1 = 2"
      
      // Create a new todos array
      const todos: ITodo[] = [{ name: "Cleaning the bathroom" }]

      // Run the "validateTodo" function
      const errorsOne = validateTodo({ todoName: newTodoWithInvalidFormatOne, todos })
      const errorsTwo = validateTodo({ todoName: newTodoWithInvalidFormatTwo, todos })

      // Check if the "errorsOne" array contains exactly one item with the correct pattern
      expect(errorsOne.some(error => /can only contain/.test(error))).toBe(true)
      expect(errorsOne).toHaveLength(1)

      // Check if the "errorsTwo" array contains exactly one item with the correct pattern
      expect(errorsTwo.some(error => /can only contain/.test(error))).toBe(true)
      expect(errorsTwo).toHaveLength(1)

    })
    it('returns an array with one error message, if the todo already exists', () => {
      // Create a new todo
      const newTodo = "Cleaning the bathroom"
      
      // Create a new todos array
      const todos: ITodo[] = [{ name: newTodo }]

      // Run the "validateTodo" function
      const errors = validateTodo({ todoName: newTodo, todos })

      // Check if the "errors" array contains exactly one item with the correct pattern
      expect(errors.some(error => /already exists/i.test(error))).toBe(true)
      expect(errors).toHaveLength(1)
    })
  })
})