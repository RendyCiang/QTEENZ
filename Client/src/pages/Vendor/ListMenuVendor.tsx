import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import MenuCard from "@/components/vendor/MenuCard";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { number } from "zod";

const ListMenuVendor = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [userCount, setUserCount] = useState<number>();
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("/menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const [stockHabis, setStockHabis] = useState<VendorMenuItem[]>([]);
  const [archivedMenus, setArchivedMenus] = useState<VendorMenuItem[]>([]);
  const [arsipkan, setArsipkan] = useState<VendorMenuItem[]>([]);
  const [isArchived, setIsArchived] = useState<boolean>(false);

  //untuk count
  useEffect(() => {
    if (data) {
      const menus = data.data;
      const stockHabisMenus = menus.filter(
        (item) => item.menuVariants?.[0]?.stock === 0
      );
      const arsipMenus = menus.filter((item) => setIsArchived(true));

      setAllMenus(menus);
      setStockHabis(stockHabisMenus);
      setArsipkan(arsipMenus);
    }
  }, [data]);

  const handleArchive = (menu: VendorMenuItem) => {
    setArchivedMenus((prev) => [...prev, menu]);
    setAllMenus((prev) => prev.filter((item) => item.id !== menu.id));
  };

  const getFilteredMenus = () => {
    if (filter === "habis") return stockHabis;
    if (filter === "arsipkan") return archivedMenus;
    return allMenus;
  };

  console.log(data);

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <p className="pt-6 pb-8 max-md:pt-0 max-md:pb-0">
          Beranda &#62; <span className="font-bold">Menu</span>
        </p>{" "}
        <h1 className="font-bold">Vendor</h1>
      </div>

      <h1 className="pl-70 pr-10 w-full text-4xl font-bold max-md:text-3xl max-md:pl-5 max-md:pr-0">
        Daftar Menu
      </h1>
      {/* Konten */}
      <div className="pl-70 w-full pr-10 max-md:pt-5 max-md:min-w-screen max-md:px-5">
        <div className="w-full my-7 justify-between flex text-center items-center max-md:my-5 max-md:gap-5">
          <div className=" flex gap-20 max-md:gap-5">
            <div
              className="flex gap-2 cursor-pointer max-md:gap-1"
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
              <option value="Open" className="text-[12px]">
                Buka
              </option>
              <option value="Close" className="text-[12px]">
                Tutup
              </option>
            </select>

            <button className="px-6 max-md:text-sm cursor-pointer text-nowrap hover:opacity-80 py-[10px] bg-primary max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl">
              + Tambah
            </button>
          </div>
        </div>

        {/* data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching data</p>
          ) : allMenus?.length ? (
            getFilteredMenus()
              .filter((item: VendorMenuItem) =>
                item.name.toLowerCase().includes(searchName.toLowerCase())
              )
              .map((item: VendorMenuItem) => (
                <MenuCard
                  key={item.id}
                  menu_name={item.name}
                  vendor_price={item.menuVariants?.[0]?.price ?? 0}
                  vendor_category={item.category?.name}
                  imageUrl={item.photo}
                  vendor_stock={item.menuVariants?.[0]?.stock ?? 0}
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
