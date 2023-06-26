"use client";
import { useReducer } from "react";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Home() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const handleAddItem = (text: string) => {
    console.log(`adding now... ${text}`);

    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  };
  return (
    <main
      className="dark:text-white h-screen text-black 
    dark:bg-dark-mobile md:dark:bg-dark-desktop 
    bg-light-mobile md:bg-light-desktop 
    bg-contain bg-no-repeat"
    >
      <div className="flex items-center justify-between p-6 max-w-4xl mx-auto">
        <h1 className="transition-colors duration-300 text-4xl mt-4 text-white">
          TODO
        </h1>
        <ThemeSwitcher />
      </div>
      <div className=" p-6 max-w-4xl mx-auto">
        <TodoItem onAddItem={handleAddItem} />
        <TodoList tasks={tasks}
       
        />
      </div>
    </main>
  );
}

function tasksReducer(tasks, action) {

  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }

}
let nextId = 3;
const initialTasks = [
  { id: 0, text: "first task", done: true },
  { id: 1, text: "second", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
