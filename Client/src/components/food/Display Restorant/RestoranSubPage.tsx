import React, { useEffect, useState } from "react";
import FoodRestorant from "./FoodRestorant";
import { Link } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";

function RestoranSubPage() {
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(menus);
    }
  }, [data]);
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[32px] max-md:text-[24px] mt-4 mb-4">
            Restoran terdekat
          </p>
          <p className="font-medium text-[14px] cursor-pointer hover:text-gray-700 underline">
            <Link to={`/customer/allrestorant`}>Lihat semua</Link>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {/* {Array.from({ length: 10 }).map((_, idx) => (
            <FoodRestorant />
          ))} */}
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error Fetching Data</p>
          ) : (
            allMenus.map((item: VendorMenuItem) => (
              <FoodRestorant
                key={item.id}
                vendor_name={item.vendor.name ?? "null"}
                vendor_price={item.menuVariants?.[0]?.price ?? 0}
                vendor_rating={item.vendor.rating ?? 0}
                imageUrl={item.photo}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default RestoranSubPage;
