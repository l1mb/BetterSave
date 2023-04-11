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
    <label htmlFor={props.htmlFor} className="text-sm font-medium text-indigo-800">
      {props.label}
      <Field
        name={props.htmlFor}
        aria-label={props.ariaLabel}
        aria-required={props.ariaRequired}
        type={props.type}
        placeholder={props.ariaLabel}
        className="mt-1 mb-[0.5]
                block
                w-full rounded-md border border-gray-300 bg-indigo-50 p-2.5 text-sm text-gray-900 transition-all
                placeholder:font-light

                focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
      />
    </label>
    <div className={`h-5    text-sm text-red-600 transition duration-500 ${props.error ? "opacity-100" : "opacity-0"}`}>
      <ErrorMessage name={props.htmlFor} className="" />
    </div>
  </div>
);

export default FormikInput;
