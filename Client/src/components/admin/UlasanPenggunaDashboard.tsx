import React, { useState } from "react";
import UlasanPenggunaItem from "./UlasanPenggunaItem";

const UlasanPenggunaDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Semua");
  return (
    <div className="max-md:border-1 rounded-lg items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1 max-md:text-sm">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-2 max-md:text-sm">
        <p className="text-gray py-4">Vendor</p>
      </div>
      <div className="col-span-5 ">
        <p className="text-gray py-4 max-md:text-sm">Ulasan</p>
      </div>

      <div className="col-span-1">
        <p className="text-gray text-center max-md:text-start py-4 max-md:text-sm">
          Rating
        </p>
      </div>
      {/* Data */}
      {Array.from({ length: 20 }, (_, i) => (
        <UlasanPenggunaItem key={i} />
      ))}
    </div>
  );
};

export default UlasanPenggunaDashboard;
