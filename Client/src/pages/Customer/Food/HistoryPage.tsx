import HistoryMenuContainer from "@/components/food/Display Menu/HistoryMenuContainer";
import NavbarMain from "@/components/general/NavbarMain";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { GetHistoryBuyerPayload, GetHistoryBuyerData } from "@/types/types";
import { roleStore } from "@/store/roleStore";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allMenus, setAllMenus] = useState<GetHistoryBuyerData[]>([]);
  const { data, isLoading, error } = useFetchData<GetHistoryBuyerPayload>(
    "/history/get-buyer-history"
  );
  const navigate = useNavigate();
  const { role } = roleStore();
  useEffect(() => {
    if (role === null) {
      navigate("/login");
      return;
    }
    if (data?.data) {
      // Sort by latest order using createAt
      const sortedMenus = [...data.data].sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );
      setAllMenus(sortedMenus);
    }
  }, [data]);

  // Filter menus based on search term
  const filteredMenus = allMenus.filter(
    (order) =>
      order.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order.orderItem.some((item) =>
        item.menuVariant.menu.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <NavbarMain />
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background min-h-screen">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredMenus.map((order) => (
                <HistoryMenuContainer key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        <div className="pt-12 flex flex-row justify-center">
          {isLoading ? (
            <></>
          ) : (
            <p className="text-gray-400">Sudah Menampilkan Semuanya</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
