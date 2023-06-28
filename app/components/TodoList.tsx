"use client";
import React, { useState } from "react";
import Task from "./Task";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onDeleteItem: (id: number) => void;
  onCheckItem: (id: number) => void;
  onReorderItems: (source: number, destination: number) => void;
}

export default function TodoList({
  tasks,
  onDeleteItem,
  onCheckItem,
  onReorderItems,
}: TodoListProps) {
  const [filter, setFilter] = useState("All");
  const activeTasksCount = tasks.filter((task) => task.done === false).length;
  let filtetedTasks: Task[];

  const handleClearCompleted = () => {
    const completedTasks = tasks.filter((task) => task.done === true);
    completedTasks.forEach((task) => onDeleteItem(task.id));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    onReorderItems(result.source.index, result.destination.index);
  };
  
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
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                className="mt-4 bg-white dark:bg-[#25273c] dark:text-[#cacde8] rounded-t-md"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filtetedTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={String(task.id)}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          task={task}
                          onDeleteItem={onDeleteItem}
                          onCheckItem={onCheckItem}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div
        className={
          `flex justify-between p-4 text-[#777a92] dark:bg-[#25273c] bg-white drop-shadow-md ` +
          (tasks.length ? "rounded-b-md" : "rounded-md")
        }
      >
        {tasks.length ? (
          <>
            <span>{`${activeTasksCount} items left`}</span>
            <button onClick={handleClearCompleted}>Clear Completed</button>
          </>
        ) : (
          <>
            <span>There`s no tasks!</span>
            <span>Add some.</span>
          </>
        )}
      </div>
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
      <p className="text-[#636681] text-center m-6">
        Drag and drop to reorder tasks.
      </p>
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
