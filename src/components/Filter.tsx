import { useTodo } from '../context/TodoProvider';

const Filter = () => {
  const { todos, clearCompleted, setFilter, filter, activeTodos } = useTodo();
  if (Object.keys(todos).length === 0 && !filter) return null;

  return (
    <div className='bg-transparent'>
      <div className="bg-white p-4 px-6 h-16 shadow-md flex items-center justify-between gap-4 border-b">
        <p>{activeTodos} items left!</p>
        <div className="flex items-center gap-4 *:rounded-sm">
          <button onClick={() => setFilter(null)} className={`hover:ring-1 ring-red-700 p-1 px-2 ${!filter ? 'border border-red-700 shadow-md shadow-red-700' : ''}`}>All</button>
          <button onClick={() => setFilter('active')} className={`hover:ring-1 ring-red-700 p-1 px-2 ${filter === 'active' ? 'border border-red-700 shadow-md shadow-red-700' : ''}`}>Active</button>
          <button onClick={() => setFilter('completed')} className={`hover:ring-1 ring-red-700 p-1 px-2 ${filter === 'completed' ? 'border border-red-700 shadow-md shadow-red-700' : ''}`}>Completed</button>
        </div>
        <button onClick={() => clearCompleted()} className='hover:ring-1 ring-red-700 p-1'>Clear Completed</button>
      </div>
      <div className='h-[.3rem] mx-1 border-b border-[#C6C6C6] bg-[#f6f6f6]'>
      </div>
      <div className='h-[.275rem] mx-2 border-b  bg-[#f6f6f6] border-[#C6C6C6]'>
      </div>
    </div>
  );
};

export default Filter;
