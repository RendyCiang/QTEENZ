import adminMenuList from "@/assets/Admin/adminDashboard";
import RincianPermintaanForm from "@/components/admin/RincianPermintaanForm";
import Sidebar from "@/components/admin/Sidebar";
import React, { useState } from "react";

const AdminRincianPermintaan = () => {
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
            <div className="flex gap-4">
              <p className="font-bold text-xl max-md:text-sm">Status: </p>
              <p className="py-1 px-7 rounded-lg text-md font-normal bg-secondary-2nd">
                Ditinjau
              </p>
            </div>
          </div>
        </div>

        <RincianPermintaanForm />
      </div>
    </>
  );
};

export default AdminRincianPermintaan;
