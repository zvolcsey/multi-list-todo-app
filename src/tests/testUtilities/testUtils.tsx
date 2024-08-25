import type { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ITodo } from '@/app/types'
import { ThemeProvider } from '@/contexts/ThemeProvider/themeContext'
import { TodoProvider } from '@/contexts/TodoContext'

interface IOptions {
  initialTodoState?: ITodo[],
  options?: Omit<RenderOptions, "wrapper">
}

interface IWrapper {
  children: ReactNode,
}

// Inspired by examples from the React Testing Library documentation
// https://testing-library.com/docs/react-testing-library/setup/ 
const customRender = (
  ui: ReactElement,
  {initialTodoState, ...rtlOptions}: IOptions = {}
) => {
  function AllTheProviders({ children }: IWrapper) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TodoProvider initialState={initialTodoState}>
          {children}
        </TodoProvider>
      </ThemeProvider>
    )
  }
  return (
    render(ui, { wrapper: AllTheProviders, ...rtlOptions })
  )
}

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// override render method
export { customRender as render, userEvent }