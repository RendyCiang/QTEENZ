import React, { useEffect, useState } from "react";
import UlasanPenggunaItem from "@/components/admin/UlasanPenggunaItem";
import useFetchData from "@/hooks/useFetchData";
import { UlasanPenggunaData, UlasanPenggunaPayload } from "@/types/types";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { roleStore } from "@/store/roleStore";

const VendorUlasanDashboard = ({
  ratingDesc,
  setTotalUlasan,
}: {
  ratingDesc: boolean;
  setTotalUlasan: (total: number) => void;
}) => {
  const { id } = useParams<{ id: string }>();
  const { role } = roleStore();
  const { data, isLoading, error } = useFetchData<UlasanPenggunaPayload>(
    role === "Admin" ? "/reviews/get-review" : `/reviews/get-review/${id}`
  );

  const [filteredData, setFilteredData] = useState<UlasanPenggunaData[]>([]);

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);

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
        <p className="text-gray text-center py-4 max-md:py-2 max-md:text-[12px]">
          No.
        </p>
      </div>
      <div className="col-span-2 max-md:text-sm">
        <p className="text-gray py-4 max-md:py-2 max-md:text-[12px] text-nowrap">
          {role === "Admin" ? "Vendor" : "Nama"}
        </p>
      </div>
      <div className="col-span-5 ">
        <p className="text-gray py-4 max-md:py-2 max-md:text-[12px]">Ulasan</p>
      </div>

      <div className="col-span-1">
        <p className="text-gray text-center max-md:text-start py-4 max-md:py-2 max-md:text-[12px]">
          Rating
        </p>
      </div>
      {/* Data */}
      {/* {Array.from({ length: 20 }, (_, i) => (
        <UlasanPenggunaItem key={i} />
      ))} */}
      {filteredData?.length === 0 && !isLoading && (
        <div className="col-span-9 text-center py-4">
          <p className="text-gray">Tidak ada ulasan yang ditemukan.</p>
        </div>
      )}
      {filteredData?.map((item, index) => (
        <UlasanPenggunaItem
          key={index}
          item={item}
          index={index}
          isLoading={isLoading}
        />
      ))}

      {/* Loading State */}
    </div>
  );
};

export default VendorUlasanDashboard;
