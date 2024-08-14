import React from "react";
import { IoMoonSharp } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import useTheme from "../contexts/theme";
import FloatingButton from "./FloatingButton";

const SwitchButton = () => {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer  pr-8">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />

      <div className="absolute left-[8px]   w-10 h-10 bg-[#6C63FF]  flex items-center justify-center rounded-lg">
        {themeMode === "dark" ? (
          <IoSunnyOutline className="text-white" />
        ) : (
          <IoMoonSharp className="text-white" />
        )}
      </div>
    </label>
  );
};

export default SwitchButton;
