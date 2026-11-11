
import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    if (task.trim() === "") {
      return;
    }

    setTodos([...todos, task]);
    setTask("");
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="todo-list">
        {todos.map((todo, index) => (
          <div className="todo-item" key={index}>
            <span>{todo}</span>

            <div>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
