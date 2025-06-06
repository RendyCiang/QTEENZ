import { cva, type VariantProps } from "class-variance-authority";
import { FormFields } from "@/pages/Auth/Login";
import {
  Control,
  Field,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type TextBoxProps<T extends FieldValues> = {
  label: string;
  value?: string;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "textarea";
  required?: boolean;
  errorMsg?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  disabledState?: boolean;
  className?: string;
};

const TextBox = <T extends FieldValues>({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  errorMsg = "",
  register,
  name,
  disabledState = false,
  className = "flex flex-col gap-2.5",
}: TextBoxProps<T>) => {
  return (
    <div className={className}>
      <label className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        disabled={disabledState}
        // value={value}
        // onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...register(name as Path<T>)}
        className="w-full p-3 border  rounded-md text-[14px] focus:outline-none focus:border-primary border-gray-400"
      />
      <p className="text-primary text-sm">{errorMsg ? errorMsg : " "}</p>
    </div>
  );
};

export default TextBox;
