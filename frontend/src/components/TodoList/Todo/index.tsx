import React from "react";
import { FiX } from "react-icons/fi";

import "./styles.css";


interface ITodoProps {
  data: ITodo;
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
}

const Todo: React.FC<ITodoProps> = ({ data, updateTodo, deleteTodo }) => {

  const updateTodoDescription = () => {
    const description = prompt("Edit TODO's description: ");

    if (description) {
      updateTodo({ ...data, description })
    }
  }

  return (
    <div className="todo-container">
      <input
        type="checkbox"
        className="todo-isdone"
        checked={data.is_done}
        onChange={() => updateTodo({ ...data, is_done: !data.is_done })}
      />
      <p className={`todo-description ${data.is_done ? "checked" : ""}`} onDoubleClick={updateTodoDescription}>
        {data.description}
      </p>

      <div className="delete-todo" onClick={() => deleteTodo(data)}>
        <FiX size={18} />
      </div>
    </div>
  );
}


export default Todo;