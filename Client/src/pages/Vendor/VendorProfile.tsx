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

      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        {/* Nav */}
        <div className=" bg-white justify-between flex w-full">
          <p className="pt-6 pb-8">
            Home &#62; <span className="font-bold">Pengaturan</span>
          </p>{" "}
          <h1 className="font-bold pt-8">Vendor</h1>
        </div>

        <h1 className="text-4xl font-bold">Pengaturan Profil Vendor</h1>
        <div className=" mt-7  justify-between flex text-center items-center">
          <div className=" flex gap-4">
            <Link to={"/vendor/pengaturan/:id"}>
              <p className="text-red-500 font-medium">General</p>
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
