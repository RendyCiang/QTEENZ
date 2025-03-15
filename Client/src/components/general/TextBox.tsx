import { FormFields } from "@/pages/Login";
import { Control } from "react-hook-form";

type TextBoxProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  required?: boolean;
  errorMsg?: string;
};

const TextBox = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  errorMsg = "",
}: TextBoxProps) => {
  // const {register, _formState: {errors}} = control;
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-gray-800 font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3.5 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <p className="text-primary text-sm">
        {!value ? `Tolong masukkan ${label}` : ""}
      </p>
    </div>
  );
};

export default TextBox;
