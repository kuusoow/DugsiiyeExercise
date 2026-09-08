import { useContext } from 'react';
import TodoContext from './TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { state } = useContext(TodoContext);

  if (state.length === 0) {
    return <p className="text-center text-slate-400 py-6">No todos yet</p>;
  }

  return (
    <ul className="space-y-3">
      {state.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;