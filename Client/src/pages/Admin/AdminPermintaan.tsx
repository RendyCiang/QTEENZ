import adminMenuList from "@/assets/Admin/adminDashboard";
import Sidebar from "@/components/admin/Sidebar";
import VendorDashboard from "@/components/admin/AdminVendorDashboard";
import React, { useState } from "react";

const AdminPermintaan = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Vendor");
  return (
    <>
      <Sidebar props={adminMenuList} />

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        <div className=" bg-white justify-between flex max-md:hidden">
          <p className="pt-6 pb-8">
            Home &#62; <span className="font-bold">Permintaan</span>
          </p>{" "}
          <h1 className="font-bold pt-8">Admin</h1>
        </div>

        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">
            Permintaan Daftar Vendor
          </h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0">
            <div>
              <p className="font-bold text-xl max-md:text-sm">
                Total Vendor{" "}
                <span className="text-gray ml-4 max-md:text-sm">3</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/admin/searchIcon.svg"
                className="p-3 bg-white border-gray-200 border-1 rounded-xl"
                alt=""
                onClick={() => setShowInputBox(!showInputBox)}
              />

              {/* <input
                type="  "
                placeholder="Find Vendor"
                className="p-2 rounded-xl outline-none border-primary border-1"
              /> */}

              <select
                className="py-[10px] px-4 bg-white border-1 border-gray-200 rounded-lg"
                value={filter}
                name="filter"
                id=""
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="Semua">Semua</option>
                <option value="Pembeli">Pembeli</option>
                <option value="Vendor">Vendor</option>
              </select>

              {/* <button className="px-6 py-[10px] bg-primary text-white rounded-xl">
                + Tambah
              </button> */}
            </div>
          </div>
        </div>

        <VendorDashboard />

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

export default AdminPermintaan;
