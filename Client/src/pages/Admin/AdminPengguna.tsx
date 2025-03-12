import PenggunaDashboard from "@/components/admin/PenggunaDashboard";
import Sidebar from "@/components/admin/Sidebar";
import VendorDashboard from "@/components/admin/VendorDashboard";
import React, { useState } from "react";
import adminMenuList from "@/assets/Admin/adminDashboard";
const AdminPengguna = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Vendor");
  return (
    <>
      <Sidebar props={adminMenuList} />
      <div className="pl-70 pr-10 min-h-screen">
        <div className=" bg-white justify-between flex">
          <p className="pt-6 pb-8">
            Home &#62; <span className="font-bold">Pengguna</span>
          </p>{" "}
          <h1 className="font-bold pt-8">Admin</h1>
        </div>

        {/* Managemen Vendor */}
        <div className="bg-[#FFF8F8] pt-2 pb-2">
          <h1 className="text-4xl font-bold">Daftar Pengguna</h1>
          <div className=" flex justify-between items-center mt-7">
            <div>
              <p className="font-bold text-xl ">
                Total Pengguna <span className="text-gray ml-4">2300</span>
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
        <PenggunaDashboard />

        <div className="justify-between flex my-2">
          <p>
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

export default AdminPengguna;
