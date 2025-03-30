import ListPermintaanVendorItem from "@/components/admin/ListPermintaanVendorItem";
import useFetchData from "@/hooks/useFetchData";
import { GetAllVendorRequest } from "@/types/types";
import toast from "react-hot-toast";

const PagePermintaanVendor = () => {
  const { data, isLoading, error } = useFetchData<GetAllVendorRequest>(
    "/requests/get-requests"
  );

  console.log(
    "Fetched data:",
    data,
    "Type:",
    typeof data,
    "Is Array:",
    Array.isArray(data?.data) // Perbaikan di sini
  );

  if (error) {
    toast("Error fetching data. Please try again.");
  }

  // Ubah ke array jika bukan array
  const arrayData = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="max-md:border-1 rounded-lg items-center max-h-[70vh] bg-white grid grid-cols-9 overflow-y-scroll">
      {/* Table Header */}
      <div className="col-span-1 max-md:text-sm">
        <p className="text-gray text-center py-4">No.</p>
      </div>
      <div className="col-span-2 max-md:col-span-4 max-md:text-sm">
        <p className="text-gray py-4">Vendor</p>
      </div>
      <div className="col-span-1 max-md:col-span-2 max-md:text-center max-md:text-sm">
        <p className="text-gray py-4">Tenggat</p>
      </div>
      <div className="col-span-2 text-center max-md:hidden max-md:col-span-0">
        <p className="text-gray py-4">Tanggal Persetujuan</p>
      </div>
      <div className="col-span-2 text-center max-md:hidden max-md:col-span-0">
        <p className="text-gray py-4">Status</p>
      </div>
      <div className="col-span-1 max-md:col-span-2">
        <p className="text-gray py-4 text-center">Aksi</p>
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
    </div>
  );
};

export default PagePermintaanVendor;
