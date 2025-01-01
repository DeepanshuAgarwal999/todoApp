import React from 'react'
import SearchInput from './SearchInput'
import TodoList from './TodoList'

const Home = () => {
    
    return (
        <div>
            <h1 className='text-6xl font-semibold text-center text-red-700 mt-20'>
                Daily  Todos
            </h1>
            <div className='mt-10 max-w-3xl mx-auto'>
                <SearchInput />
                <TodoList />
            </div>


        </div>
    )
}

export default Home