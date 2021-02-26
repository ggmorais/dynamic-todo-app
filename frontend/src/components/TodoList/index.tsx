import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";

import Todo from "./Todo";
import api from "../../services/api";
import "./styles.css";


const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = async () => {
    const res = await api.get("/todos");

    setTodos(res.data.data);
  };

  const updateTodo = async (newTodo: ITodo) => {
    setTodos(todos.map(todo => todo.id == newTodo.id ? newTodo : todo));

    await api.patch(`/todos/${newTodo.id}`, newTodo);
  }

  const addNewTodo = async () => {
    const description = prompt("New TODO's description: ");

    if (description) {
      const res = await api.post("/todos/create", { description });

      const id = res.data.id as number;

      setTodos([...todos, {
        id,
        description,
        is_done: false
      }])
    }
  }

  const deleteTodo = async (deletedTodo: ITodo) => {
    setTodos(todos.filter(todo => todo.id != deletedTodo.id));

    await api.delete(`/todos/${deletedTodo.id}`);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todolist-container">
      <h2>TODO LIST</h2>

      <p><i>Tip: <b>double click</b> on the todo text to rename it.</i></p>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          data={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
      <div className="new-todo" onClick={addNewTodo}>
        <FiPlus size={32} />
      </div>
    </div>
  );
}

export default TodoList;