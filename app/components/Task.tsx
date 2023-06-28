"use client"

import React from "react";
import Image from "next/image";
import Check from "../../public/images/icon-check.svg";
import Cross from "../../public/images/icon-cross.svg";

interface TaskProps {
  task: {
    id: number;
    text: string;
    done: boolean;
  };
  onDeleteItem: (id: number) => void;
  onCheckItem: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDeleteItem, onCheckItem }) => {
  return (
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
          <div
            className={
              task.done
                ? `line-through dark:text-[#54577a] text-[#b3b5ce]`
                : `text-[#333552] dark:text-[#b3b5ce]`
            }
          >
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
  );
};

export default Task;
