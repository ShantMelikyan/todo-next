"use client";
import { useReducer, useEffect, useState } from "react";
import CreateTodoItem from "./components/CreateTodoItem";
import TodoList from "./components/TodoList";
import ThemeSwitcher from "./ThemeSwitcher";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface Action {
  type: string;
  id: number;
  text: string;
}

let nextId = 3;
let predefinedTasks: Task[] = [
  { id: 0, text: "Add", done: true },
  { id: 1, text: "second", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  let savedTasks;
  if (typeof window !== "undefined") {
    savedTasks = localStorage.getItem("tasks");
  }
  
  const initialTasks = savedTasks ? JSON.parse(savedTasks) : predefinedTasks;
  const [tasks, dispatch] = useReducer<React.Reducer<Task[], Action>>(
    tasksReducer,
    initialTasks
  );
  nextId = tasks.length;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (!mounted) {
    return <></>;
  }
  const handleAddItem = (text: string) => {
    console.log(`adding now... ${text}`);
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  };
  const handleDeleteItem = (id: number) => {
    console.log(`deleting now... ${id}`);
    dispatch({
      type: "deleted",
      id: id,
      text: "",
    });
  };

  const handleCheckedItem = (id: number) => {
    console.log(`now done task id: ${id}`);
    dispatch({
      type: "checkToggle",
      id: id,
      text: "",
    });
  };

  return (
    <main
      className="dark:text-white h-screen text-black 
    dark:bg-dark-mobile md:dark:bg-dark-desktop 
    bg-light-mobile md:bg-light-desktop 
    bg-contain bg-no-repeat"
    >
      <div className="flex items-center justify-between px-6 max-w-4xl mx-auto pt-12">
        <h1 className="transition-colors duration-300 text-3xl tracking-[0.3em]	 font-bold text-white ">
          TODO
        </h1>
        <ThemeSwitcher />
      </div>
      <div className=" p-6 max-w-4xl mx-auto">
        <CreateTodoItem onAddItem={handleAddItem} />
        <TodoList
          tasks={tasks}
          onDeleteItem={handleDeleteItem}
          onCheckItem={handleCheckedItem}
        />
      </div>
    </main>
  );
}

function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "deleted": {
      return tasks.filter((task) => task.id !== action.id);
    }
    case "checkToggle": {
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task
      );
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
