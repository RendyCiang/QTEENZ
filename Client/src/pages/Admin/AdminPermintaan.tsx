import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import adminMenuList from "@/assets/Admin/adminDashboard";
import PagePermintaanVendor from "@/pages/Admin/PagePermintaanVendor";
import useFetchData from "@/hooks/useFetchData";
import { GetAllVendorRequest } from "@/types/types";

const AdminPermintaan = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Semua");
  const [searchName, setSearchName] = useState<string>("");
  const [userCount, setUserCount] = useState<number>();
  const handleUserCountData = (data: number) => {
    setUserCount(data);
  };
  return (
    <>
      {/* Sidebar */}
      <Sidebar props={adminMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <p className="pt-6 pb-8 max-md:pt-0 max-md:pb-0">
          Home &#62; <span className="font-bold">Permintaan</span>
        </p>{" "}
        <h1 className="font-bold">Admin</h1>
      </div>

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">
            Permintaan Daftar Vendor
          </h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0">
            <div>
              <p className="font-bold text-xl max-md:text-sm">
                Total Vendor{" "}
                <span className="text-gray ml-4 max-md:text-sm">
                  {userCount}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {!showInputBox && (
                <img
                  src="/admin/searchIcon.svg"
                  className="p-3 max-md:hidden  bg-white border-gray-200 border-1 rounded-xl"
                  alt=""
                  onClick={() => setShowInputBox(!showInputBox)}
                />
              )}

              {showInputBox && (
                <input
                  type="text"
                  placeholder="Find Vendor"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onBlur={() => setShowInputBox(false)}
                  onFocus={() => setShowInputBox(true)}
                  className="p-2 rounded-xl outline-none border-gray border-1"
                />
              )}

              <select
                className="py-[10px] px-4 bg-white border-1 border-gray-200 rounded-lg"
                value={filter}
                name="filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="Semua">Semua</option>
                <option value="Diterima">Diterima</option>
                <option value="Ditinjau">Ditinjau</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>
          </div>
        </div>

        <PagePermintaanVendor
          filter={filter}
          searchName={searchName}
          sendUserCountDataToParent={handleUserCountData}
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

export default AdminPermintaan;
