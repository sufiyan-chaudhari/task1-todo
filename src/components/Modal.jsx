import React from "react";

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-opacity-80"
      onClick={onRequestClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md sm:max-w-sm md:max-w-lg p-6"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
