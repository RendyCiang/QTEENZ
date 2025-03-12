import React, { useState } from "react";
import UlasanPenggunaItem from "./UlasanPenggunaItem";

const UlasanPenggunaDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Semua");
  return (
    <div className="rounded-lg items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-2">
        <p className="text-gray py-4">Vendor</p>
      </div>
      <div className="col-span-5 max-md:hidden max-md:col-span-0">
        <p className="text-gray py-4">Rating</p>
      </div>

      <div className="col-span-1">
        <p className="text-gray text-center py-4">Rating</p>
      </div>
      {/* Data */}
      {Array.from({ length: 20 }, (_, i) => (
        <UlasanPenggunaItem key={i} />
      ))}
    </div>
  );
};

export default UlasanPenggunaDashboard;
