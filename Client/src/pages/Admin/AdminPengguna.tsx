import PenggunaDashboard from "@/components/admin/PenggunaDashboard";
import Sidebar from "@/components/admin/Sidebar";
import VendorDashboard from "@/components/admin/AdminVendorDashboard";
import React, { useState } from "react";
import adminMenuList from "@/assets/Admin/adminDashboard";
import Dropdown from "@/components/general/Dropdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const options = [
  { value: "Semua", label: "Semua" },
  { value: "Buyer", label: "Pembeli" },
  { value: "Seller", label: "Vendor" },
];

const AdminPengguna = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Semua");
  const [searchName, setSearchName] = useState<string>("");
  const [userCount, setUserCount] = useState<number>();
  const handleUserCountData = (data: number) => {
    setUserCount(data);
  };
  return (
    <>
      <Sidebar props={adminMenuList} />
      <div className=" bg-white justify-between  pl-70 pr-10  flex max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>{" "}
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/admin/pengguna/`}> Pengguna </Link>
          </span>
        </div>
        <h1 className="font-bold pt-8">Admin</h1>
      </div>
      <div className="bg-[#FFF8F8] pl-70 pr-10 min-h-screen max-md:pt-5 max-md:pl-5 max-md:pr-5">
        {/* Manajemen Vendor */}
        <div className="bg-[#FFF8F8] pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-3xl font-bold max-md:text-2xl pb-5">
            Daftar Pengguna
          </h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0 max-md:mb-2">
            <div>
              <p className="font-bold text-xl max-md:text-sm">
                Pengguna{" "}
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
                  onChange={(e) => setSearchName(e.target.value)}
                  value={searchName}
                  placeholder="Find Vendor"
                  className="p-2 rounded-xl outline-none border-gray border-1"
                />
              )}

              <DropdownMenu>
                <DropdownMenuTrigger className="flex cursor-pointer gap-3 hover:opacity-80 outline-none items-center py-[10px] px-4 max-md:px-2 max-md:py-[6px] bg-white border border-gray-200 rounded-lg text-left w-full max-md:text-[12px]">
                  {filter}
                  <Icon
                    icon="weui:arrow-outlined"
                    className={`text-lg cursor-pointer rotate-90 text-center transition-transform duration-300`}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="border-none shadow-md bg-white rounded-lg w-[200px] p-3 max-md:text-[12px]">
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
        <PenggunaDashboard
          filter={filter}
          searchName={searchName}
          sendUserCountDataToParent={handleUserCountData}
        />
      </div>
    </>
  );
};

export default AdminPengguna;
