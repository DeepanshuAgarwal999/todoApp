import React, { useState } from "react";
import TodoList from "../components/TodoList";

type TodoContext = {
    addTodo: (todo: Todo) => void,
    todos: TodoList,
    removeTodo: (id: number) => void,
    editTodo: (id: number, title: string) => void,
    clearCompleted: () => void,
    handleToggle: (id: number) => void,
}
const todoContext = React.createContext<TodoContext | null>(null)

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<TodoList>(() => JSON.parse(localStorage.getItem("todos") || "{}"))

    const addTodo = (todo: Todo) => {
        setTodos((prevTodo) => {
            const newTodos = { ...prevTodo, [todo.id]: todo }
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos
        })
    }
    const removeTodo = (id: number) => {
        setTodos((prevTodo) => {
            // @ts-ignore
            // const { [id]: _, ...rest } = prevTodo
            const updatedTodos = { ...prevTodo }
            delete updatedTodos[id]
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        })
    }
    const editTodo = (id: number, title: string) => {
        setTodos((prevTodo) => {
            const updatedTodos = {
                ...prevTodo,
                [id]: { ...todos[id], title }
            }
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        })
    }
    const handleToggle = (id: number) => {
        setTodos((prevTodo) => {
            const updatedTodos = {
                ...prevTodo,
                [id]: { ...todos[id], active: !todos[id].active }
            }
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        })
    }
    const clearCompleted = () => {
        setTodos((prevTodo) => {
            const updatedTodos = Object.fromEntries(Object.entries(prevTodo).filter(([id, todo]) => !todo.active))
            localStorage.setItem("todos", JSON.stringify(updatedTodos))
            return updatedTodos
        })
    }

    return (
        <todoContext.Provider value={{ todos, removeTodo, addTodo, editTodo, clearCompleted, handleToggle }}>
            {children}
        </todoContext.Provider>
    )
}

const useTodo = () => {
    const context = React.useContext(todoContext)
    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider")
    }
    return context
}

export { TodoProvider, useTodo }