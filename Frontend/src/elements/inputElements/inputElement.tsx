import React from "react";

interface InputElementProps {
  htmlFor: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

const InputElement: React.FC<InputElementProps> = ({
  htmlFor,
  label,
  type,
  placeholder,
  required,
}) => (
  <div className="mb-4">
    <label
      htmlFor={htmlFor}
      className="dark:text-gray-300 mb-2 block to-blueberry-800 text-sm font-medium"
    >
      {label}
    </label>
    <input
      type={type}
      id={htmlFor}
      className="border-gray-300 text-gray-900 
                focus:border-blue-500
                focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 block w-full rounded-md border bg-blueberry-200 p-2.5 text-sm focus:outline-none"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default InputElement;
