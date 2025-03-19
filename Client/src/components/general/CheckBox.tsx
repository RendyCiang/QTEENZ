import { useState, useEffect } from "react";

type CheckBoxProps = {
  label: string;
  checked?: boolean;
  onChangeFunc?: (checked: boolean) => void;
};

const CheckBox = ({ label, checked = false, onChangeFunc }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Ensure `isChecked` updates when the parent changes `checked`
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChangeFunc) onChangeFunc(newChecked); // Notify parent
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="w-4 h-4 accent-primary cursor-pointer"
      />
      <span className="text-gray-800 text-base">{label}</span>
    </label>
  );
};

export default CheckBox;
