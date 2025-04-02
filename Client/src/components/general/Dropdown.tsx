import React from "react";

type DropdownProps = {
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  defaultValue?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue || ""}
      className="max-md:px-2 max-md:py-[6px] py-[12px] px-4 bg-white border-1 border-gray-200 rounded-lg"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
