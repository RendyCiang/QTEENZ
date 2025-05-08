import { ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";

function SearchFilterComponent() {
  const [searchTerm, setSearchTerm] = useState("");

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

      {/* Dropdown */}
      <div className="border-1 px-4 rounded-md border-primary-3rd bg-white flex h-fit py-2 items-center justify-center">
        <p className="max-md:text-[14px]">Semua</p>
        <ChevronDown />
      </div>

      {/* Filter
      <div>
        <img src="../icon/filter.png" alt="" />
      </div> */}
    </div>
  );
}

export default SearchFilterComponent;
