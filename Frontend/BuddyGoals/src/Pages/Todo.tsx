import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import { TodoDetail } from "./Todo/TodoDetail";
import { useState } from "react";
import { Plus } from "lucide-react";
import Edit from "../Components/Edit";

export default function Todo() {
  const todos = [
    { Id: 1, Title: "Title 1", EndDate: "2025-10-29", Priority: 1 },
    { Id: 2, Title: "Title 2", EndDate: "2025-10-29", Priority: 2 },
    { Id: 3, Title: "Title 3", EndDate: "2025-10-29", Priority: 3 },
    { Id: 4, Title: "Title 4", EndDate: "2025-10-29", Priority: 1 },
    { Id: 5, Title: "Title 5", EndDate: "2025-10-29", Priority: 2 },
    { Id: 6, Title: "Title 6", EndDate: "2025-10-29", Priority: 3 },
  ];
  const priority = [1, 2, 3];

  const [selectedPriority, setSelectedPriority] = useState("");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [isOpen, setOpen] = useState(false);

  function handleFilterClick() {
    if (selectedPriority === "") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter(
        (item) => item.Priority === parseInt(selectedPriority)
      );
      setFilteredTodos(filtered);
    }
  }

  function handleClearClick() {
    setSelectedPriority("");
    setFilteredTodos(todos);
  }

  return (
    <div id="TodoPage" className="flex w-full h-full">
      <div className="w-3/5">
        <div className="h-full mx-5 p-5 bg-green-200 rounded-xl" id="todoList">
          <section
            id="todo-filter"
            className="relative w-full h-1/4 p-2 rounded-lg"
          >
            <h1 className="text-xl text-center">Filters</h1>
            <label htmlFor="mySelect">Select an item:</label>
            <select
              id="mySelect"
              name="mySelection"
              className="bg-white rounded-sm ml-3"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="">-- Select --</option>
              {priority.map((p) => (
                <option key={p} value={p}>
                  Priority {p}
                </option>
              ))}
            </select>
            <button
              className="absolute bottom-2 right-20 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleFilterClick}
            >
              Filter
            </button>
            <button
              disabled={!selectedPriority}
              className={`absolute bottom-2 right-2 px-4 py-2 rounded ${
                selectedPriority
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={handleClearClick}
            >
              Clear
            </button>
          </section>
          <section id="todo-list" className="w-full h-3/4 rounded-lg p-2">
            <div className="relative h-1/5">
              <h1 className="text-2xl text-center mb-3 font-serif">
                ToDo List
              </h1>
              <button
                className="absolute top-2 right-2 flex items-center text-green-50 font-medium shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600
          hover:text-green-950"
              onClick={() => setOpen(true)}
              >
                <Plus size={18} />
                <span>Add Todo</span>
              </button>
            </div>
            <Edit open={isOpen} onOpenChange={setOpen} />
            <menu className="h-4/5 flex flex-col overflow-y-auto">
              {filteredTodos.map((item) => (
                <NavLink
                  to={`/todo/${item.Id}`}
                  key={item.Id}
                  className="bg-white rounded-lg shadow p-4 my-2 w-2/3"
                >
                  {item.Title}
                </NavLink>
              ))}
            </menu>
          </section>
        </div>
      </div>
      <div className="w-2/5">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
