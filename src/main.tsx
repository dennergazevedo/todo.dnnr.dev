import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { TodoProvider } from './sdk/todoContext.tsx'

import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <TodoProvider>
        <App />
      </TodoProvider>
  </React.StrictMode>,
)
