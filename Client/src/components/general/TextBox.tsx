type TextBoxProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  required?: boolean;
};

const TextBox = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: TextBoxProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-400 rounded-md text-[14px] focus:outline-none focus:border-primary"
      />
    </div>
  );
};

export default TextBox;
