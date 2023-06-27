"use client";
import React from "react";
import Cross from "../../public/images/icon-cross.svg";
import Check from "../../public/images/icon-check.svg";
import Image from "next/image";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onDeleteItem: (id: number) => void;
  onCheckItem: (id: number) => void;
}

export default function TodoList({
  tasks,
  onDeleteItem,
  onCheckItem,
}: TodoListProps) {
  return (
    <ul
      className="mt-4 
    bg-white drop-shadow-md 
    dark:bg-[#25273c] dark:text-[#cacde8]  
    rounded-md"
    >
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border-b dark:border-[#393a4c] p-4 hover:dark:text-[#e4e5f1]"
        >
          <div className="flex justify-between break-all">
            <div className="flex items-center">
              <button
                onClick={() => onCheckItem(task.id)}
                className={
                  `flex place-items-center shrink-0 h-6 w-6 mr-4 rounded-full ` +
                  (task.done
                    ? "bg-gradient-to-tl to-[#57ddff] from-[#c058f3]"
                    : "border border-[#393a4c] [&>*]:hidden")
                }
              >
                <Image className="mx-auto " src={Check} alt="check icon" />
              </button>
              <div className={task.done ? `line-through dark:text-[#54577a] text-[#b3b5ce]` : `text-[#333552]`}>
                {task.text}
              </div>
            </div>
            <button
              className="shrink-0 ml-4"
              aria-label="Delete task"
              onClick={() => onDeleteItem(task.id)}
            >
              <Image src={Cross} alt="cross icon" />
            </button>
          </div>
        </li>
      ))}
      <li className="flex justify-between p-4 text-[#777a92]">
        {tasks.length ? (
          <>
            <span>{`${tasks.length} items left`}</span>
            <button>Clear Completed</button>
          </>
        ) : (
          <>
            <span>There`s no tasks!</span>
            <span>Add some and keep working.</span>
          </>
        )}
      </li>
    </ul>
  );
}
