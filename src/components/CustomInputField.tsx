import { ChevronDown } from 'lucide-react';
import React, { useEffect } from 'react';
import { useTodo } from '../context/TodoProvider';

interface Todo {
  id: number;
  title: string;
  active: boolean;
}

const CustomInputField = ({
  mode = 'add',
  todo,
  setTodoToEdit,
}: {
  mode: 'add' | 'edit';
  todo?: Todo;
  setTodoToEdit?: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { addTodo, todos, editTodo, toggleAllTodosStatus } = useTodo();
  const [inputValue, setInputValue] = React.useState<string>('');
  const [allTodosStatus, setAllTodosStatus] = React.useState<boolean>(false);

  useEffect(() => {
    if (mode === 'edit' && todo) {
      setInputValue(todo.title);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return alert('Please enter a task');

    if (mode === 'edit') {
      if (!todo) return alert('Task not found');
      editTodo(todo.id, inputValue.trim());
      setTodoToEdit && setTodoToEdit(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: inputValue.trim(),
        active: false,
      };
      addTodo(newTodo);
    }

    setInputValue('');
  };
  const handleToggle = () => {
    toggleAllTodosStatus(!allTodosStatus)
    setAllTodosStatus(!allTodosStatus)
  }


  return (
    <form onSubmit={handleSubmit} className='w-full bg-[#FEFEFE]'>
      <div
        className={`${mode !== "edit" && Object.keys(todos).length === 0 && "pl-4"} flex items-center gap-1 focus-within:border-2 border focus-within:border-red-700 w-full ring-red-700 ${mode === "edit" && "pl-12"}`}
      >
        {Object.keys(todos).length !== 0 && mode === 'add' &&
          <button type='button'
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleToggle()} className='hover:ring-2 active:ring-2  h-16 ring-red-700 px-4'>
            <ChevronDown />
          </button>
        }
        <input
          type="text"
          placeholder={mode === 'edit' ? '' : 'What needs to be done?'}
          className="placeholder:italic w-full  text-2xl outline-none h-16 "
          value={inputValue}
          onKeyDown={(e) => e.key === 'Escape' && setTodoToEdit && setTodoToEdit(null)}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => mode === 'edit' && setTodoToEdit && setTodoToEdit(null)}
          autoFocus={mode === 'edit'}
        />
      </div>
    </form>
  );
};

export default CustomInputField;
