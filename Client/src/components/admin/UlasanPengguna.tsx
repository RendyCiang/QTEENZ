import useFetchData from "@/hooks/useFetchData";
import { UlasanPenggunaData, UlasanPenggunaPayload } from "@/types/types";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
const UlasanPengguna = () => {
  const { data, isLoading, error } = useFetchData<UlasanPenggunaPayload>(
    "/reviews/get-review"
  );

  const [filteredData, setFilteredData] = useState<UlasanPenggunaData[]>([]);

  useEffect(() => {
    if (data?.data) {
      setFilteredData(data.data);
    }
  }, [data]);

  if (error) {
    toast.error("Error fetching ulasan pengguna:");
  }

  if (isLoading) {
    return (
      <>
        <div className="max-md:mt-5 md:hidden flex justify-between items-center">
          <Toaster />
          <p className="font-bold  text-xl">Ulasan Pengguna</p>
          <Link to={"/admin/ulasan"}>
            <p className="text-gray-400 underline">Semua</p>
          </Link>
        </div>
        {/* Ulasan Pengguna */}
        <div className="col-span-3 p-4 bg-white rounded-xl shadow-md mt-4 max-md:mt-0 w-full">
          <div className="justify-between flex items-center my-4 max-md:hidden">
            <div className="flex items-center gap-2 ">
              <img src="/admin/ulasanPengguna.svg" alt="" />
              <p>Ulasan Pengguna</p>
            </div>
            <Link to={"/"}>
              <p className="text-gray underline">Lihat Semua</p>
            </Link>
          </div>

          {/* Feedbacks */}
          <div className="overflow-y-scroll max-h-[35vh]">
            {Array.from({ length: 10 }).map((_, idx) => {
              return (
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton width={60} height={60} circle />

                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <Skeleton width={100} height={20} />
                      <img
                        className="cover rounded-full "
                        src="/admin/bintangRating.svg"
                        alt=""
                      />
                      <p className="text-gray opacity-[90] flex">
                        {" "}
                        <Skeleton width={20} height={10} />
                        /5.0
                      </p>
                    </div>

                    <div className="overflow-hidden max-w-full">
                      <p>
                        <Skeleton width={300} height={20} />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-md:mt-5 md:hidden flex justify-between items-center">
        <Toaster />
        <p className="font-bold  text-xl">Ulasan Pengguna</p>
        <Link to={"/admin/ulasan"}>
          <p className="text-gray-400 underline">Semua</p>
        </Link>
      </div>
      {/* Ulasan Pengguna */}
      <div className="col-span-3 p-4 bg-white rounded-xl shadow-md mt-4 max-md:mt-0 w-full">
        <div className="justify-between flex items-center my-4 max-md:hidden">
          <div className="flex items-center gap-2 ">
            <img src="/admin/ulasanPengguna.svg" alt="" />
            <p>Ulasan Pengguna</p>
          </div>
          <Link to={"/admin/ulasan"}>
            <p className="text-gray underline">Lihat Semua</p>
          </Link>
        </div>

        {/* Feedbacks */}
        <div className="overflow-y-scroll max-h-[35vh]">
          {filteredData.slice(0, 8).map((i, idx) => {
            return (
              <div key={idx} className="flex items-center gap-3 mb-3">
                <img
                  src="/admin/bakmieTemp.png"
                  className="w-[50px] cover rounded-full h-[50px]"
                  alt=""
                />

                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <p className="font-bold">{i.vendor}</p>
                    <img
                      className="cover rounded-full "
                      src="/admin/bintangRating.svg"
                      alt=""
                    />
                    <p className="text-gray opacity-[90]">{i.rating}/5.0</p>
                  </div>

                  <div className="overflow-hidden max-w-full">
                    <p>{i.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UlasanPengguna;
