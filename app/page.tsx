"use client";
import { useReducer, useEffect, useState } from "react";
import CreateTodoItem from "./components/CreateTodoItem";
import TodoList from "./components/TodoList";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface ReorderPayload {
  source: number;
  destination: number;
}

interface Action {
  type: string;
  id?: number;
  text?: string;
  payload?: ReorderPayload;
}

let predefinedTasks: Task[] = [
  { id: 0, text: "Add", done: true },
  { id: 1, text: "second", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  let savedData;
  if (typeof window !== "undefined") {
    savedData = JSON.parse(localStorage.getItem("todoData") || "{}");
  }

  const initialTasks = savedData?.tasks || predefinedTasks;
  const initialNextId = savedData?.nextId || predefinedTasks.length;
  const [{ tasks, nextId }, dispatch] = useReducer<
    React.Reducer<{ tasks: Task[]; nextId: number }, Action>
  >(tasksReducer, { tasks: initialTasks, nextId: initialNextId });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify({ tasks, nextId }));
  }, [tasks, nextId]);

  if (!mounted) {
    return null;
  }

  const handleAddItem = (text: string) => {
    dispatch({
      type: "added",
      text: text,
    });
  };

  const handleDeleteItem = (id: number) => {
    dispatch({
      type: "deleted",
      id: id,
    });
  };

  const handleCheckedItem = (id: number) => {
    dispatch({
      type: "checkToggle",
      id: id,
    });
  };

  const handleReorderItem = (sourceIndex: number, destinationIndex: number) => {
    dispatch({
      type: "reordered",
      payload: { source: sourceIndex, destination: destinationIndex },
    });
  };

  return (
    <div className=" p-6 max-w-4xl mx-auto">
      <CreateTodoItem onAddItem={handleAddItem} />
      <TodoList
        tasks={tasks}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckedItem}
        onReorderItems={handleReorderItem}
      />
    </div>
  );
}

function tasksReducer(
  state: { tasks: Task[]; nextId: number },
  action: Action
): { tasks: Task[]; nextId: number } {
  switch (action.type) {
    case "added": {
      const id = state.nextId;
      const text = action.text as string;
      return {
        tasks: [{ id: id, text: text, done: false }, ...state.tasks],
        nextId: id + 1,
      };
    }
    case "deleted": {
      const updatedTasks = state.tasks.filter((task) => task.id !== action.id);
      const updatedNextId = updatedTasks.length ? state.nextId : 0;
      return {
        tasks: updatedTasks,
        nextId: updatedNextId,
      };
    }
    case "checkToggle": {
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, done: !task.done } : task
        ),
        nextId: state.nextId,
      };
    }
    case "reordered": {
      const { source, destination } = action.payload as {
        source: number;
        destination: number;
      };
      const newTasks = Array.from(state.tasks);
      const [removed] = newTasks.splice(source, 1);
      newTasks.splice(destination, 0, removed);
      return {
        tasks: newTasks,
        nextId: state.nextId,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
