import { useContext } from 'react';
import TodoContext from './TodoContext';

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  return (
    <li className="group flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="h-5 w-5 shrink-0 cursor-pointer rounded accent-blue-600"
          checked={todo.completed}
          onChange={() =>
            dispatch({
              type: 'toggle',
              payload: todo.id,
            })
          }
        />

        <span
          className={`text-lg ${
            todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        className="font-semibold text-red-500 opacity-0 transition group-hover:opacity-100 focus:opacity-100"
        onClick={() =>
          dispatch({
            type: 'delete',
            payload: todo.id,
          })
        }
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;