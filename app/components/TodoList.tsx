"use client";
import React from 'react'

interface Task {
  id: number;
  text: string;
  done: boolean
}

interface TodoListProps {
  tasks: Task[];
}

export default function TodoList({tasks}: TodoListProps) {
  return (
    <ul className='mt-4 bg-white drop-shadow-md dark:bg-[#25273c] dark:text-[#cacde8]  rounded-md'>
      {tasks.map(task => (
        <li key={task.id} className='border-b dark:border-[#393a4c] p-4 hover:dark:text-[#e4e5f1]'>
          {task.text}
        </li>
      ))}
      <li>
        <div className='flex justify-between p-4 dark:text-[#4d5066]'>
            <span>{`${tasks.length} items left`}</span>
           <button>Clear Completed</button>
        </div>
      </li>
    </ul>
  )
}