import { ShoppingCart } from "lucide-react";
import React from "react";

function NavbarMain() {
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4">
        <ul className="flex gap-8 font-semibold text-black">
          <li className="text-[16px] font-semibold">BERANDA</li>
          <li className="text-[16px] font-semibold">ORDER</li>
          <li className="text-[16px] font-semibold">RIWAYAT</li>
        </ul>
        <div className="text-[24px] font-black text-orange-600 tracking-wide">
          QTEENZ
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src="../icon/profileplaceholder.jpeg"
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-[16px] font-semibold">MICHAEL KIMEISON</span>
          </div>

          <ShoppingCart className="w-7 h-7 text-blackhover:text-orange-600 cursor-pointer" />
        </div>
      </nav>
    </>
  );
}

export default NavbarMain;
