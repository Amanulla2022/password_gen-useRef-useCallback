import React, { useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleButton = ({ toggleMode, isDarkMode }) => {
  const buttonRef = useRef(null);

  return (
    <button
      ref={buttonRef}
      className={`w-12 h-12 rounded-full flex items-center justify-center focus:outline-none ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
      onClick={toggleMode}
    >
      {isDarkMode ? <FaMoon className="text-white" /> : <FaSun />}
    </button>
  );
};

export default ToggleButton;
