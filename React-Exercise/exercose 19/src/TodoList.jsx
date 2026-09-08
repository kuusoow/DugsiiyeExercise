import { useContext } from 'react';
import TodoContext from './TodoContext';
import TodoItem from './TodoItem';
import styles from './TodoForm.module.css'
const TodoList = () => {
  const { state } = useContext(TodoContext);

  return (
    <ul className={styles.todoul}>
      {state.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
