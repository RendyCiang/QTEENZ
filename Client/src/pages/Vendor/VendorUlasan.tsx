import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UlasanPenggunaDashboard from "@/components/vendor/VendorUlasanDashboard";
import Sidebar from "@/components/admin/Sidebar";
import vendorMenuList from "@/assets/Admin/vendorDashboard";

const VendorUlasan = () => {
  const { id } = useParams();
  console.log(id);
  const [ratingDesc, setRatingDesc] = useState(true);
  const [totalUlasan, setTotalUlasan] = useState(0);

  return (
    <>
      <Sidebar props={vendorMenuList} />

      <div className="pl-70 pr-10 bg-white justify-between flex max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={`/vendor/dasbor/${id}`}>Beranda</Link>
          </p>
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/ulasan/${id}`}>Ulasan</Link>
          </span>
        </div>
        <h1 className="font-bold pt-8">Vendor</h1>
      </div>

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">Ulasan Pelanggan</h1>
          <div className="flex justify-between items-center mt-7 max-md:mt-0 max-md:mb-2">
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

        <div className="justify-end flex my-2 max-md:justify-center">
          <div className="flex gap-4">
            <span className="text-xl">&#60;</span>
            <p className="font-bold">1</p>
            <span className="text-xl font-bold">&#62;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorUlasan;
