// App.jsx
import React, { useState, useRef, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "./Modal"; // Adjust path if necessary
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todosSlice"; // Adjust path if necessary

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setTodoInput(""); // Clear input on close
  };

  const handleApplyClick = () => {
    if (todoInput.trim()) {
      dispatch(
        addTodo({
          text: todoInput.trim(),
          completed: false,
        })
      );
      setTodoInput("");
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus(); // Focus input when modal opens
    }
  }, [isModalOpen]);

  return (
    <div className="relative">
      <FloatingButton onClick={openModal} />
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            NEW NOTE
          </h2>
          <input
            ref={inputRef}
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="Input your note..."
            className="w-full p-2 border rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          />
          <div className="flex justify-between mt-4 gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-full bg-white text-black dark:text-white border border-[#6C63FF] rounded-md p-2 shadow-sm hover:bg-[#6C63FF] hover:text-white dark:bg-gray-800  dark:border-[#6C63FF] dark:hover:bg-[#6C63FF]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyClick}
              className="w-full bg-[#6C63FF] text-white rounded-md p-2 shadow-sm hover:bg-blue-700 dark:bg-[#6C63FF] dark:hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 md:bottom-20 right-4 md:right-5 lg:right-[10%] xl:right-[22%] bg-[#6C63FF] text-white rounded-full p-4 shadow-lg hover:bg-[#6C63FF] focus:outline-none"
    >
      <IoAdd size={24} />
    </button>
  );
};

export default App;
