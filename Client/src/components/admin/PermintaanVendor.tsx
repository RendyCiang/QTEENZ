import { useEffect, useState } from "react";
import PermintaanVendorItem from "./PermintaanVendorItem";
import { Link } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import { GetAllRequestsPayload, RequestsPayload } from "@/types/types";
import Skeleton from "react-loading-skeleton";

const PermintaanVendor = () => {
  const { data, isLoading, error } = useFetchData<GetAllRequestsPayload>(
    "/requests/get-requests"
  );
  const [filteredData, setFilteredData] = useState<RequestsPayload[]>([]);

  useEffect(() => {
    if (data?.data) {
      setFilteredData(data.data);
    }
  }, [data]);
  return (
    <div className="col-span-3 rounded-lg shadow-md items-center max-h-[27vh] py-4  bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-3">
        <p className="text-gray py-4">Nama Vendor</p>
      </div>
      <div className="col-span-2">
        <p className="text-gray py-4">Tenggat</p>
      </div>
      <div className="col-span-2 text-center">
        <p className="text-gray py-4">Status Persetujuan</p>
      </div>
      <div className="col-span-1 text-center">
        <Link to={"/admin/permintaan"}>
          <p className="text-gray underline">Lihat Semua</p>
        </Link>
      </div>

      {/* Data */}

      {isLoading ? (
        Array.from({ length: 10 }, (_, index) => (
          <>
            <div className="col-span-1">
              <p className=" text-center py-4">
                <Skeleton width={20} height={20} />
              </p>
            </div>
            <div className="col-span-3 flex items-center gap-4 max-md:col-span-4">
              <Skeleton width={30} height={30} circle />
              <p className=" py-4">
                <Skeleton width={100} height={20} />
              </p>
            </div>
            <div className="col-span-2 ">
              <p className="py-4">
                <Skeleton width={100} height={20} />
              </p>
            </div>

            <div className="col-span-2 flex justify-center w-full">
              <Skeleton width={150} height={20} />
            </div>
            <div className="col-span-1"></div>
          </>
        ))
      ) : filteredData.length > 0 ? (
        filteredData
          .slice(0, 5)
          .map((item, index) => (
            <PermintaanVendorItem
              key={index}
              isLoading={isLoading}
              no={index}
              date={item.updateAt}
              vendorName={item.vendor_name}
              status={item.status}
            />
          ))
      ) : (
        <p className="text-center col-span-9 py-4">Data tidak tersedia</p>
      )}
    </div>
  );
};

export default PermintaanVendor;
