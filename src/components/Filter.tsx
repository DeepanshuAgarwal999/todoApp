import React, { useMemo, useState, useEffect } from 'react';
import { useTodo } from '../context/TodoProvider';

const Filter = ({ setFilteredTodos }: { setFilteredTodos: React.Dispatch<React.SetStateAction<TodoList>> }) => {
  const { todos, clearCompleted } = useTodo();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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
        return todos;
    }
  }, [todos, filter]);

  useEffect(() => {
    setFilteredTodos(filteredTodos);
  }, [filteredTodos, setFilteredTodos]);

  if (Object.keys(todos).length === 0) return null;

  return (
    <div className="bg-white p-4 h-16 shadow-md flex items-center justify-between gap-4 border-b">
      <p>{activeTodos} items left!</p>
      <div className="flex items-center gap-4 *:rounded-sm">
        <button onClick={() => setFilter('all')} className={`hover:ring-1 ring-red-700 p-1 ${filter === 'all' ? 'border border-red-700 shadow-md shadow-red-700' : ''}`}>All</button>
        <button onClick={() => setFilter('active')} className={`hover:ring-1 ring-red-700 p-1 ${filter === 'active' ? 'border border-red-700 shadow-md shadow-red-700' : ''}`}>Active</button>
        <button onClick={() => setFilter('completed')} className={`hover:ring-1 ring-red-700 p-1 ${filter === 'completed' ? 'border border-red-700 shadow-md shadow-red-700' : ''}`}>Completed</button>
      </div>
      <button onClick={() => clearCompleted()} className='hover:ring-1 ring-red-700 p-1'>Clear Completed</button>
    </div>
  );
};

export default Filter;
