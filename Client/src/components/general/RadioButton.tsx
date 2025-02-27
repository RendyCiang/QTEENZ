
type RadioButtonProps = {
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  onChange?: (value: string) => void;
};
  

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, name, checked, onChange }) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange?.(value)}
          className="w-4 h-4 accent-violet-600 cursor-pointer"
        />
        <span className="text-gray-800">{label}</span>
      </label>
    );
  };

export default RadioButton;
