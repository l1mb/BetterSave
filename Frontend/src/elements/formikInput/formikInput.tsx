import { Field, ErrorMessage } from "formik";
import React from "react";

interface FormikInputProps {
  htmlFor: string;
  label: string;
  ariaLabel: string;
  ariaRequired: boolean;
  type: string;
  error?: string;
}

const FormikInput: React.FC<FormikInputProps> = (props) => (
  <div>
    <label
      htmlFor={props.htmlFor}
      className="text-sm font-medium text-blueberry-800"
    >
      {props.label}
      <Field
        name={props.htmlFor}
        aria-label={props.ariaLabel}
        aria-required={props.ariaRequired}
        type={props.type}
        placeholder={props.ariaLabel}
        className="border-gray-300 text-gray-900 
                focus:border-blue-500
                focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 mt-1 mb-[0.5] block w-full rounded-md border bg-blueberry-100 p-2.5 text-sm placeholder:font-light focus:outline-none"
      />
    </label>
    <div
      className={`h-5    text-sm text-red-600 transition duration-500 ${
        props.error ? "opacity-100" : "opacity-0"
      }`}
    >
      <ErrorMessage name={props.htmlFor} className="" />
    </div>
  </div>
);

export default FormikInput;
