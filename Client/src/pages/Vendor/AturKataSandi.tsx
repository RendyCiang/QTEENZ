import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@/components/general/Button";

function AturKataSandi() {
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
        <p className="pt-6 pb-8 max-md:pt-0 max-md:pb-0 ">
          Home &#62; <span className="font-bold">Pengaturan</span>
        </p>{" "}
        <h1 className="font-bold">Vendor</h1>
      </div>

      <div className="bg-[#FFF8F8] pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5 ">
        <h1 className="text-4xl font-bold max-md:text-3xl">
          Pengaturan Profil Vendor
        </h1>
        <div className=" mt-7  justify-between flex text-center items-center">
          <div className=" flex gap-4">
            <Link to={"/vendor/pengaturan/:id"}>
              <p className="font-medium">General</p>
            </Link>
            <Link to={"/vendor/pengaturan/atursandi/:id"}>
              <p className=" text-red-500 font-medium">Atur Kata Sandi</p>
            </Link>
          </div>
          <div
            className={`px-6 py-[10px] max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white opacity-0 rounded-xl
            }`}
          >
            Ubah
          </div>
        </div>
        <div className="bg-white w-full mt-6 py-10 rounded-[8px] shadow-md px-20 max-md:px-5 max-md:py-7">
          <form action="">
            <div className="pb-5">
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-[14px] font-semibold whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1 ">
                  Kata Sandi Sekarang
                </label>
                <input
                  type="password"
                  name=""
                  placeholder="Masukkan kata sandi sekarang"
                  className={`text-[14px] border-1 border-gray rounded-lg h-12 px-3 py-2 w-full 
                focus:outline-primary`}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-[14px] font-semibold whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1 ">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  name=""
                  placeholder="Masukkan kata sandi baru"
                  className={`text-[14px] border-1 border-gray rounded-lg h-12 px-3 py-2 w-full focus:outline-primary`}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-[14px] font-semibold whitespace-nowrap after:content-['*'] after:text-red-500 after:ml-1 ">
                  Ulangi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  name=""
                  placeholder="Ulangi kata sandi baru"
                  className={`text-[14px] border-1 border-gray rounded-lg h-12 px-3 py-2 w-full 
                  focus:outline-primary`}
                />
              </div>
            </div>

            <button
              onClick={handleEdit}
              className={`w-full px-6 py-[10px] max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl cursor-pointer hover:bg-primary-2nd ${
                isEditing ? "bg-primary-2nd" : "bg-primary"
              }`}
            >
              Simpan
            </button>
            <Button
              variant="underlinedWord"
              size="xsm"
              className="items-center justify-center mt-2 text-[14px]"
            >
              Lupa Kata Sandi?
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AturKataSandi;
