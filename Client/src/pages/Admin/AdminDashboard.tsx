import Sidebar from "@/components/admin/Sidebar";
import KepuasanPengguna from "../../components/admin/KepuasanPengguna";
import UlasanPengguna from "@/components/admin/UlasanPengguna";
import TotalPengguna from "../../components/admin/TotalPengguna";
import adminMenuList from "@/assets/Admin/adminDashboard";
import GrafikPermintaanVendor from "../../components/admin/GrafikPermintaanVendor";
import PermintaanVendor from "../../components/admin/PermintaanVendor";
import TotalDitinjau from "@/components/admin/TotalDitinjau";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <>
      <Sidebar props={adminMenuList} />

      <div className=" bg-white justify-between pl-70 pr-10 flex max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>{" "}
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/admin/dasbor/`}> Dasbor </Link>
          </span>
        </div>
        <h1 className="font-bold pt-8">Admin</h1>
      </div>

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pl-5 max-md:pr-5 max-md:hidden block max-xl:flex max-xl:flex-col">
        {/* Admin */}
        <div className=" pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-3xl font-bold max-md:hidden">Admin Panel</h1>

          <div className="grid grid-cols-5 max-h-[45vh] max-xl:max-h-none gap-4 max-xl:flex max-xl:flex-col">
            <UlasanPengguna />
            <div className="col-span-2 mt-4 max-xl:flex max-xl:flex-col">
              <div className="grid grid-rows-2 gap-y-2 max-xl:flex max-xl:flex-col">
                <TotalPengguna />
                <KepuasanPengguna />
              </div>
            </div>
          </div>
        </div>

        {/* Permintaan */}
        <div className="flex mt-10  mb-3 justify-between max-xl:mt-3">
          <h1 className="font-bold text-xl">Permintaan Vendor</h1>
          {/* <p className="underline">Lihat Semua</p> */}
        </div>

        {/* DATA DAN GRAPH */}
        <div className="grid grid-cols-5 gap-4 max-xl:flex max-xl:flex-col ">
          <PermintaanVendor />
          <GrafikPermintaanVendor />
        </div>
      </div>

      <div className="max-md:flex hidden  bg-[#FFF8F8] min-h-screen gap-2 flex-col max-md:pl-5 max-md:pr-5">
        <h1 className="text-3xl font-bold max-md:text-2xl max-md:pt-5 max-md:pb-5">Admin Panel</h1>
        <KepuasanPengguna />
        <TotalPengguna />
        <UlasanPengguna />
        <GrafikPermintaanVendor />
        <TotalDitinjau />
      </div>
    </>
  );
};

export default AdminDashboard;
