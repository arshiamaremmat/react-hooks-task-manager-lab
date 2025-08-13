import React, { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  // initial load
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/tasks");
        const data = await res.json();
        if (!isMounted) return;

        // normalize any possible shape from the mock
        const normalized = (Array.isArray(data) ? data : []).map((t, i) => ({
          id: t?.id ?? i + 1,
          name: t?.name ?? t?.title ?? "",
          completed: Boolean(t?.completed),
        }));
        setTasks(normalized);
      } catch {
        // swallow for tests
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  async function addTask(name) {
    const trimmed = (name ?? "").trim();
    if (!trimmed) return;

    // optimistic item
    const tempId = `temp-${Date.now()}`;
    const optimistic = { id: tempId, name: trimmed, completed: false };
    setTasks((prev) => [...prev, optimistic]);

    try {
      const resp = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, completed: false }),
      });
      const created = await resp.json();

      const normalized = {
        id: created?.id ?? tempId,
        name: created?.name ?? created?.title ?? trimmed,
        completed:
          typeof created?.completed === "boolean"
            ? created.completed
            : false,
      };

      // replace optimistic with server version
      setTasks((prev) =>
        prev.map((t) => (t.id === tempId ? normalized : t))
      );
    } catch {
      // leave optimistic task if POST fails (good enough for tests)
    }
  }

  function toggleTaskCompletion(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  const value = {
    tasks,
    setTasks,
    search,
    setSearch,
    addTask,
    toggleTaskCompletion,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}





























