import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TodoProvider from './contexts/TodoContext/TodoContext.tsx'
import { ThemeProvider } from './contexts/ThemeProvider/themeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <TodoProvider initialState={[]}>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
