
import { useState } from "react";

function Todo() {
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
    <div className="min-h-screen bg-slate-100 flex justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Todo List
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-blue-300 bg-blue-50 text-gray-800 text-base px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white text-base font-semibold px-5 py-3 rounded-lg"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-100 p-3 rounded-lg"
            >
              <span className="text-base text-gray-800 break-all">
                {todo}
              </span>

              <div className="flex gap-2 shrink-0 ml-3">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded-md">
                  Edit
                </button>

                <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Todo;
