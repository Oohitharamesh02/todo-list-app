
import { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("All");

  const handleAdd = () => {
    if (task.trim() === "") {
      return;
    }

    if (editIndex !== null) {
      const newTodos = [...todos];
      newTodos[editIndex] = {
        ...newTodos[editIndex],
        text: task,
      };
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
    setActiveTab("All");
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

  const completed = todos.filter((todo) => todo.completed);
  const pending = todos.filter((todo) => !todo.completed);

  let filteredTodos = todos;

  if (activeTab === "Completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (activeTab === "Pending") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Todo List
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 min-w-0 border border-gray-300 p-3 rounded-lg"
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

        <div className="border border-gray-300 rounded-xl overflow-hidden">

          <div className="flex border-b border-gray-300">

            <button
              onClick={() => setActiveTab("All")}
              className={`flex-1 p-4 font-semibold ${
                activeTab === "All"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              All ({todos.length})
            </button>

            <button
              onClick={() => setActiveTab("Completed")}
              className={`flex-1 p-4 font-semibold ${
                activeTab === "Completed"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Completed ({completed.length})
            </button>

            <button
              onClick={() => setActiveTab("Pending")}
              className={`flex-1 p-4 font-semibold ${
                activeTab === "Pending"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Pending ({pending.length})
            </button>

          </div>

          <div className="p-5 min-h-64">

            {filteredTodos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No tasks available
              </p>
            ) : (
              filteredTodos.map((todo) => {
                const index = todos.indexOf(todo);

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-slate-100 p-3 rounded-lg mb-3"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCheck(index)}
                      className="w-4 h-4"
                    />

                    <span className="flex-1 break-all">
                      {todo.text}
                    </span>

                    {activeTab === "All" && (
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-orange-500 text-white px-3 py-2 rounded-lg"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                );
              })
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Todo;
