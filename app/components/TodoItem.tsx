"use client";
import React, { useState } from "react";

interface TodoItemProps {
  onAddItem: (item: string) => void;
}

export default function TodoItem({
  onAddItem,
}: TodoItemProps): React.JSX.Element {
  const [text, setText] = useState("");

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter was pressed!");
      onAddItem(text);
      setText('');
    }
  };
  return (
    <input
      className="outline-none p-4 w-full dark:bg-[#25273c] rounded-md"
      placeholder="Create a new todo..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
}
