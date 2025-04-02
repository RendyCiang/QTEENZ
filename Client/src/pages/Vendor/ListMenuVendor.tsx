import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";

function ListMenuVendor() {
  return (
    <>
      {/* Sidebar */}
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden"></div>
    </>
  );
}

export default ListMenuVendor;
