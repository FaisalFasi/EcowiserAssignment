import React from "react";

const Button = ({ type = "button", text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 rounded-md shadow-md border-2 border-gray-300 bg-white  font-semibold  focus:outline-none focus:border-2 focus:border-gray-400  "
    >
      {text}
    </button>
  );
};

export default Button;
