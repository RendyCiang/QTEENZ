import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import FormProfile from "@/components/vendor/FormProfile";
import { useState } from "react";
import { Link } from "react-router-dom";

function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <p className="pt-6 pb-8 max-md:pt-0 max-md:pb-0">
          Home &#62; <span className="font-bold">Pengaturan</span>
        </p>{" "}
        <h1 className="font-bold">Vendor</h1>
      </div>
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5">
        <h1 className="text-4xl font-bold max-md:text-3xl">
          Pengaturan Profil Vendor
        </h1>
        <div className=" mt-7  justify-between flex text-center items-center">
          <div className=" flex gap-4">
            <Link to={"/vendor/pengaturan/:id"}>
              <p className="text-red-500 font-medium ">
                General
              </p>
            </Link>
            <Link to={"/vendor/pengaturan/atursandi/:id"}>
              <p className="font-medium">Atur Kata Sandi</p>
            </Link>
          </div>
          <button
            onClick={handleEdit}
            className={`px-6 py-[10px] max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl ${
              isEditing ? "bg-primary-2nd" : "bg-primary hover:bg-primary-2nd"
            }`}
          >
            Ubah
          </button>
        </div>
        <FormProfile isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    </>
  );
}

export default VendorProfile;
