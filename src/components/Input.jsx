import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setFilterStatus } from "../store/todosSlice";
import SwitchButton from "./switch_button";
import FloatingButton from "./FloatingButton";

const Input = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.todos.searchText);
  const selectedCategory = useSelector((state) => state.todos.filterStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Create a ref for the dropdown
  const dropdownRef = useRef(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Select a category from the dropdown
  const selectCategory = (category) => {
    dispatch(setFilterStatus(category));
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative top-[10%] w-[270px] sm:w-[500px] md:w-[720px] mb-20">
      <form className="flex items-center">
        <div className="relative w-full">
          <input
            type="search"
            value={searchText}
            onChange={handleSearchChange}
            className="block p-2.5 w-full text-sm text-gray-900 rounded-s-lg border border-[#6C63FF] focus:ring-transparent focus:border-[#6C63FF] dark:bg-transparent dark:border-[#6C63FF] dark:text-white dark:focus:border-[#6C63FF]"
            placeholder="Search"
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-gray-900 bg-transparent border border-transparent focus:ring-transparent focus:outline-none"
          >
            <svg
              className="w-4 h-4 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        <button
          id="dropdown-button"
          onClick={toggleDropdown}
          className="flex-shrink-0 z-10 ms-2 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-[#6C63FF] border border-[#6C63FF] rounded-lg focus:ring-transparent focus:outline-none"
          type="button"
        >
          {selectedCategory}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            id="dropdown"
            className="absolute z-10 bg-[#6C63FF] text-white divide-y divide-gray-100 rounded-lg shadow w-44 top-full mt-2"
            style={{ right: 0 }}
            ref={dropdownRef} // Attach the ref here
          >
            <ul
              className="py-2 text-sm text-white"
              aria-labelledby="dropdown-button"
            >
              <li className="hover:bg-[#3f3b82]">
                <button
                  onClick={() => selectCategory("all")}
                  className="block px-4 py-2 text-left "
                >
                  All
                </button>
              </li>
              <li className="hover:bg-[#3f3b82]">
                <button
                  onClick={() => selectCategory("completed")}
                  className="block px-4 py-2 text-left "
                >
                  Completed
                </button>
              </li>
              <li className="hover:bg-[#3f3b82]">
                <button
                  onClick={() => selectCategory("incomplete")}
                  className="block px-4 py-2 text-left "
                >
                  Incomplete
                </button>
              </li>
            </ul>
          </div>
        )}
        <SwitchButton />
      </form>
    </div>
  );
};

export default Input;
