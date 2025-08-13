import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, toggleTaskCompletion }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
    </ul>
  );
}























