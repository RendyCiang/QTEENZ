import vendorMenuList from "@/assets/Admin/vendorDashboard";
import AdminVendorDashboard from "@/components/admin/AdminVendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  return (
    <>
      <Sidebar props={vendorMenuList} />

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        <div className=" bg-white justify-between flex max-md:hidden items-center">
          <p className="pt-6 pb-8">
            Home &#62; <span className="font-bold">Dasbor</span>
          </p>{" "}
          <div className="flex items-center gap-4 justify-center">
            <Link to="/customer/notification">
              <div className="relative cursor-pointer group">
                <Icon
                  icon="ion:notifcations"
                  className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] pt-3 text-black group-hover:text-primary transition-colors duration-200"
                />
                <p className="p-[2px] absolute flex right-0 top-0 text-xs w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-primary text-white text-center justify-center items-center transition-colors duration-200">
                  20
                </p>
              </div>
            </Link>
            <h1 className="font-bold pt-8">Vendor</h1>
          </div>
        </div>

        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">Manajemen Vendor</h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0">
            <div>
              <p className="font-bold text-xl max-md:text-sm">
                Total Vendor{" "}
                <span className="text-gray ml-4 max-md:text-sm">200</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {!showInputBox && (
                <img
                  src="/admin/searchIcon.svg"
                  className="p-3 bg-white border-gray-200 border-1 rounded-xl"
                  alt=""
                  onClick={() => setShowInputBox(!showInputBox)}
                />
              )}

              {showInputBox && (
                <input
                  type="text"
                  placeholder="Find Vendor"
                  className="p-2 rounded-xl outline-none border-gray border-1"
                />
              )}

              <button className="px-6 py-[10px] bg-primary max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl">
                + Tambah
              </button>
            </div>
          </div>
        </div>

        {/* <AdminVendorDashboard /> */}

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

export default VendorDashboard;
