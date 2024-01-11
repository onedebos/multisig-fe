import { FunctionComponent } from "react";

type FormInputProp = {
  label: string;
  type: string;
  placeholder: string;
  name: string;
};

const FormInput: FunctionComponent<FormInputProp> = ({ label, type, placeholder, name }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 font-medium mb-2">{label}</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
