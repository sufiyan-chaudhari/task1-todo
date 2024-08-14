import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/theme";
import Input from "./components/Input";
import FloatingButton from "./components/FloatingButton";
import TodoList from "./components/TodoList";

function App() {
  const [themeMode, setThemeMode] = useState("dark");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");

    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className=" h-screen  flex flex-col  items-center dark:bg-black bg-white  ">
        <h1 className="text-4xl font-extrabold dark:text-white text-black mt-10">
          TODO LIST
        </h1>

        <Input />
        <FloatingButton />

        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
