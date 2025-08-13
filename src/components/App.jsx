import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import SearchBar from "./SearchBar";
import TaskItem from "./TaskItem";

// helper to safely read a task's display name
function getTaskName(task) {
  return task?.name ?? task?.title ?? "";
}

export default function App() {
  const { tasks, search, addTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  const searchText = (search ?? "").toLowerCase();
  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((t) =>
    getTaskName(t).toLowerCase().includes(searchText)
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    addTask(newTask.trim());
    setNewTask("");
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <SearchBar />

      <form onSubmit={handleSubmit}>
        <input
          name="task"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {filteredTasks.map((task, idx) => (
          <TaskItem
            key={task?.id ?? getTaskName(task) ?? `idx-${idx}`}
            task={task}
          />
        ))}
      </ul>
    </div>
  );
}
























