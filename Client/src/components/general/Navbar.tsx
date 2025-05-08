import React from "react";
import { Link } from "react-router-dom";

type NavbarProps = {
  data: {
    name: string;
    profileLink: string;
    cartItems: string; // change later to object that contains the cart items
  };
};

const Navbar: React.FC<NavbarProps> = ({ data }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Link to="/">
        <p className="   text-primary font-extrabold max-md:text-sm text-2xl">
          QTEENZ
        </p>
      </Link>
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          <img
            className="w-[35px] h-[35px] p-1 rounded-full bg-cover border-primary border-1 "
            src={
              data.profileLink
                ? data.profileLink
                : "/admin/penggunaDisabled.svg"
            }
            alt=""
          />
          <p className="font-semibold text-xl uppercase">Nama</p>
        </div>

        {/* keranjang */}
        <div className="relative">
          <img
            src="/user/keranjang.svg"
            className="w-[40px] h-[40px] p-2"
            alt=""
          />
          <p className="p-[2px] absolute right-0 top-0 text-[10px] rounded-full bg-primary text-white">
            50
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
