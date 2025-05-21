import { ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
};

function SearchFilterComponent({
  searchTerm,
  setSearchTerm,
  setSortOption,
  sortOption,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const options = [
    { label: "Semua", value: "all" },
    { label: "Harga Terendah", value: "lowest" },
    { label: "Harga Tertinggi", value: "highest" },
  ];

  const handleSelectOption = (value: string) => {
    setSortOption(value);
    setIsDropdownOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === sortOption)?.label || "Semua";

  return (
    <div className="flex flex-row gap-2 items-center">
      {/* Search */}
      <div className="flex items-center gap-2 w-full h-fit py-2 border-1 pl-4 rounded-md border-primary-3rd bg-white">
        <Search className="w-[16px] text-gray" />
        <input
          type="text"
          className="text-[14px] text-black outline-none w-full"
          placeholder="Cari sesuatu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dropdown Header */}
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="border-1 px-4 rounded-md border-primary-3rd bg-white flex h-fit py-2 items-center justify-center cursor-pointer select-none relative gap-2"
      >
        <p className="max-md:text-[14px] text-nowrap w-30">{selectedLabel}</p>
        <ChevronDown />

        {/* Dropdown List */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-primary-3rd rounded-md shadow-md z-10">
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  opt.value === sortOption ? "font-semibold bg-gray-200 text-nowrap" : "text-nowrap"
                }`}
                onClick={() => handleSelectOption(opt.value)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFilterComponent;
