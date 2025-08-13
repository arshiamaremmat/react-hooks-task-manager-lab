import React from "react";
import { useTasks } from "../context/TaskContext";

function getTaskName(task) {
  return task?.name ?? task?.title ?? "";
}

export default function TaskItem({ task }) {
  const { toggleTaskCompletion } = useTasks();

  const name = getTaskName(task);
  const completed = Boolean(task?.completed);

  return (
    <li data-testid={String(task?.id)}>
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {name}
      </span>
      <button onClick={() => toggleTaskCompletion(task?.id)}>
        {completed ? "Undo" : "Complete"}
      </button>
    </li>
  );
}












