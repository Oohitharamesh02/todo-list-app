
import { useState, useEffect } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getDeadline = (date, time) => {
    const dateParts = date.split("/");
    const timeParts = time.match(
      /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i
    );

    if (
      dateParts.length !== 3 ||
      !timeParts
    ) {
      return null;
    }

    const day = Number(dateParts[0]);
    const month = Number(dateParts[1]);
    const year = Number(dateParts[2]);

    let hours = Number(timeParts[1]);
    const minutes = Number(timeParts[2]);
    const period = timeParts[3].toUpperCase();

    if (day < 1 || day > 31 || month < 1 || month > 12) {
      return null;
    }

    if (period === "PM" && hours !== 12) {
      hours = hours + 12;
    }

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const deadline = new Date(year, month - 1, day, hours, minutes);

    if (
      deadline.getDate() !== day ||
      deadline.getMonth() !== month - 1 ||
      deadline.getFullYear() !== year
    ) {
      return null;
    }

    return deadline;
  };

  const handleAdd = () => {
    if (task.trim() === "" || date.trim() === "" || time.trim() === "") {
      alert("Please enter task, date and time");
      return;
    }

    const deadline = getDeadline(date, time);

    if (!deadline) {
      alert("Use DD/MM/YYYY and HH:MM AM/PM format");
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
        return {
          ...todo,
          completed: !todo.completed
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const completed = todos.filter((todo) => todo.completed);
  const pending = todos.filter((todo) => !todo.completed);

  let filteredTodos = todos;

  if (activeTab === "Completed") {
    filteredTodos = completed;
  } else if (activeTab === "Pending") {
    filteredTodos = pending;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white p-5 sm:p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Todo App
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mb-6">

          <div className="flex flex-col gap-3">

            <input
              type="text"
              placeholder="Enter your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="HH:MM AM/PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />

            </div>
          </div>

          <div className="flex flex-col justify-center gap-2">

            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              {editIndex !== null ? "Update" : "Add Task"}
            </button>

            {editIndex !== null && (
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}

          </div>
        </div>

        <div className="flex gap-2 mb-6">

          <button
            onClick={() => setActiveTab("All")}
            className={`flex-1 p-3 rounded-lg font-semibold ${
              activeTab === "All"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-gray-700"
            }`}
          >
            All ({todos.length})
          </button>

          <button
            onClick={() => setActiveTab("Completed")}
            className={`flex-1 p-3 rounded-lg font-semibold ${
              activeTab === "Completed"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-gray-700"
            }`}
          >
            Completed ({completed.length})
          </button>

          <button
            onClick={() => setActiveTab("Pending")}
            className={`flex-1 p-3 rounded-lg font-semibold ${
              activeTab === "Pending"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-gray-700"
            }`}
          >
            Pending ({pending.length})
          </button>

        </div>

        <div className="space-y-3">

          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No tasks available
            </p>
          ) : (
            filteredTodos.map((todo) => {
              const index = todos.indexOf(todo);
              const deadline = getDeadline(todo.date, todo.time);

              const isOverdue =
                !todo.completed &&
                deadline !== null &&
                deadline < currentTime;

              return (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border ${
                    activeTab === "All" && isOverdue
                      ? "bg-red-100 border-red-500"
                      : "bg-white border-gray-200"
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheck(index)}
                    className="w-5 h-5"
                  />

                  <div className="flex-1 min-w-0">

                    <p
                      className={`font-semibold break-words ${
                        todo.completed
                          ? "text-green-600"
                          : activeTab === "All" && isOverdue
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.text}
                    </p>

                    {todo.completed && (
                      <p className="text-green-600 text-sm">
                        Completed
                      </p>
                    )}

                    {activeTab === "All" && isOverdue && (
                      <p className="text-red-600 text-sm font-semibold">
                        Overdue
                      </p>
                    )}

                  </div>

                  <div className="flex gap-3 text-sm text-gray-600">
                    <span>{todo.date}</span>
                    <span>{todo.time}</span>
                  </div>

                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg"
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
