import React, { useEffect, useState } from "react";
import VendorDashboardItem from "./AdminVendorDashboardItem";
import PenggunaDashboardItem from "./PenggunaDashboardItem";
import useFetchData from "@/hooks/useFetchData";
import { GetAllUsersData, GetAllUsersPayload } from "@/types/types";
import toast from "react-hot-toast";

const PenggunaDashboard = ({
  filter,
  searchName,
}: {
  filter: string;
  searchName: string;
}) => {
  const { data, isLoading, error } =
    useFetchData<GetAllUsersPayload>("/users/get-user");

  const [filteredData, setFilteredData] = useState<GetAllUsersData["data"]>([]);

  useEffect(() => {
    if (data?.data) {
      let filtered = data.data;

      // // Filter by searchName if it exists
      // if (searchName) {
      //   filtered = filtered.filter((vendor) =>
      //     vendor.name.toLowerCase().includes(searchName.toLowerCase())
      //   );
      // }
      console.log(data.data);
      // Filter by role only if filter is not "Semua"
      if (filter && filter !== "Semua") {
        filtered = filtered.filter((vendor) => vendor.role === filter);
      }

      setFilteredData(filtered);
    }
  }, [data, searchName, filter]);

  if (error) {
    toast("Error fetching data. Please try again.");
  }
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
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <PenggunaDashboardItem
                key={index}
                isLoading={true}
                index={index}
              />
            ))
          : filteredData.map(
              (i: GetAllUsersData | undefined, index: number | undefined) => (
                <PenggunaDashboardItem
                  key={index}
                  isLoading={false}
                  data={i}
                  index={index}
                />
              )
            )}
      </div>
    </>
  );
};

export default PenggunaDashboard;
