import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { GetHistoryBuyerPayload, GetHistoryBuyerData } from "@/types/types";
import HistoryMenuContainer from "@/components/food/Display Menu/HistoryMenuContainer";
import NavbarMain from "@/components/general/NavbarMain";

// Define interface for grouped menu items
type GroupedMenuItem = {
  variant: GetHistoryBuyerData["order"]["orderItem"][0]["menuVariant"];
  quantity: number;
  photo: string;
  menuName: string;
  menuId: string;
};

type GroupedMenus = {
  [vendorName: string]: {
    vendorName: string;
    items: { [variantId: string]: GroupedMenuItem };
  };
};

function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useFetchData<GetHistoryBuyerPayload>(
    "history/get-buyer-history"
  );

  const [allMenus, setAllMenus] = useState<GetHistoryBuyerData[]>([]);

  const groupedMenus: GroupedMenus = allMenus.reduce((acc, item) => {
    if (item.status_payment !== "Success" || item.order.status !== "Accepted") {
      return acc;
    }

    const vendorName = item.vendor.name ?? "Vendor Tidak Diketahui";
    if (!acc[vendorName]) {
      acc[vendorName] = { vendorName, items: {} };
    }

    item.order.orderItem.forEach((orderItem) => {
      const variantId = orderItem.menuVariant.id; // Use menuVariant.id for uniqueness
      if (!acc[vendorName].items[variantId]) {
        acc[vendorName].items[variantId] = {
          variant: orderItem.menuVariant,
          quantity: 0,
          photo: orderItem.menuVariant.menu.photo,
          menuName: orderItem.menuVariant.menu.name,
          menuId: orderItem.menuVariant.menu.id,
        };
      }
      acc[vendorName].items[variantId].quantity += orderItem.quantity;
    });

    return acc;
  }, {} as GroupedMenus);

  useEffect(() => {
    if (data) {
      setAllMenus(data.data);
    }
  }, [data]);

  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background">
        {/* Search */}
        <div className="flex items-center gap-2 w-m h-fit py-2 border-1 pl-4 rounded-md border-primary-3rd bg-white">
          <Search className="w-[16px] text-gray" />
          <input
            type="text"
            className="text-[14px] text-black outline-none w-full"
            placeholder="Cari sesuatu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="pt-8">
          {isLoading ? (
            <p className="pt-12">Loading...</p>
          ) : error ? (
            <p className="pt-12 text-red-500">Error Fetching Data</p>
          ) : (
            Object.values(groupedMenus).map(({ vendorName, items }) => (
              <div key={vendorName}>
                <h2 className="font-semibold text-[32px] mb-4 max-md:text-[24px]">
                  {vendorName}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {Object.entries(items)
                    .filter(([_, item]) =>
                      `${item.menuName} ${item.variant.name}`
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map(([variantId, item]) => (
                      <HistoryMenuContainer
                        key={variantId}
                        menu_name={item.menuName}
                        variant_name={item.variant.name}
                        vendor_price={item.variant.price}
                        purchase_number={item.quantity}
                        imageUrl={item.photo}
                        menu_id={item.menuId}
                      />
                    ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-12 flex flex-row justify-center">
          {isLoading ? (
            <></>
          ) : (
            <p className="text-gray-400">Sudah Menampilkan Semuanya</p>
          )}
        </div>

        <div></div>
      </div>
    </>
  );
}

export default HistoryPage;
