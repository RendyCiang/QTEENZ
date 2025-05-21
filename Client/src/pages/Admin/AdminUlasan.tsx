import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import VendorDashboard from "@/components/admin/AdminVendorDashboard";
import adminMenuList from "@/assets/Admin/adminDashboard";
import Sidebar from "@/components/admin/Sidebar";
import UlasanPenggunaDashboard from "@/components/admin/UlasanPenggunaDashboard";
import { Link } from "react-router-dom";

const AdminUlasan = () => {
  const [ratingDesc, setRatingDesc] = useState<boolean>(true);
  const [totalUlasan, setTotalUlasan] = useState<number>(0);
  return (
    <>
      <Sidebar props={adminMenuList} />

      <div className=" pl-70 pr-10  ]bg-white justify-between flex max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>{" "}
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/admin/ulasan/`}> Ulasan </Link>
          </span>
        </div>
        <h1 className="font-bold pt-8">Admin</h1>
      </div>
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-3xl font-bold max-md:hidden">Ulasan Pengguna</h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0 max-md:mb-2">
            <div>
              <p className="font-bold text-xl max-md:text-sm">
                Total Ulasan{" "}
                <span className="text-gray ml-4 max-md:text-sm">
                  {totalUlasan}
                </span>
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
        <UlasanPenggunaDashboard
          ratingDesc={ratingDesc}
          setTotalUlasan={setTotalUlasan}
        />

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
