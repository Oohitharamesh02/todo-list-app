
import { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (task.trim() === "") {
      return;
    }

    if (editIndex !== null) {
      const newTodos = [...todos];
      newTodos[editIndex].text = task;
      setTodos(newTodos);      
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }

    setTask("");
  };

  const handleEdit = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };

  const handleCancel = () => {
    setTask("");
    setEditIndex(null);
  };

  const handleCheck = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleAll = (checked) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      completed: checked,
    }));

    setTodos(newTodos);
  };

  const completed = todos.filter((todo) => todo.completed);
  const pending = todos.filter((todo) => !todo.completed);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl text-blue-600 font-bold text-center mb-6">
          Todo List
        </h1>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 min-w-0 border border-blue-300 bg-blue-50 p-3 rounded-lg"
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>

          {editIndex !== null && (
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-3 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="border p-4 rounded-lg">
            <div className="flex gap-2 items-center mb-4">
              <input
                type="checkbox"
                checked={todos.length > 0 && todos.every((todo) => todo.completed)}
                onChange={(e) => handleAll(e.target.checked)}
                disabled={todos.length === 0}
              />
              <h2 className="text-xl font-bold">All ({todos.length})</h2>
            </div>

            {todos.map((todo, index) => (
              <div key={index} className="flex items-center gap-2 bg-slate-100 p-3 rounded mb-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheck(index)}
                />

                <span className="flex-1 break-all">{todo.text}</span>

                <button
                  onClick={() => handleEdit(index)}
                  className="bg-orange-500 text-white px-3 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Completed ({completed.length})
            </h2>

            {completed.map((todo, index) => (
              <p key={index} className="bg-green-50 p-3 rounded mb-3 break-all">
                {todo.text}
              </p>
            ))}
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Pending ({pending.length})
            </h2>

            {pending.map((todo, index) => (
              <p key={index} className="bg-orange-50 p-3 rounded mb-3 break-all">
                {todo.text}
              </p>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Todo;
