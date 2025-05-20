import vendorMenuList from "@/assets/Admin/vendorDashboard";
import LoadingSpinner from "@/assets/LoadingSpinner";
import Sidebar from "@/components/admin/Sidebar";
import MenuCard from "@/components/vendor/MenuCard";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ListMenuVendor = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const { id } = useParams();
  const [userCount, setUserCount] = useState<number>();
  const { data, isLoading, error } = useFetchData<VendorMenuItemPayload>(
    "/menus/get-menu-vendor"
  );
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const [stockHabis, setStockHabis] = useState<VendorMenuItem[]>([]);

  const [arsipkan, setArsipkan] = useState<VendorMenuItem[]>([]);
  const [isArchived, setIsArchived] = useState<boolean>(false);

  //untuk count
  useEffect(() => {
    if (data) {
      const menus = data.data;

      const stockHabisMenus = menus.filter(
        (item) => item.menuVariants?.[0]?.stock === 0
      );

      const arsipMenus = menus.filter((item) => item.isArchived === true);

      setAllMenus(menus.filter((item) => !item.isArchived));
      setStockHabis(stockHabisMenus);
      setArsipkan(arsipMenus);
    }
  }, [data]);
  console.log(data);

  const handleArchive = (menu: VendorMenuItem) => {
    setArsipkan((prev) => [...prev, menu]);
    setAllMenus((prev) => prev.filter((item) => item.id !== menu.id));
  };

  const getFilteredMenus = () => {
    if (filter === "habis") return stockHabis;
    if (filter === "arsipkan") return arsipkan;
    return allMenus;
  };

  const handleArchivedSwitchTab = (menuId: string) => {
    const menu = allMenus.find((item) => item.id === menuId);
    if (menu) {
      setArsipkan((prev) => [...prev, menu]);
      setAllMenus((prev) => prev.filter((item) => item.id !== menuId));
      setFilter("arsipkan");
    }
  };

  const handleUnarchive = (menuId: string) => {
    const menu = arsipkan.find((item) => item.id === menuId);
    if (menu) {
      setAllMenus((prev) => [...prev, menu]);
      setArsipkan((prev) => prev.filter((item) => item.id !== menuId));
      setFilter("all");
    }
  };

  console.log(data);

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>
          <p>&#62;</p>

          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/menu/listmenu/${id}`}> Menu </Link>
          </span>
        </div>
        <h1 className="font-bold">Vendor</h1>
      </div>

      <h1 className="pl-70 pr-10 w-full text-4xl font-bold max-md:text-3xl max-md:pl-5 max-md:pr-0">
        Daftar Menu
      </h1>
      {/* Konten */}
      <div className="pl-70 w-full pr-10 max-md:pt-5 max-md:min-w-screen max-md:px-5">
        <div className="w-full my-7 justify-between flex text-center items-center max-md:my-5 max-md:gap-5">
          <div className="flex gap-10 max-md:gap-5 max-md:flex-col">
            {/* SEMUA */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setFilter("all")}
            >
              <p
                className={`font-medium ${
                  filter === "all"
                    ? "text-primary"
                    : "text-black hover:text-gray-800"
                }`}
              >
                Semua
              </p>
              <div
                className={`px-3 py-[2px] text-sm rounded-xl font-semibold ${
                  filter === "all"
                    ? "bg-primary text-white px-5"
                    : "bg-gray-200 text-black px-5"
                }`}
              >
                {allMenus.length}
              </div>
            </div>

            {/* HABIS */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setFilter("habis")}
            >
              <p
                className={`font-medium ${
                  filter === "habis"
                    ? "text-primary"
                    : "text-black hover:text-gray-800"
                }`}
              >
                Habis
              </p>
              <div
                className={`px-3 py-[2px] text-sm rounded-xl font-semibold ${
                  filter === "habis"
                    ? "bg-primary text-white px-5"
                    : "bg-gray-200 text-black px-5"
                }`}
              >
                {stockHabis.length}
              </div>
            </div>

            {/* DIARSIPKAN */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setFilter("arsipkan")}
            >
              <p
                className={`font-medium ${
                  filter === "arsipkan"
                    ? "text-primary"
                    : "text-black hover:text-gray-800"
                }`}
              >
                Diarsipkan
              </p>
              <div
                className={`px-3 py-[2px] text-sm rounded-xl font-semibold ${
                  filter === "arsipkan"
                    ? "bg-primary text-white px-5"
                    : "bg-gray-200 text-black px-5"
                }`}
              >
                {arsipkan.length}
              </div>
            </div>
          </div>

          {/* subnav */}
          <div className="flex items-center gap-4 max-md:flex-col">
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
              <Link to={`/vendor/menu/addmenu/${id}`}>+ Tambah</Link>
            </button>
          </div>
        </div>

        {/* data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <LoadingSpinner />
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
                  menu_id={item.id}
                  vendor_category={item.category?.name}
                  imageUrl={item.photo}
                  vendor_stock={item.menuVariants?.[0]?.stock ?? 0}
                  isArchiveds={item.isArchived}
                  onToggleArchive={
                    filter === "arsipkan"
                      ? handleUnarchive
                      : handleArchivedSwitchTab
                  }
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
