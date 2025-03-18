import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import toast, { Toaster } from "react-hot-toast";
import { GetAllVendorPayload } from "@/types/types";
import AdminVendorDashboardItem from "./AdminVendorDashboardItem";

const AdminVendorDashboard = ({ filter }: { filter: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Semua");
  const [filteredData, setFilteredData] = useState<GetAllVendorPayload["data"]>(
    []
  );
  const { data, isLoading, error } = useFetchData<GetAllVendorPayload>(
    "/vendors/get-vendor"
  );
  // useEffect(() => {
  //   if (data?.data) {
  //     const filteredData = data?.data?.filter((i) => i.status === filter);
  //     setFilteredData(filteredData);
  //   }
  // }, [filter, data?.data]);

  if (error) {
    toast("Error fetching data. Please try again.");
  }
  return (
    <div className="max-md:border-1 max-md:border-gray-300 rounded-lg items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
      <Toaster />
      {/* Table Header */}
      <div className="col-span-1 max-md:text-sm">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-3 max-md:text-sm">
        <p className="text-gray py-4">Vendor</p>
      </div>
      <div className="col-span-1 max-md:hidden max-md:col-span-0">
        <p className="text-gray py-4">Rating</p>
      </div>
      <div className="col-span-2 max-md:col-span-4 max-md:text-center max-md:text-sm">
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
        <p className="text-gray text-center py-4 max-md:text-sm">Aksi</p>
      </div>
      {/* Data */}
      {!isLoading &&
        data?.data?.map((i, index) => {
          return (
            <AdminVendorDashboardItem
              key={index}
              isLoading={isLoading}
              data={i}
              index={index}
            />
          );
        })}
    </div>
  );
};

export default AdminVendorDashboard;
