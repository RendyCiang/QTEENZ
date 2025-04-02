import { cva, type VariantProps } from "class-variance-authority";
import { FormFields } from "@/pages/Login";
import { Control } from "react-hook-form";
import cn from "../../lib/util"

// Define the variants for the Textbox using CVA
const textboxVariants = cva(
  // Base styles applied to all textboxes
  "w-full p-3 border rounded-md text-[14px] focus:outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "border-gray-400 focus:border-primary",
        error: "border-primary bg-red-50",
      },
      size: {
        default: "p-3",
        sm: "p-2 text-xs",
        lg: "p-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type TextBoxProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  required?: boolean;
  errorMsg?: string;
  className?: string;
} & VariantProps<typeof textboxVariants>; // Add variant props from CVA

const TextBox = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  errorMsg = "",
  className,
  variant,
  size,
}: TextBoxProps) => {
  // Determine if we should show an error state
  const hasError = (required && !value) || errorMsg;
  
  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
          {label}
          {required && <span className="text-primary">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          textboxVariants({ 
            variant: hasError ? "error" : variant, 
            size, 
            className 
          })
        )}
      />
      {hasError && (
        <p className="text-primary text-sm">
          {errorMsg || (required && !value ? `Tolong masukkan ${label}` : "")}
        </p>
      )}
    </div>
  );
};

export default TextBox;