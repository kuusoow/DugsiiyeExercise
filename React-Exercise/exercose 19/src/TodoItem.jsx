import { useContext } from 'react';
import TodoContext from './TodoContext';
import styles from './TodoItem.module.css'

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);


return (
  <li className={styles.todoList}>
  <div> 
     <input
      type="checkbox"
      checked={todo.completed}
      onChange={() =>
        dispatch({
          type: 'toggle',
          payload: todo.id
        })
      }
    />

    <span
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
      }}
    >
      {todo.text}
    </span>
    </div>

    <button
      onClick={() =>
        dispatch({
          type: 'delete',
          payload: todo.id
        })
      }
    >
      Delete
    </button>
  </li>
)


};

export default TodoItem;