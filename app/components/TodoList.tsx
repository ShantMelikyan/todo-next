"use client";
import React, { useState } from "react";
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
  const [filter, setFilter] = useState("All");
  const activeTasksCount = tasks.filter((task) => task.done === false).length;

  const handleClearCompleted = () => {
    const completedTasks = tasks.filter((task) => task.done === true);
    completedTasks.forEach((task) => onDeleteItem(task.id));
  };

  let filtetedTasks;

  switch (filter) {
    case "Active":
      filtetedTasks = tasks.filter((task) => task.done === false);
      break;
    case "Completed":
      filtetedTasks = tasks.filter((task) => task.done === true);
      break;
    default: // 'all' or any other value
      filtetedTasks = tasks;
  }

  return (
    <>
      <ul
        className="mt-4 
    bg-white drop-shadow-md 
    dark:bg-[#25273c] dark:text-[#cacde8]  
    rounded-md"
      >
        {filtetedTasks.map((task) => (
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
        ))}

        <li className="flex justify-between p-4 text-[#777a92] ">
          {tasks.length ? (
            <>
              <span>{`${activeTasksCount} items left`}</span>
              <button onClick={handleClearCompleted}>Clear Completed</button>
            </>
          ) : (
            <>
              <span>There`s no tasks!</span>
              <span>Add some and keep working.</span>
            </>
          )}
        </li>
      </ul>
      <div
        className="p-4 mt-4 drop-shadow-md 
        bg-white dark:bg-[#25273c] 
        dark:text-[#898eb6] text-[#636681] 
        rounded-md flex justify-center [&>*]:px-3"
      >
        <FilterButton
          currentFilter={filter}
          filterValue="All"
          onFilterChange={setFilter}
        />
        <FilterButton
          currentFilter={filter}
          filterValue="Active"
          onFilterChange={setFilter}
        />
        <FilterButton
          currentFilter={filter}
          filterValue="Completed"
          onFilterChange={setFilter}
        />
      </div>
    </>
  );
}

type FilterButtonProps = {
  currentFilter: string;
  filterValue: string;
  onFilterChange: (filter: string) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  currentFilter,
  filterValue,
  onFilterChange,
}) => {
  const isActive = currentFilter === filterValue;

  return (
    <button
      className={isActive ? "text-[#3a7bfd]" : ""}
      onClick={() => onFilterChange(filterValue)}
    >
      {filterValue}
    </button>
  );
};
