import React from 'react'
import TodoList from './TodoList'
import CustomInputField from './CustomInputField'
import Filter from './Filter'

const Home = () => {
    return (
        <div className='bg-[#F5F5F5] w-full h-screen'>
            <h1 className='text-6xl font-semibold text-center text-red-700 pt-20'>
                Daily  Todos
            </h1>
            <div className='mt-10 max-w-3xl mx-auto '>
                <CustomInputField mode='add' />
                <TodoList />
                <Filter />
            </div>
        </div>
    )
}

export default Home