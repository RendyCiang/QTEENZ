import { useState } from "react";
import PermintaanVendorItem from "./PermintaanVendorItem";

const PermintaanVendor = () => {
  return (
    <div className="col-span-3 rounded-lg shadow-md items-center max-h-[27vh] py-4 bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-3">
        <p className="text-gray py-4">Nama Vendor</p>
      </div>
      <div className="col-span-2">
        <p className="text-gray py-4">Tenggat</p>
      </div>
      <div className="col-span-3 text-center">
        <p className="text-gray py-4">Status Persetujuan</p>
      </div>

      {/* Data */}
      {Array.from({ length: 20 }, (_, i) => (
        <PermintaanVendorItem key={i} />
      ))}
    </div>
  );
};

export default PermintaanVendor;
