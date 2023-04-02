import React from "react";

interface InputElementProps {
  htmlFor: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

const InputElement: React.FC<InputElementProps> = ({ htmlFor, label, type, placeholder, required }) => (
  <div className="mb-2">
    <label htmlFor={htmlFor} className="mb-2 block to-indigo-800 text-sm font-medium dark:text-gray-300">
      {label}
    </label>
    <input
      type={type}
      id={htmlFor}
      className="block w-full
                rounded-md
                border border-gray-300 bg-indigo-100 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default InputElement;
