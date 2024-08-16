import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo, toggleCompletion } from "../store/todosSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const searchText = useSelector((state) => state.todos.searchText);
  const filterStatus = useSelector((state) => state.todos.filterStatus);

  const filteredTodos = todos
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((todo) => {
      if (filterStatus === "completed") return todo.completed;
      if (filterStatus === "incomplete") return !todo.completed;
      return true;
    });

  const handleToggle = (id) => {
    dispatch(toggleCompletion(id));
  };

  const handleEdit = (id, text) => {
    dispatch(editTodo({ id, text }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="w-[270px] sm:w-[500px] md:w-[720px] mb-20 mx-auto mt-6">
      {filteredTodos.length === 0 ? (
        <>
          <div className=" flex justify-center items-center h-[300px]">
            <img
              src="/Detective-check-footprint 1.png"
              alt="No todos"
              className="img object-cover  h-full"
            />
          </div>
          <p className=" dark:text-white text-black text-center  font-semibold text-lg mt-4">
            EMPTY....
          </p>
        </>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
