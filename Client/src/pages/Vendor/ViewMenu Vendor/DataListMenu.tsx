import MenuCard from "@/components/vendor/MenuCard";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import React, { useEffect, useState } from "react";
import { boolean } from "zod";

type DataListMenuProps = {
  allMenus: VendorMenuItem[];
  setAllMenus: React.Dispatch<React.SetStateAction<VendorMenuItem[]>>;
  stockHabis: VendorMenuItem[];
  setStockHabis: React.Dispatch<React.SetStateAction<VendorMenuItem[]>>;
  filter: string;
  searchName: string;
  archivedMenus: VendorMenuItem[];
  setArchivedMenu: React.Dispatch<React.SetStateAction<VendorMenuItem[]>>;
};

function DataListMenu({
  allMenus,
  setAllMenus,
  stockHabis,
  setStockHabis,
  searchName,
  archivedMenus,
  setArchivedMenu,
}: DataListMenuProps) {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("/menus/get-menu");

  //untuk count
  useEffect(() => {
    if (data) {
      const menus = data.data;
      const stockHabisMenus = menus.filter(
        (item) => item.menuVariants?.[0]?.stock === 0
      );
      const archived = menus.filter((item) => item.isArchived === true);

      setAllMenus(menus);
      setStockHabis(stockHabisMenus);
      setArchivedMenu(archived);
    }
  }, [data]);
  const [arsipkan, setArsipkan] = useState<VendorMenuItem[]>([]);
  const [filter, setFilter] = useState<string>("all");
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

  const getFilteredMenus = () => {
    if (filter === "habis") return stockHabis;
    if (filter === "arsipkan") return archivedMenus;
    return allMenus;
  };

  return (
    <>
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
          <p>No Menu item found.</p>
        )}
      </div>
    </>
  );
}

export default DataListMenu;
