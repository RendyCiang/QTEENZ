import PendapatanDashbor from "@/components/admin/UlasanPengguna";
import Sidebar from "@/components/admin/Sidebar";
import React from "react";
import { useState } from "react";
import KepuasanPengguna from "../../components/admin/KepuasanPengguna";
import UlasanPengguna from "@/components/admin/UlasanPengguna";
import TotalPengguna from "../../components/admin/TotalPengguna";
import adminMenuList from "@/assets/Admin/adminDashboard";
import GrafikPermintaanVendor from "../../components/admin/GrafikPermintaanVendor";
import PermintaanVendor from "../../components/admin/PermintaanVendor";
const AdminDashboard = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Vendor");
  return (
    <>
      <Sidebar props={adminMenuList} />

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10">
        <div className=" bg-white justify-between flex">
          <p className="pt-6 pb-8">
            Home &#62; <span className="font-bold">Dasbor</span>
          </p>{" "}
          <h1 className="font-bold pt-8">Admin</h1>
        </div>

        {/* Admin */}
        <div className=" pt-2 pb-2">
          <h1 className="text-4xl font-bold">Admin Panel</h1>

          <div className="grid grid-cols-5 max-h-[45vh] gap-4">
            <UlasanPengguna />
            <div className="col-span-2 mt-4">
              <div className="grid grid-rows-2 gap-y-2">
                <TotalPengguna />
                <KepuasanPengguna />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="justify-between flex my-2">
          <p>
            Menampilkan <span className="font-bold">1</span> dari{" "}
            <span className="font-bold">10</span> halaman
          </p>

          <div className="flex gap-4 ">
            <span className="text-xl ">&#60;</span>
            <p className="font-bold">1</p>
            <span className="text-xl font-bold">&#62;</span>
          </div>
        </div> */}
        {/* Permintaan */}
        <div className="flex mt-10 mb-3 justify-between">
          <h1 className="font-bold text-xl">Permintaan Vendor</h1>
          <p className="underline">Lihat Semua</p>
        </div>

        {/* DATA DAN GRAPH */}
        <div className="grid grid-cols-5 gap-4">
          <PermintaanVendor />
          {/* <GrafikPermintaanVendor /> */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
