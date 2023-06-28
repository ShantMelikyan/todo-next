"use client";
import { useState } from "react";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

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
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);
  const activeTasksCount = currentTasks.filter((task) => !task.done).length;

  const handleClearCompleted = () => {
    if (currentTasks) {
      const completedTasks = currentTasks.filter((task) => task.done);
      completedTasks.forEach((task) => onDeleteItem(task.id));
    }
  };

  let filtetedTasks: Task[];

  switch (filter) {
    case "Active":
      filtetedTasks = currentTasks.filter((task) => !task.done);
      break;
    case "Completed":
      filtetedTasks = currentTasks.filter((task) => task.done);
      break;
    default:
      filtetedTasks = currentTasks;
  }

  const reorder = (list: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      currentTasks,
      result.source.index,
      result.destination.index
    );

    setCurrentTasks(items);
  };

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              className="mt-4 bg-white dark:bg-[#25273c] dark:text-[#cacde8] rounded-t-md"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filtetedTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
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
      
    <div className={`flex justify-between p-4 text-[#777a92] dark:bg-[#25273c] drop-shadow-md ` + (currentTasks.length ? "rounded-b-md" : "rounded-md")}>
        {currentTasks.length ? (
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
      <p className="text-[#636681] text-center m-6">Drag and drop to reoder list! </p>
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
