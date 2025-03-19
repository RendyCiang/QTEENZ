import React, { useState } from "react";
import VendorDashboardItem from "./AdminVendorDashboardItem";
import PenggunaDashboardItem from "./PenggunaDashboardItem";

const PenggunaDashboard = () => {
  return (
    <>
      <div className="max-md:border-1 rounded-lg items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
        {/* Table Header */}
        <div className="col-span-1 max-md:text-sm">
          <p className="text-gray text-center py-4">No.</p>
        </div>
        <div className="col-span-2 max-md:col-span-4 max-md:text-sm">
          <p className="text-gray py-4">Nama Pengguna</p>
        </div>
        <div className="col-span-1 max-md:col-span-2 max-md:text-center max-md:text-sm">
          <p className="text-gray py-4">Peran</p>
        </div>
        <div className="col-span-2 text-center max-md:hidden max-md:col-span-0">
          <p className="text-gray py-4">Email</p>
        </div>
        <div className="col-span-2 text-center max-md:hidden max-md:col-span-0">
          <p className="text-gray py-4">Nomor Telepon</p>
        </div>
        <div className="col-span-1 max-md:col-span-2">
          <p className="text-gray py-4 text-center">Aksi</p>
        </div>
        {/* Data */}
        {Array.from({ length: 20 }, (_, i) => (
          <PenggunaDashboardItem key={i} />
        ))}
      </div>
    </>
  );
};

export default PenggunaDashboard;
