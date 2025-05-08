import Navbar from "@/components/general/Navbar";
import ForgotPassword from "@/components/user/ForgotPassword";
import ProfileInformation from "@/components/user/ProfileInformation";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const UserProfile = () => {
  const dummy = {
    name: "User Name",
    profileLink: "",
    cartItems: "0",
  };

  const [menuGeneral, setMenuGeneral] = useState<boolean>(true);
  const { logout } = useAuth();
  return (
    <>
      {/* Desktop */}
      <div className="max-md:hidden min-h-screen w-full bg-[#F5F5F5] flex flex-col items-center py-5 px-12">
        <Navbar data={dummy} />

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

        {menuGeneral ? <ProfileInformation /> : <ForgotPassword />}
      </div>

      {/* Phone */}
    </>
  );
};

export default UserProfile;
