import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface Todo {
  title: string;
  description: string;
  completedOn?: string;
}

export const TodoList: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState<boolean>(false);

  // Add new todo item to the list
  const handleAddNewToDo = () => {
    let newToDoObj: Todo = {
      title: newTodoTitle,
      description: newDescription,
    };

    let updatedTodoArr: Todo[] = [...allTodos];
    updatedTodoArr.push(newToDoObj);

    setAllTodos(updatedTodoArr);
    // TODO: change to correct api call
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewDescription("");
    setNewTodoTitle("");
  };

  useEffect(() => {
    // save todo list to the local storage
    let savedTodos = JSON.parse(
      // TODO: change to correct api call
      localStorage.getItem("todolist") || "[]"
    ) as Todo[];

    // save completed todo list to the local storage
    let savedCompletedToDos = JSON.parse(
      // TODO: change to correct api call
      localStorage.getItem("completedTodos") || "[]"
    ) as Todo[];

    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  // Delete todo item from the todo list
  const handleToDoDelete = (index: number) => {
    let reducedTodos: Todo[] = [...allTodos];
    reducedTodos.splice(index, 1);

    // TODO: change to correct api call - add delete api and post api calls
    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  // Delete completed todo item from completed list
  const handleCompletedTodoDelete = (index: number) => {
    let reducedCompletedTodos: Todo[] = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);

    // TODO: change to correct api call
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  // Mark completed item in the todo list and moving those items to the completed list
  const handleComplete = (index: number) => {
    let filteredTodo: Todo = {
      ...allTodos[index],
    };

    let updatedCompletedList: Todo[] = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);

    // TODO: change to correct api call
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );

    handleToDoDelete(index);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className="check-icon"
                    icon={faPenToSquare}
                    onClick={() => ""}
                  />
                  <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    onClick={() => handleToDoDelete(index)}
                  />
                  <FontAwesomeIcon
                    className="check-icon"
                    icon={faCheckCircle}
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}
          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
