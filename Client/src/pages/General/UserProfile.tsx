import ProfileInformation from "@/components/user/ProfileInformation";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import UpdatePassword from "@/components/user/UpdatePassword";
import { Link, useNavigate } from "react-router-dom";
import ArrowIcon from "@/assets/User/ArrowIcon";
import PersonIcon from "@/assets/User/PersonIcon";
import PasswordIcon from "@/assets/User/PasswordIcon";
import { LogOutIcon } from "lucide-react";
import NavbarMain from "@/components/general/NavbarMain";
import { roleStore } from "@/store/roleStore";
import useFetchData from "@/hooks/useFetchData";
import { GetBuyerData, GetBuyerDataPayload } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";

const UserProfile = () => {
  const [menuGeneral, setMenuGeneral] = useState<boolean>(true);
  const { roleId } = roleStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<GetBuyerData | null>(null);
  const { data, isLoading, error } = useFetchData<GetBuyerDataPayload>(
    `/users/get-user/${roleId}`
  );
  useEffect(() => {
    if (data?.data) {
      setUserData(data.data);
    }
  }, [data]);

  return (
    <>
      <div className="max-md:">
        <NavbarMain />
      </div>
      {/* Desktop */}
      <div className="max-md:hidden min-h-screen w-full bg-background flex flex-col items-center py-5 px-12">
        <div className="mt-5 px-5 w-full flex items-center justify-between mb-3">
          <div className="flex items-center gap-5">
            <p
              onClick={() => setMenuGeneral(!menuGeneral)}
              className={`text-md cursor-pointer hover:opacity-80 ${
                menuGeneral && "text-primary"
              }`}
            >
              General
            </p>
            <p
              onClick={() => setMenuGeneral(!menuGeneral)}
              className={`text-md cursor-pointer hover:opacity-80 ${
                !menuGeneral && "text-primary"
              }`}
            >
              Atur Kata Sandi
            </p>
          </div>
          <div
            onClick={logout}
            className="flex items-center gap-5 cursor-pointer hover:opacity-80"
          >
            <p className="text-md ">Keluar</p>
            <p className="text-md rotate-180">&#60;</p>
          </div>
        </div>

        {menuGeneral ? <ProfileInformation /> : <UpdatePassword />}
      </div>

      {/* Phone */}
      <div className="px-10 py-10 hidden max-md:block bg-background max-md:py-5 min-h-screen">
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img src="/user/profileArrow.png" alt="" />
          <h1 className="text-xl font-bold max-md:text-lg">Pengaturan</h1>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center mt-10">
          <img
            src={
              userData?.user?.photo
                ? userData?.user?.photo
                : "/user/profilePlaceholder.jpg"
            }
            alt="Profile Vendor"
            className="rounded-full object-cover border border-gray-300 w-[20vh] h-[20vh] max-md:h-[20vh]"
          />
          <p className="font-bold">
            {`${userData?.first_name ?? ""} ${
              userData?.last_name ?? ""
            }`.trim()}
          </p>
          <p className="">{userData?.user?.email}</p>
        </div>

        {/* Profil */}
        <div className="flex flex-col gap-3 justify-center mt-10">
          <p className="text-gray-400">Profil</p>

          <Link to={`/profile/info/${roleId}`}>
            <div className="flex items-center gap-5 cursor-pointer hover:opacity-80 justify-between">
              <div className="flex items-center gap-5">
                <PersonIcon />
                <p className="text-lg max-md:text-[14px]">Informasi Personal</p>
              </div>
              <ArrowIcon />
            </div>
          </Link>
          <Link to={`/profile/updatepassword/${roleId}`}>
            <div className="flex items-center gap-5 cursor-pointer hover:opacity-80 justify-between">
              <div className="flex items-center gap-5">
                <PasswordIcon />
                <p className="text-lg max-md:max-md:text-[14px]">Atur Kata Sandi</p>
              </div>
              <ArrowIcon />
            </div>
          </Link>
        </div>

        {/* Pesanan */}
        <div className="flex flex-col gap-3 justify-center mt-10">
          <p className="text-gray-400 ">Pesanan</p>

          <Link to={`/customer/shoppingcart`}>
            <div className="flex items-center gap-5 cursor-pointer hover:opacity-80 justify-between">
              <div className="flex items-center gap-5">
                <Icon icon="fluent:food-24-filled" className="text-2xl" />
                <p className="text-lg max-md:max-md:text-[14px]">Pesanan Saya</p>
              </div>
              <ArrowIcon />
            </div>
          </Link>

          <Link to={`/customer/history`}>
            <div className="flex items-center gap-5 cursor-pointer hover:opacity-80 justify-between">
              <div className="flex items-center gap-5">
                <Icon
                  icon="material-symbols:history-rounded"
                  className="text-2xl"
                />
                <p className="text-lg max-md:max-md:text-[14px]">Riwayat Pesanan Saya</p>
              </div>
              <ArrowIcon />
            </div>
          </Link>
        </div>

        {/* Pesanan */}
        <div className="flex flex-col gap-3 justify-center mt-10 ">
          <p className="text-gray-400">Lainnya</p>

          <div
            onClick={logout}
            className="flex items-center gap-5 cursor-pointer hover:opacity-80 justify-between max-md:pb-25"
          >
            <div className="flex items-center gap-5 ">
              <LogOutIcon />
              <p className="text-lg max-md:max-md:text-[14px]">Keluar</p>
            </div>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
