import ListPermintaanVendorItem from "@/components/admin/ListPermintaanVendorItem";
import PermintaanVendorItem from "../../components/admin/PermintaanVendorItem";

const PagePermintaanVendor = () => {
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
        <p className="text-gray py-4 text-center">Aksi</p >
      </div>
      {/* Data */}
      {Array.from({ length: 15 }, (_, i) => (
        <ListPermintaanVendorItem key={i} />
      ))}
    </div>
  );
};

export default PagePermintaanVendor;
