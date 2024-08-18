import type { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AllTheProviders from './AllTheProviders'

// Inspired by examples from the React Testing Library documentation
// https://testing-library.com/docs/react-testing-library/setup/ 
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => 
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// override render method
export { customRender as render, userEvent }