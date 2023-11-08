import React from "react";

const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  maxLength,
  onClick,
}) => {
  return (
    <div className="input-field">
      <input
        type={type}
        name={name}
        variant="standard"
        value={value}
        onClick={onClick ? onClick : null}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength && maxLength}
        className={`w-full p-2 rounded-md shadow-md border-2 border-gray-300   placeholder:text-gray-400 placeholder:font-bold focus:outline-none focus:border-2 focus:border-gray-400  ${
          name === "title" ? " font-bold" : "  font-normal"
        }`}
      />
    </div>
  );
};

export default InputField;
