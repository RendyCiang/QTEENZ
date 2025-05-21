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
  filter,
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

  const handleArchive = (menu: VendorMenuItem) => {
    setArchivedMenu((prev) => [...prev, menu]);
    setAllMenus((prev) => prev.filter((item) => item.id !== menu.id));
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
