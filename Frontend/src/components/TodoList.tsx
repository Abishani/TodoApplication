import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Todo {
  id: string;
  title: string;
  description: string;
}

export const TodoList: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);


  useEffect(() => {
    (async () => await Load())();
  }, []);

  // Diplay all the added todos
  async function Load() {
    try {
      const result = await axios.get<Todo[]>(
        "https://localhost:44325/api/Todo/GetTodo"
      );
      setTodos(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  // add todo ite to the list
  async function save(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:44325/api/Todo/AddTodo", {
        title: title,
        description: description,
      });
      alert("Todo item added Successfully");
      setId("");
      setTitle("");
      setDescription("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  // edit todo - display the added todo item in the text box
  async function editTodo(todo: Todo) {
    setTitle(todo.title);
    setDescription(todo.description);
    setId(todo.id);
  }

  // delete todo item from the list
  async function DeleteTodo(todoId: string) {
    await axios.delete(`https://localhost:44325/api/Todo/DeleteTodo/${todoId}`);
    alert("Todo item deleted Successfully");
    setId("");
    setTitle("");
    setDescription("");
    Load();
  }

  // update the todo item
  async function update(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      const todoItemUpdate = todos.find((u) => u.id === id);
      if (todoItemUpdate) {
        await axios.patch(
          `https://localhost:44325/api/Todo/UpdateTodo/${todoItemUpdate.id}`,
          {
            id: id,
            title: title,
            description: description,
          }
        );
        alert("Todo Item Updated");
        setId("");
        setTitle("");
        setDescription("");
        Load();
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's the description?"
            />
          </div>
          <div className="todo-input-button">
            <button className="primary-btn" type="button" onClick={save}>
              Add
            </button>
            <button className="primary-btn" type="button" onClick={update}>
              Update
            </button>
          </div>
        </div>
        <div className="todo-list">
          <div>
            <h3>Todos</h3>
          </div>
          {todos.map((todo) => (
            <div className="todo-list-item" key={todo.id}>
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div>
                <FontAwesomeIcon
                  className="check-icon"
                  icon={faPenToSquare}
                  onClick={() => editTodo(todo)}
                />
                <FontAwesomeIcon
                  className="delete-icon"
                  icon={faTrash}
                  onClick={() => DeleteTodo(todo.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
