import { cva, type VariantProps } from "class-variance-authority";
import { FormFields } from "@/pages/Login";
import { Control } from "react-hook-form";
import cn from "../../lib/util"

const textboxVariants = cva(
  "w-full border rounded-md text-[14px] focus:outline-none transition-colors",
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
        xl: "p-6 text-base",
        textarea: "p-4 h-32",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type TextBoxProps = {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "textarea"; 
  required?: boolean;
  errorMsg?: string;
  className?: string;
  rows?: number;
  multiline?: boolean;
} & VariantProps<typeof textboxVariants>;

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
  rows = 5,
  multiline = false,
}: TextBoxProps) => {
  const hasError = (required && !value) || errorMsg;
 
  return (
    <div className="flex flex-col gap-2.5">
      {label && (
        <label className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
          {label}
          {required && <span className="text-primary">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            textboxVariants({
              variant: hasError ? "error" : variant,
              size: size || "textarea",
              className
            }),
            "resize-none"
          )}
        />
      ) : (
        <input
          type={type === "textarea" ? "text" : type}
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
      )}
      {hasError && (
        <p className="text-primary text-sm">
          {errorMsg || (required && !value ? `Tolong masukkan ${label}` : "")}
        </p>
      )}
    </div>
  );
};

export default TextBox;