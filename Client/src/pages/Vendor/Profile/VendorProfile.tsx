import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import Notification from "@/components/general/Notification";
import FormProfile from "@/components/vendor/FormProfile";
import ModalNotification from "@/components/vendor/ModalNotification";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function VendorProfile() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const handleEdit = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between  pl-70 pr-10 flex max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/pengaturan/${id}`}> Profil </Link>
          </span>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Notification
            count={0}
            onClick={() => setNotifOpen(true)}
            apiEndpoint="orders/get-orders-vendor"
          />
          <h1 className="font-bold">Vendor</h1>
        </div>
        <ModalNotification
          visible={notifOpen}
          onClose={() => setNotifOpen(false)}
        />
      </div>
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5 pt-2">
        <h1 className="text-3xl font-bold max-md:text-3xl">
          Pengaturan Profil Vendor
        </h1>
        <div className=" mt-7  justify-between flex text-center items-center">
          <div className=" flex gap-4">
            <Link to={`/vendor/pengaturan/${id}`}>
              <p className="text-red-500 font-medium ">General</p>
            </Link>
            <Link to={`/vendor/pengaturan/atursandi/${id}`}>
              <p className="font-medium">Atur Kata Sandi</p>
            </Link>
          </div>
          <button
            onClick={handleEdit}
            className={`px-6 py-[10px] max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white cursor-pointer rounded-xl ${
              isDisabled ? "bg-primary hover:bg-primary-2nd" : "bg-primary-2nd"
            }`}
          >
            Ubah
          </button>
        </div>
        <FormProfile isEditing={isDisabled} setIsEditing={setIsDisabled} />
      </div>
    </>
  );
}

export default VendorProfile;
