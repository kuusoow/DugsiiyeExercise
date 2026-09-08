import { useState, useContext } from 'react';
import TodoContext from './TodoContext';

const TodoForm = () => {
  const [text, setText] = useState('');
  const { dispatch } = useContext(TodoContext);

  const handleAdd = () => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      dispatch({ type: 'add', payload: newTodo });
      setText('');
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 placeholder-slate-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Add a new todo..."
      />
      <button
        onClick={handleAdd}
        className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-700 active:scale-95"
      >
        Add
      </button>
    </div>
  );
};

export default TodoForm;