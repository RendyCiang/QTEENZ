import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import MenuCard from "@/components/vendor/MenuCard";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem } from "@/types/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { number } from "zod";

const ListMenuVendor = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [userCount, setUserCount] = useState<number>();
  const { data, isLoading, error } =
    useFetchData<VendorMenuItem[]>("/menus/get-menu");

  //untuk count
  const allMenus = Array.isArray(data) ? data : [];
  const stockHabis = allMenus.filter((item) => item.vendor_stock === 0);
  const arsipkan = allMenus.filter((item) => item.is_archived === true);

  //filter
  let filteredMenus = allMenus;
  if (filter === "habis") {
    filteredMenus = stockHabis;
  } else if (filter === "arsipkan") {
    filteredMenus = arsipkan;
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <p className="pt-6 pb-8 max-md:pt-0 max-md:pb-0">
          Home &#62; <span className="font-bold">Menu</span>
        </p>{" "}
        <h1 className="font-bold">Vendor</h1>
      </div>

      {/* Konten */}
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5 pt-2 ">
        <h1 className="text-4xl font-bold max-md:text-3xl">Daftar Menu</h1>

        <div className=" mt-7  justify-between flex text-center items-center mb-7 ">
          <div className=" flex gap-20">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => setFilter("all")}
            >
              <p className="text-red-500 font-medium">Semua</p>
              <div className="bg-primary px-4 h-fit rounded-xl">
                <p className="text-white">{allMenus.length}</p>
              </div>
            </div>
            <div className="flex cursor-pointer">
              <p className="font-medium hover:text-gray-800">Habis</p>
              <p className="text-white">{stockHabis.length}</p>
            </div>
            <div className="flex cursor-pointer">
              <p className="font-medium hover:text-gray-800">Diarsipkan</p>
              <p className="text-white">{arsipkan.length}</p>
            </div>
          </div>

          {/* subnav */}
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
                placeholder="Find Menu"
                className="py-2 px-6 rounded-xl outline-none border-gray border-1"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
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

            <button className="px-6 max-md:text-sm cursor-pointer hover:opacity-80 py-[10px] bg-primary max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl">
              + Tambah
            </button>
          </div>
        </div>

        {/* data */}
        <div className="grid grid-cols-4 gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching data</p>
          ) : data?.length ? (
            data
              .filter((item) =>
                item.vendor_name
                  .toLowerCase()
                  .includes(searchName.toLowerCase())
              )
              .map((item) => (
                <MenuCard
                  key={item.vendor_id}
                  vendor_name={item.vendor_name}
                  vendor_price={item.vendor_price}
                  imageUrl={item.imageUrl}
                  vendor_stock={item.vendor_stock}
                />
              ))
          ) : (
            <p>No Menu item found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListMenuVendor;
