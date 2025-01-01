import { ChevronDown } from 'lucide-react'
import React from 'react'
import { useTodo } from '../context/TodoProvider'

const SearchInput = () => {
  const { addTodo } = useTodo()
  const [inputValue, setInputValue] = React.useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue === '') return alert('Please enter a task')
    const todo = {
      id: Date.now(),
      title: inputValue,
      active: false,
    }
    addTodo(todo)
    setInputValue('')
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className='bg-white max-w-3xl mx-auto p-4 h-16 flex items-center gap-4 shadow-lg focus-within:ring-2 ring-red-700 '>
        <div>
          <ChevronDown />
        </div>
        <input type="text" placeholder="What needs to be done?" className='placeholder:italic w-full h-full text-3xl outline-none'
          value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </div>
    </form>
  )
}

export default SearchInput