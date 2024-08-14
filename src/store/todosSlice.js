import { createSlice } from "@reduxjs/toolkit";

// Function to generate a unique ID
const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  searchText: "",
  filterStatus: "All",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = { ...action.payload, id: generateId() }; // Add unique ID
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleCompletion: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const {
  addTodo,
  editTodo,
  deleteTodo,
  toggleCompletion,
  setSearchText,
  setFilterStatus,
} = todosSlice.actions;

export default todosSlice.reducer;
