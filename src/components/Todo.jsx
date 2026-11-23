
import { useState, useEffect } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    const parts = date.split("-");
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  };

  const formatTime = (time) => {
    if (!time) return "";

    const parts = time.split(":");
    let hours = Number(parts[0]);
    const minutes = parts[1];
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;

    return hours + ":" + minutes + " " + period;
  };

  const handleAdd = () => {
    if (task.trim() === "" || date === "" || time === "") {
      alert("Please enter task, date and time");
      return;
    }

    if (editIndex !== null) {
      const newTodos = [...todos];

      newTodos[editIndex] = {
        ...newTodos[editIndex],
        text: task.trim(),
        date: date,
        time: time
      };

      setTodos(newTodos);
      setEditIndex(null);
    } else {
      const newTask = {
        text: task.trim(),
        date: date,
        time: time,
        completed: false
      };

      setTodos([...todos, newTask]);
    }

    setTask("");
    setDate("");
    setTime("");
  };

  const handleEdit = (index) => {
    setTask(todos[index].text);
    setDate(todos[index].date);
    setTime(todos[index].time);
    setEditIndex(index);
    setActiveTab("All");
  };

  const handleCancel = () => {
    setTask("");
    setDate("");
    setTime("");
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

  const handleSelectAll = (checked) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      completed: checked
    }));

    setTodos(newTodos);
  };

  const completed = todos.filter((todo) => todo.completed);
  const pending = todos.filter((todo) => !todo.completed);

  const allCompleted =
    todos.length > 0 && todos.every((todo) => todo.completed);

  let filteredTodos = todos;

  if (activeTab === "Completed") {
    filteredTodos = completed;
  } else if (activeTab === "Pending") {
    filteredTodos = pending;
  }

  filteredTodos = filteredTodos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-5 sm:p-7 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-blue-700 mb-7">
          Todo App
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto] gap-3 mb-7">
          <input
            type="text"
            placeholder="Enter the task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
            >
              {editIndex !== null ? "Update" : "Add Task"}
            </button>

            {editIndex !== null && (
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-3 rounded-xl"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="border border-gray-300 rounded-2xl p-3 mb-6">
          <div className="flex justify-start items-center gap-3 flex-wrap">

            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-blue-600 ${
              activeTab === "All"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}>
              <input
                type="checkbox"
                checked={allCompleted}
                onChange={(e) => handleSelectAll(e.target.checked)}
                disabled={todos.length === 0}
                className="w-4 h-4 cursor-pointer"
              />

              <button
                onClick={() => setActiveTab("All")}
                className="text-sm font-medium"
              >
                All ({todos.length})
              </button>
            </div>

            <button
              onClick={() => setActiveTab("Completed")}
              className={`px-4 py-2 text-sm rounded-full border border-blue-600 ${
                activeTab === "Completed"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
              }`}
            >
              Completed ({completed.length})
            </button>

            <button
              onClick={() => setActiveTab("Pending")}
              className={`px-4 py-2 text-sm rounded-full border border-blue-600 ${
                activeTab === "Pending"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
              }`}
            >
              Pending ({pending.length})
            </button>

          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {search ? "No matching tasks found" : "No tasks available"}
            </p>
          ) : (
            filteredTodos.map((todo) => {
              const index = todos.indexOf(todo);
              const deadline = new Date(todo.date + "T" + todo.time);

              const isOverdue =
                !todo.completed &&
                todo.date &&
                todo.time &&
                deadline < currentTime;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    todo.completed
                      ? "bg-green-50 border-green-300"
                      : activeTab === "All" && isOverdue
                      ? "bg-red-50 border-red-400"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheck(index)}
                    className="w-5 h-5 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold break-words ${
                      todo.completed
                        ? "text-green-700"
                        : activeTab === "All" && isOverdue
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}>
                      {todo.text}
                    </p>

                    <div className="flex gap-3 mt-2 text-sm text-gray-600">
                      <span>{formatDate(todo.date)}</span>
                      <span>{formatTime(todo.time)}</span>
                    </div>

                    {todo.completed && (
                      <p className="text-green-600 text-sm mt-1">
                        Completed
                      </p>
                    )}

                  </div>

                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
                  >
                    Edit
                  </button>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default Todo;
