import React from 'react'
import Home from './components/Home'
import { TodoProvider } from './context/TodoProvider'

const App = () => {
  return (
    <TodoProvider>
      <Home />
    </TodoProvider>
  )
}

export default App