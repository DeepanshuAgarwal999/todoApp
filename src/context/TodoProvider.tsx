import React, { useEffect, useMemo, useState } from "react";
import TodoList from "../components/TodoList";

type TodoContext = {
    addTodo: (todo: Todo) => void,
    todos: TodoList,
    removeTodo: (id: number) => void,
    editTodo: (id: number, title: string) => void,
    clearCompleted: () => void,
    handleToggle: (id: number) => void,
    setFilter: (filter: null | 'active' | 'completed') => void,
    filter: null | 'active' | 'completed',
    activeTodos: number,
    toggleAllTodosStatus: (status: boolean) => void
}
const todoContext = React.createContext<TodoContext | null>(null)

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [filter, setFilter] = useState<null | 'active' | 'completed'>(null);
    const [todos, setTodos] = useState<TodoList>(() => JSON.parse(localStorage.getItem("todos") || "{}"))

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const activeTodos = useMemo(() => {
        return Object.values(todos).filter((todo) => !todo.active).length;
    }, [todos]);

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return Object.fromEntries(Object.entries(todos).filter(([_, todo]) => !todo.active));
            case 'completed':
                return Object.fromEntries(Object.entries(todos).filter(([_, todo]) => todo.active));
            default:
                return todos
        }
    }, [todos, filter]);

    const addTodo = (todo: Todo) => {
        setTodos((prevTodo) => {
            const newTodos = { ...prevTodo, [todo.id]: todo }
            return newTodos
        })
    }
    const removeTodo = (id: number) => {
        setTodos((prevTodo) => {
            // const { [id]: _, ...rest } = prevTodo
            const updatedTodos = { ...prevTodo }
            delete updatedTodos[id]
            return updatedTodos
        })
        setFilter(null)
    }
    const editTodo = (id: number, title: string) => {
        if (title === "" || !id) return;
        setTodos((prevTodo) => {
            const updatedTodos = {
                ...prevTodo,
                [id]: { ...todos[id], title }
            }
            return updatedTodos
        })
    }
    const handleToggle = (id: number) => {
        setTodos((prevTodo) => {
            const updatedTodos = {
                ...prevTodo,
                [id]: { ...todos[id], active: !todos[id].active }
            }
            return updatedTodos
        })
    }
    const clearCompleted = () => {
        setTodos((prevTodo) => {
            const updatedTodos = Object.fromEntries(Object.entries(prevTodo).filter(([id, todo]) => !todo.active))
            return updatedTodos
        })
        setFilter(null)
    }
    const toggleAllTodosStatus = (status: boolean) => {
        setTodos((prevTodo) => {
            const updatedTodos = Object.fromEntries(Object.entries(prevTodo).map(([id, todo]) => [id, { ...todo, active: status }]))
            return updatedTodos
        })
    }
    const Todos = {
        setFilter,
        todos: filteredTodos,
        removeTodo,
        addTodo,
        editTodo,
        clearCompleted,
        handleToggle,
        filter,
        activeTodos,
        toggleAllTodosStatus
    }
    return (
        <todoContext.Provider value={{ ...Todos }}>
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