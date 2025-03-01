
type RadioButtonProps = {
  className?: string;
  label: string;
  value: string;
  name: string;
  checked?: boolean;
  onChange?: (value: string) => void;
};
  

const RadioButton: React.FC<RadioButtonProps> = ({ className, label, value, name, checked, onChange }) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          className={className}
          value={value}
          checked={checked}
          onChange={() => onChange?.(value)}
        />
        <span className="text-gray-800">{label}</span>
      </label>
    );
  };

export default RadioButton;
