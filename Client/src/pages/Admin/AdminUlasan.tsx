import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import VendorDashboard from "@/components/admin/AdminVendorDashboard";
import adminMenuList from "@/assets/Admin/adminDashboard";
import Sidebar from "@/components/admin/Sidebar";
import UlasanPenggunaDashboard from "@/components/admin/UlasanPenggunaDashboard";

const tempData = [
  {
    label: "Diterima",
    data: 10,
  },
  {
    label: "Ditolak",
    data: 5,
  },
  {
    label: "Ditinjau",
    data: 15,
  },
];

const AdminUlasan = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [ratingDesc, setRatingDesc] = useState<boolean>(true);
  return (
    <>
      <Sidebar props={adminMenuList} />

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        <div className=" bg-white justify-between flex max-md:hidden">
          <p className="pt-6 pb-8">
            Home &#62; <span className="font-bold">Ulasan</span>
          </p>{" "}
          <h1 className="font-bold pt-8">Admin</h1>
        </div>

        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">Ulasan Pengguna</h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0 max-md:mb-2">
            <div>
              <p className="font-bold text-xl max-md:text-sm">
                Total Ulasan{" "}
                <span className="text-gray ml-4 max-md:text-sm">2000</span>
              </p>
            </div>
            <div
              onClick={() => setRatingDesc(!ratingDesc)}
              className="flex cursor-pointer hover:opacity-80 items-center gap-2 border-1 border-gray rounded-md py-1 mt-2 px-4"
            >
              <p className="text-gray">Rating</p>
              <img
                className={`${ratingDesc ? "rotate-0" : "rotate-180"}`}
                src="/admin/arrowRating.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <UlasanPenggunaDashboard ratingDesc={ratingDesc} />

        <div className="justify-between flex my-2 max-md:justify-center">
          <p className="max-md:hidden">
            Menampilkan <span className="font-bold">1</span> dari{" "}
            <span className="font-bold">10</span> halaman
          </p>

          <div className="flex gap-4 ">
            <span className="text-xl ">&#60;</span>
            <p className="font-bold">1</p>
            <span className="text-xl font-bold">&#62;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUlasan;
