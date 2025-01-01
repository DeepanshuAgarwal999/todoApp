import React, { useEffect, useState } from 'react'
import { useTodo } from '../context/TodoProvider'
import { Check } from 'lucide-react';
import Filter from './Filter';

interface Todo {
    id: number;
    title: string;
    active: boolean;
}

const TodoList = () => {
    const { todos, removeTodo, editTodo, handleToggle, clearCompleted } = useTodo()
    const [inputValue, setInputValue] = useState('')
    const [isEdit, setIsEdit] = useState<number | null>(null)
    const [filteredTodos, setFilteredTodos] = useState<TodoList>({})

    useEffect(() => {
        setFilteredTodos(todos)
    }, [todos])
    // Start editing on double-click
    const handleDoubleClick = (id: number, title: string) => {
        setIsEdit(id)
        setInputValue(title)
    }
    // Save edited todo
    const handleSave = (id: number) => {
        if (!inputValue) alert('Field cannot be empty')
        editTodo(id, inputValue)
        setIsEdit(null)
        setInputValue('')
    }
    console.log(filteredTodos);

    return (
        <div>
            {Object.values(filteredTodos).map((todo: Todo) => (
                <div
                    key={todo.id}
                    className='mt-1 bg-white group border-b max-w-3xl mx-auto p-4 h-16 flex items-center justify-between gap-8 shadow-lg focus-within:ring-2 ring-red-700'

                >
                    {isEdit === todo.id ? (
                        <form action="" onSubmit={() => handleSave(todo.id)}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onBlur={() => handleSave(todo.id)}
                                autoFocus
                                className='w-full h-14 outline-none bg-transparent text-3xl pl-6'
                            />
                        </form>
                    ) : (
                        <div
                            className='flex items-center gap-4 w-full'
                            onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
                        >
                            <input
                                type="checkbox"
                                checked={todo.active}
                                onChange={() => handleToggle(todo.id)}
                            />
                            <p className={`text-3xl truncate ${todo.active ? "line-through text-gray-400" : "underline"}`}>{todo.title}</p>
                        </div>
                    )}

                    {
                        isEdit === todo.id ? <button
                            className='text-3xl text-green-600'
                            onClick={() => handleSave(todo.id)}
                        >
                            <Check />
                        </button>
                            : <button
                                className={`text-xl text-red-600 ${todo.active ? "text-gray-400" : ""}`}
                                onClick={() => removeTodo(todo.id)}
                            >
                                X
                            </button>
                    }
                </div>
            ))}
            <Filter setFilteredTodos={setFilteredTodos} />
        </div>
    )
}

export default TodoList
