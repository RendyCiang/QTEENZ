import React, { useEffect, useState } from "react";
import UlasanPenggunaItem from "./UlasanPenggunaItem";
import useFetchData from "@/hooks/useFetchData";
import { UlasanPenggunaData, UlasanPenggunaPayload } from "@/types/types";
import toast from "react-hot-toast";
import { roleStore } from "@/store/roleStore";

const UlasanPenggunaDashboard = ({
  ratingDesc,
  setTotalUlasan,
}: {
  ratingDesc: boolean;
  setTotalUlasan: (total: number) => void;
}) => {
  const { role } = roleStore();
  const { data, isLoading, error } = useFetchData<UlasanPenggunaPayload>(
    `${role === "Admin" ? "/reviews/get-review" : "komaritemp"}`
  );

  const [filteredData, setFilteredData] = useState<UlasanPenggunaData[]>([]);

  useEffect(() => {
    if (data?.data) {
      let filtered = data.data;
      if (ratingDesc) {
        filtered = filtered.sort((a, b) => b.rating - a.rating);
      } else {
        filtered = filtered.sort((a, b) => a.rating - b.rating);
      }

      setFilteredData(filtered);
      setTotalUlasan(filtered.length);
    }
  }, [data, ratingDesc]);

  if (error) {
    toast.error("Error fetching data");
  }

  return (
    <div className="max-md:border-1 rounded-lg items-center max-h-[70vh] py-4 bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1 max-md:text-sm">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-2 max-md:text-sm">
        <p className="text-gray py-4">
          {role === "Admin" ? "Vendor" : "Nama Pelanggan"}
        </p>
      </div>
      <div className="col-span-5 ">
        <p className="text-gray py-4 max-md:text-sm">Ulasan</p>
      </div>

      <div className="col-span-1">
        <p className="text-gray text-center max-md:text-start py-4 max-md:text-sm">
          Rating
        </p>
      </div>

      {/* Loading Skeleton */}
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <UlasanPenggunaItem
              key={index}
              index={index}
              isLoading={true}
              item={{
                vendor: "",
                description: "",
                rating: 0,
                buyer: { buyerName: "", photo: "" },
              }}
            />
          ))
        : filteredData?.map((item, index) => (
            <UlasanPenggunaItem
              key={index}
              item={item}
              index={index}
              // data = {i}
              isLoading={false}
            />
          ))}

      {/* Loading State */}
    </div>
  );
};

export default UlasanPenggunaDashboard;
