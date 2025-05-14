import adminMenuList from "@/assets/Admin/adminDashboard";
import vendorMenuList from "@/assets/Admin/vendorDashboard";
import RincianPermintaanForm from "@/components/admin/RincianPermintaanForm";
import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const AdminRincianPermintaan = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Vendor");
  const [status, setStatus] = useState<string>("Ditinjau");

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={adminMenuList} />
      <Toaster />
      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <p className="pt-6 pb-8 max-md:pt-0 max-md:pb-0">
          Home &#62; <span className="font-bold">Permintaan</span>
        </p>{" "}
        <h1 className="font-bold">Admin</h1>
      </div>

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-4 max-md:pl-5 max-md:pr-5 ">
        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:text-2xl max-md:mb-3">
            Permintaan Daftar Vendor
          </h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0">
            <div className="flex gap-4 max-md:justify-center items-center max-md:mb-3">
              <p className="font-bold text-xl max-md:text-sm">Status: </p>
              <p
                className={`py-1 px-7 rounded-lg text-md font-normal 
                ${
                  status === "Ditinjau"
                    ? "bg-secondary-2nd"
                    : status === "Diterima"
                    ? "bg-green-300"
                    : "bg-primary"
                }`}
              >
                {status}
              </p>
            </div>
          </div>
        </div>

        <RincianPermintaanForm setStatus={setStatus} />
      </div>
    </>
  );
};

export default AdminRincianPermintaan;
