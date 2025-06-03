import vendorMenuList from "@/assets/Admin/vendorDashboard";
import LoadingSpinner from "@/assets/LoadingSpinner";
import Sidebar from "@/components/admin/Sidebar";
import Notification from "@/components/general/Notification";
import MenuCard from "@/components/vendor/MenuCard";
import ModalNotification from "@/components/vendor/ModalNotification";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";

const ListMenuVendor = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchName, setSearchName] = useState<string>("");
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const { id } = useParams();
  const {
    data: activeData,
    isLoading: loadingActive,
    error: errorActive,
  } = useFetchData<VendorMenuItemPayload>("/menus/get-menu-vendor");
  const {
    data: archivedData,
    isLoading: loadingArchived,
    error: errorArchived,
  } = useFetchData<VendorMenuItemPayload>("/menus/get-archived-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const [stockHabis, setStockHabis] = useState<VendorMenuItem[]>([]);
  const [arsipkan, setArsipkan] = useState<VendorMenuItem[]>([]);
  const isLoading = loadingActive || loadingArchived;
  const error = errorActive || errorArchived;

  useEffect(() => {
    if (activeData) {
      const menus = activeData.data;
      const stockHabisMenus = menus.filter(
        (item) => item.menuVariants?.[0]?.stock === 0
      );
      setAllMenus(menus);
      setStockHabis(stockHabisMenus);
    }

    if (archivedData) {
      const menus2 = archivedData.data;
      setArsipkan(menus2);
    }
  }, [activeData, archivedData]);

  const getFilteredMenus = () => {
    if (filter === "habis") {
      return allMenus.filter((item) => item.menuVariants?.[0]?.stock === 0);
    }
    if (filter === "arsipkan") {
      return arsipkan;
    }
    return allMenus;
  };

  const filterOptions = [
    { value: "all", label: "Semua", count: allMenus.length },
    { value: "habis", label: "Habis", count: stockHabis.length },
    { value: "arsipkan", label: "Diarsipkan", count: arsipkan.length },
  ];

  const handleArchivedSwitchTab = (menuId: string) => {
    const menu = allMenus.find(
      (item) => item.id === menuId && item.isArchived === true
    );
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

  if (isLoading) {
    return (
      <>
        {" "}
        <>
          {/* Sidebar */}
          <Sidebar props={vendorMenuList} />

          {/* Nav */}
          <div className=" bg-white justify-between  pl-70 pr-10 flex max-md:hidden">
            <div className="pt-6 pb-8 flex items-center gap-2">
              <p className="cursor-pointer hover:text-primary">
                <Link to={"/"}>Beranda </Link>
              </p>
              <p>&#62;</p>
              <span className="font-bold cursor-pointer hover:text-primary">
                <Link to={`/vendor/keuangan/${id}`}> Menu </Link>
              </span>
            </div>
            <div className="flex justify-center items-center gap-5">
              <Notification
                count={0}
                onClick={() => setNotifOpen(true)}
                apiEndpoint="orders/get-orders-vendor"
              />
              <h1 className="font-bold">Vendor</h1>
            </div>
            <ModalNotification
              visible={notifOpen}
              onClose={() => setNotifOpen(false)}
            />
          </div>

          <h1 className="pl-70 pr-10 w-full text-4xl font-bold max-md:text-3xl max-md:pl-5 max-md:pr-0">
            Daftar Menu
          </h1>

          {/* Konten */}
          <div className="pl-70 w-full pr-10 max-md:pt-5 max-md:min-w-screen max-md:px-5">
            <div className="w-full my-7 justify-between flex text-center items-center max-md:my-5 max-md:gap-5">
              <div className="flex gap-10 max-md:gap-5 max-md:flex-col">
                {filterOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setFilter(opt.value)}
                  >
                    <p
                      className={`font-medium ${
                        filter === opt.value
                          ? "text-primary"
                          : "text-black hover:text-gray-800"
                      }`}
                    >
                      <Skeleton width={50} height={20} />
                    </p>
                    <div
                      className={`px-3 py-[2px] text-sm rounded-xl font-semibold ${
                        filter === opt.value
                          ? "bg-primary text-white px-5"
                          : "bg-gray-200 text-black px-5"
                      }`}
                    >
                      {opt.count}
                    </div>
                  </div>
                ))}
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

                <button className="px-6 max-md:text-sm cursor-pointer text-nowrap hover:opacity-80 py-[10px] bg-primary max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl">
                  <Link to={`/vendor/menu/addmenu/${id}`}>+ Tambah</Link>
                </button>
              </div>
            </div>

            {/* data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full h-[250px]">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </>
      </>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between  pl-70 pr-10 flex max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/keuangan/${id}`}> Menu </Link>
          </span>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Notification
            count={0}
            onClick={() => setNotifOpen(true)}
            apiEndpoint="orders/get-orders-vendor"
          />
          <h1 className="font-bold">Vendor</h1>
        </div>
        <ModalNotification
          visible={notifOpen}
          onClose={() => setNotifOpen(false)}
        />
      </div>

      <h1 className="pl-70 pr-10 w-full text-3xl font-bold max-md:text-3xl max-md:pl-5 max-md:pr-0 max-md:pt-5">
        Daftar Menu
      </h1>

      {/* Konten */}
      <div className="pl-70 w-full pr-10 max-md:pt-5 max-md:min-w-screen max-md:px-5">
        <div className="w-full my-7 justify-between flex text-center items-center max-md:my-5 max-md:gap-5">
          <div className="flex gap-10 max-md:gap-5 max-md:flex-col">
            {filterOptions.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setFilter(opt.value)}
              >
                <p
                  className={`font-medium ${
                    filter === opt.value
                      ? "text-primary"
                      : "text-black hover:text-gray-800"
                  }`}
                >
                  {opt.label}
                </p>
                <div
                  className={`px-3 py-[2px] text-sm rounded-xl font-semibold ${
                    filter === opt.value
                      ? "bg-primary text-white px-5"
                      : "bg-gray-200 text-black px-5"
                  }`}
                >
                  {opt.count}
                </div>
              </div>
            ))}
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

            {/* <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="md:hidden border-1 border-gray-300 px-2 py-[5px] rounded-md"
            >
              <option value="all">Semua</option>
              <option value="habis">Habis</option>
              <option value="arsipkan">Diarsipkan</option>
            </select> */}

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
          ) : allMenus.length ? (
            getFilteredMenus()
              .filter((item) =>
                item.name.toLowerCase().includes(searchName.toLowerCase())
              )
              .map((item) => (
                <MenuCard
                  key={item.id}
                  menu_name={item.name}
                  vendor_price={item.menuVariants?.[0]?.price ?? 0}
                  menu_id={item.id}
                  vendor_category={item.category?.name}
                  imageUrl={item.photo}
                  vendor_stock={item.menuVariants?.[0]?.stock ?? 0}
                  isArchived={item.isArchived}
                  onToggleArchive={
                    filter === "arsipkan"
                      ? handleUnarchive
                      : handleArchivedSwitchTab
                  }
                />
              ))
          ) : (
            !getFilteredMenus().length && (
              <p className="text-center col-span-full">
                Tidak ada menu yang tersedia.
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ListMenuVendor;
