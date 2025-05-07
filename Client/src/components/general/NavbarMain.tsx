import { ShoppingCart, Menu } from "lucide-react";
import React, { useState } from "react";

function NavbarMain() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 font-semibold text-black">
        <li className="text-[16px] cursor-pointer hover:text-orange-600">
          BERANDA
        </li>
        <li className="text-[16px] cursor-pointer hover:text-orange-600">
          ORDER
        </li>
        <li className="text-[16px] cursor-pointer hover:text-orange-600">
          RIWAYAT
        </li>
      </ul>

      {/* Logo */}
      <div className="text-[24px] font-black text-orange-600 tracking-wide">
        QTEENZ
      </div>

      {/* User Info & Cart */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img
            src="../icon/profileplaceholder.jpeg"
            alt="User Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-[16px] font-semibold">MICHAEL KIMEISON</span>
        </div>
        <ShoppingCart className="w-7 h-7 text-black hover:text-orange-600 cursor-pointer" />
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-7 h-7 text-black" />
      </button>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 z-10 md:hidden">
          <ul className="flex flex-col gap-4 font-semibold text-black w-full">
            <li className="text-[16px] cursor-pointer hover:text-orange-600">
              BERANDA
            </li>
            <li className="text-[16px] cursor-pointer hover:text-orange-600">
              ORDER
            </li>
            <li className="text-[16px] cursor-pointer hover:text-orange-600">
              RIWAYAT
            </li>
          </ul>
          <div className="flex items-center gap-2 mt-4">
            <img
              src="../icon/profileplaceholder.jpeg"
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-[16px] font-semibold">MICHAEL KIMEISON</span>
          </div>
          <ShoppingCart className="w-7 h-7 mt-4 text-black hover:text-orange-600 cursor-pointer" />
        </div>
      )}
    </nav>
  );
}

export default NavbarMain;
