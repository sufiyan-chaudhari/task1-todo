import React, { useState, useRef } from "react";
import { IoPencil, IoTrash } from "react-icons/io5";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleEditBlur = () => {
    if (editText.trim() && editText !== todo.text) {
      handleSave();
    } else {
      setIsEditing(false);
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="cursor-pointer bg-[#6C63FF] dark:bg-[#6C63FF] border-transparent dark:border-transparent w-6 h-6 accent-[#6C63FF]" // Increased size
        />
        {/* Editable text */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={handleEditChange}
            onBlur={handleEditBlur}
            onKeyDown={handleEditKeyDown}
            className="border p-2 rounded text-black dark:text-white bg-white dark:bg-gray-800 border-black dark:border-gray-600 text-xl" // Increased text size
          />
        ) : (
          <span
            className={`text-xl ${
              todo.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-black dark:text-white"
            }`}
            onClick={handleEditClick}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleEditClick}
          className="text-blue-500 dark:text-blue-400"
        >
          <IoPencil size={24} /> {/* Increased icon size */}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 dark:text-red-400"
        >
          <IoTrash size={24} /> {/* Increased icon size */}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
