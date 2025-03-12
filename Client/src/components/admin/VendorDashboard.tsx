import React, { useState } from "react";
import VendorDashboardItem from "./VendorDashboardItem";

const VendorDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Semua");
  return (
    <div className="rounded-lg items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-3">
        <p className="text-gray py-4">Vendor</p>
      </div>
      <div className="col-span-1 max-md:hidden max-md:col-span-0">
        <p className="text-gray py-4">Rating</p>
      </div>
      <div className="col-span-2 max-md:col-span-4 max-md:text-end">
        <p className="text-gray py-4">Jam Operasional</p>
      </div>
      <div
        className="col-span-1 flex items-center gap-2 justify-around cursor-pointer max-md:hidden"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <p className="text-gray py-4">Status</p>
        <p className="text-gray py-4 text-xl rotate-90 font-bold">&#62;</p>

        <div className="absolute "></div>
      </div>
      <div className="col-span-1">
        <p className="text-gray text-center py-4">Aksi</p>
      </div>
      {/* Data */}
      {Array.from({ length: 20 }, (_, i) => (
        <VendorDashboardItem key={i} />
      ))}
    </div>
  );
};

export default VendorDashboard;
