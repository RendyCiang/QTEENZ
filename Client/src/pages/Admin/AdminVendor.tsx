import Sidebar from "@/components/admin/Sidebar";
import React, { useState } from "react";
import adminMenuList from "@/assets/Admin/adminDashboard";
import AdminVendorDashboard from "@/components/admin/AdminVendorDashboard";
const AdminVendor = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Open");
  return (
    <>
      <Sidebar props={adminMenuList} />

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        <div className=" bg-white justify-between flex max-md:hidden">
          <p className="pt-6 pb-8">
            Home &#62; <span className="font-bold">Vendor</span>
          </p>{" "}
          <h1 className="font-bold pt-8">Admin</h1>
        </div>

        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">Manajemen Vendor</h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0 max-md:mb-2">
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
                  className="p-3 max-md:hidden bg-white border-gray-200 border-1 rounded-xl"
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

              <select
                name="filter"
                className="md:hidden border-1 border-gray-300 px-2 py-[5px] rounded-md"
                id=""
              >
                <option value="Open">Buka</option>
                <option value="Close">Tutup</option>
              </select>

              <button className="px-6 max-md:text-sm cursor-pointer py-[10px] bg-primary max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl">
                + Tambah
              </button>
            </div>
          </div>
        </div>

        <AdminVendorDashboard filter={filter} />

        <div className="justify-between flex my-2 max-md:justify-center">
          <p className="max-md:hidden">
            Menampilkan <span className="font-bold">1</span> dari{" "}
            <span className="font-bold">10</span> halaman
          </p>

          <div className="flex gap-4 ">
            <span className="text-xl cursor-pointer">&#60;</span>
            <p className="font-bold">1</p>
            <span className="text-xl font-bold cursor-pointer">&#62;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminVendor;
