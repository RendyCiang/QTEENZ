import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import toast, { Toaster } from "react-hot-toast";
import { GetAllVendorPayload } from "@/types/types";
import AdminVendorDashboardItem from "./AdminVendorDashboardItem";
import { Icon } from "@iconify/react/dist/iconify.js";

const AdminVendorDashboard = ({
  filter,
  searchName,
  sendUserCountDataToParent,
}: {
  filter: string;
  searchName: string;
  sendUserCountDataToParent: (data: number) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Semua");
  const [filteredData, setFilteredData] = useState<GetAllVendorPayload["data"]>(
    []
  );

  const { data, isLoading, error } = useFetchData<GetAllVendorPayload>(
    "/vendors/get-vendor"
  );

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);

      if (searchName) {
        const filtered = data.data.filter((vendor) =>
          vendor.name.toLowerCase().includes(searchName.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data.data);
      }
    }
  }, [data, searchName]);

  useEffect(() => {
    sendUserCountDataToParent(filteredData.length);
  }, [filteredData]);

  if (error) {
    toast("Error fetching data. Please try again.");
  }

  return (
    <>
      <div className="max-md:border-1 max-md:border-gray-300 rounded-lg py-4 items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
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
        <div className="col-span-2 max-md:col-span-2  max-md:text-sm">
          <p className="text-gray py-4">Jam Operasional</p>
        </div>
        <div
          className="col-span-1 max-md:col-span-2 flex items-center gap-2 justify-around cursor-pointer hover:opacity-80 "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <p className="text-gray py-4 max-md:text-sm">Status</p>
          <Icon
            icon="weui:arrow-outlined"
            className={`text-lg cursor-pointer rotate-90 text-center transition-transform duration-300`}
          />

          <div className="absolute "></div>
        </div>
        <div className="col-span-1">
          <p className="text-gray text-center py-4 max-md:text-sm">Aksi</p>
        </div>

        {/* Data */}
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <AdminVendorDashboardItem
                key={index}
                isLoading={true}
                index={index}
              />
            ))
          : filteredData.map((i, index) => (
              <AdminVendorDashboardItem
                key={index}
                isLoading={false}
                data={i}
                index={index}
              />
            ))}
      </div>
    </>
  );
};

export default AdminVendorDashboard;
