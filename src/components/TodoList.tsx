import React, { useEffect, useState } from 'react';
import { useTodo } from '../context/TodoProvider';
import CustomInputField from './CustomInputField';

interface Todo {
    id: number;
    title: string;
    active: boolean;
}

const TodoList = () => {
    const { todos, removeTodo, handleToggle } = useTodo();
    const [todoToEdit, setTodoToEdit] = useState<number | null>(null);

    const handleDoubleClick = (id: number) => {
        setTodoToEdit(id);
    };

    return (
        <div className="">
            {Object.values(todos).map((todo: Todo) => (
                <div
                    key={todo.id}
                    className="flex items-center group w-full bg-[#FEFEFE] border "
                >
                    {todoToEdit === todo.id ? (
                        <CustomInputField mode='edit' todo={todo} setTodoToEdit={setTodoToEdit} />
                    ) : (
                        <div
                            className="flex items-center gap-6 w-full py-4 px-4"
                            onDoubleClick={() => handleDoubleClick(todo.id)}
                        >
                            <input
                                type="checkbox"
                                checked={todo.active}
                                onChange={() => handleToggle(todo.id)}

                            />
                            <p className={`text-2xl truncate ${todo.active ? 'line-through text-gray-400' : ''}`}>
                                {todo.title}
                            </p>
                        </div>
                    )}
                    {
                        !todoToEdit && <button
                            className={`text-xl active:border-red-600 active:border p-2 mr-4 text-gray-600 hover:text-red-600 hidden ease-in-out duration-75 group-hover:block font-bold font-sans ${todo.active ? 'text-gray-400' : ''
                                }`}
                            onClick={() => removeTodo(todo.id)}
                        >
                            X
                        </button>
                    }
                </div>
            ))}
        </div>
    );
};

export default TodoList;
