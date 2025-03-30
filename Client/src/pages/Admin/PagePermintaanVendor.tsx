import ListPermintaanVendorItem from "@/components/admin/ListPermintaanVendorItem";
import PermintaanVendorItem from "../../components/admin/PermintaanVendorItem";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useState } from "react";
import { GetAllRequestsPayload, RequestsPayload } from "@/types/types";

const PagePermintaanVendor = ({
  filter,
  searchName,
  sendUserCountDataToParent,
}: {
  filter: string;
  searchName: string;
  sendUserCountDataToParent: (data: number) => void;
}) => {
  const { data, isLoading, error } = useFetchData<GetAllRequestsPayload>(
    "/requests/get-requests"
  );

  const [filteredData, setFilteredData] = useState<RequestsPayload[]>([]);

  useEffect(() => {
    if (data?.data) {
      let filtered = data.data;

      // // Filter by searchName if it exists
      if (searchName !== "") {
        filtered = filtered.filter((vendor) => {
          return vendor.vendor_name.includes(searchName.toLowerCase());
        });
      }
      console.log(searchName, filter);
      // Filter by role only if filter is not "Semua"
      if (filter && filter !== "Semua") {
        filtered = filtered.filter((vendor) => vendor.status === filter);
      }

      setFilteredData(filtered);
      sendUserCountDataToParent(filtered.length);
      console.log(data.data);
    }
  }, [data, filter, searchName]);
  return (
    <div className="max-md:border-1 rounded-lg items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1 max-md:text-sm">
        <p className="text-gray text-center py-4  max-md:text-sm">No.</p>
      </div>
      <div className="col-span-2 max-md:col-span-4 max-md:text-center max-md:text-sm">
        <p className="text-gray py-4  max-md:text-sm">Vendor</p>
      </div>
      <div className="col-span-1 max-md:hidden max-md:text-center max-md:text-sm">
        <p className="text-gray py-4">Tenggat</p>
      </div>
      <div className="col-span-2 text-center max-md:hidden max-md:col-span-0">
        <p className="text-gray py-4">Tanggal Persetujuan</p>
      </div>
      <div className="col-span-2 text-center max-md:col-span-2">
        <p className="text-gray py-4 max-md:text-sm ">Status</p>
      </div>
      <div className="col-span-1 max-md:col-span-2">
        <p className="text-gray py-4 max-md:text-sm text-center">Aksi</p>
      </div>

      {/* Data */}
      {isLoading ? (
        <p className="text-center col-span-9 py-4">Memuat data...</p>
      ) : arrayData.length > 0 ? (
        arrayData.map((item, index) => (
          <ListPermintaanVendorItem key={item.id} datas={item} index={index} />
        ))
      ) : (
        <p className="text-center col-span-9 py-4">Data tidak tersedia</p>
      )}
      {isLoading
        ? Array.from({ length: 10 }, (_, index) => (
            <ListPermintaanVendorItem
              key={index}
              isLoading={true}
              index={index}
            />
          ))
        : filteredData.map(
            (i: RequestsPayload | undefined, index: number | undefined) => (
              <ListPermintaanVendorItem
                key={index}
                isLoading={false}
                data={i}
                index={index}
              />
            )
          )}
    </div>
  );
};

export default PagePermintaanVendor;
