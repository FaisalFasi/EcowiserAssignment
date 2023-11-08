import React from "react";

const TextArea = ({ currentValue, onChangeValue }) => {
  return (
    <div className="input-field">
      <textarea
        type="text"
        placeholder="Type your note..."
        value={currentValue}
        onChange={onChangeValue}
        className="max-h-[calc(100vh-300px)]  min-h-[100px] block w-full p-2 rounded-md shadow-md border border-gray-300   placeholder:text-gray-400 placeholder:font-bold focus:outline-none focus:border-2 focus:border-gray-400  "
      ></textarea>
    </div>
  );
};

export default TextArea;
