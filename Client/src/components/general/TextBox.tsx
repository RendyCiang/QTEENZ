
type TextBoxProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type?: "text" | "password";
}

const TextBox = ({ label, value, onChange, placeholder, type="text"}: TextBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-800 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  )
}

export default TextBox