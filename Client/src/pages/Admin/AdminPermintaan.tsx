import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import adminMenuList from "@/assets/Admin/adminDashboard";
import PagePermintaanVendor from "@/pages/Admin/PagePermintaanVendor";
import useFetchData from "@/hooks/useFetchData";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link, useParams } from "react-router-dom";

const options = [
  { value: "Semua", label: "Semua" },
  { value: "Accepted", label: "Diterima" },
  { value: "Pending", label: "Ditinjau" },
  { value: "Declined", label: "Ditolak" },
];

const AdminPermintaan = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Semua");
  const [searchName, setSearchName] = useState<string>("");
  const [userCount, setUserCount] = useState<number>();
  const { id } = useParams();
  const handleUserCountData = (data: number) => {
    setUserCount(data);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={adminMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>{" "}
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/admin/permintaan/`}> Permintaan </Link>
          </span>
        </div>
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

              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer hover:opacity-80 outline-none items-center py-[12px] px-4 max-md:px-2 max-md:py-[6px] bg-white border border-gray-200 rounded-lg text-left w-full">
                  {filter}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="border-none shadow-md bg-white rounded-lg w-[200px] p-3">
                  {options.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onSelect={() => setFilter(option.value)}
                      className={`cursor-pointer px-3 py-2 rounded-md ${
                        filter === option.value
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <PagePermintaanVendor
          filter={filter}
          searchName={searchName}
          sendUserCountDataToParent={handleUserCountData}
        />

        <div className="justify-end flex my-2 max-md:justify-center">
         
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
