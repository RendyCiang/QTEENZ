import { useState } from "react"

type CheckBoxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}


const CheckBox = ({ label, checked=false, onChange }: CheckBoxProps) => {

  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="w-4 h-4 accent-violet-600 cursor-pointer"
      />
      <span className="text-gray-800 text-xs">{label}</span>
    </label>
  )
};

export default CheckBox;