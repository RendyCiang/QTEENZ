import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "@/lib/util";

import useAuth from "@/hooks/useAuth";
import { sidebarMenu } from "@/types/types";

type sidebarModalHeaderType = {
  position: string;
  header: string;
  searchIcon: boolean;
};

const sidebarModalHeader: sidebarModalHeaderType[] = [
  {
    position: "/admin/dasbor",
    header: "Admin Panel",
    searchIcon: false,
  },
  {
    position: "/admin/vendor",
    header: "Manajemen Vendor",
    searchIcon: true,
  },
  {
    position: "/admin/permintaan",
    header: "Permintaan Vendor",
    searchIcon: true,
  },
  {
    position: "/admin/pengguna",
    header: "Daftar Pengguna",
    searchIcon: true,
  },
];

const Sidebar: React.FC<{ props: sidebarMenu[] }> = ({ props }) => {
  const location = useLocation();
  const locationURL = location.pathname;
  const exactPath = locationURL.split("/").pop();
  const [isNavbarClosed, setIsNavbarClosed] = useState<boolean>(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const { logout } = useAuth();

  // Create refs for the sidebar and the hamburger button
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsNavbarClosed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        className={cn(
          `fixed flex flex-col justify-between min-w-[250px] p-6 h-full bg-primary transition-all duration-300 z-50 ${
            isNavbarClosed ? "max-md:left-0" : "max-md:left-[-100%]"
          } `
        )}
      >
        <div>
          <p className="mb-8 text-white font-bold max-md:text-sm text-xl">
            QTEENZ
          </p>

          {props.map((menu) => {
            if (menu.subMenu.length > 0) {
              return (
                <>
                  <div
                    onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                    className={`grid rounded-lg overflow-hidden mb-3 p-1 gap-3 cursor-pointer grid-rows transition-all duration-500  ${
                      isSubMenuOpen
                        ? `max-h-[${menu.subMenu.length * 100}px]`
                        : "max-h-12"
                    }`}
                  >
                    <div className="flex items-center flex-row justify-between hover:opacity-80">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-md">
                          <img
                            className="w-[19px] h-[19px]"
                            src={menu.iconDisabled}
                            alt={menu.menuTitle}
                          />
                        </div>

                        <p className="font-normal text-white">
                          {menu.menuTitle}
                        </p>
                      </div>
                      <img
                        className={`${
                          isSubMenuOpen ? "rotate-90" : "rotate-0"
                        }`}
                        src="/admin/goToSign.svg"
                        alt="view"
                      />
                    </div>

                    <Link to="/admin/analitik/Manajemen/">
                      <div className="flex items-center gap-3 hover:opacity-80 overflow-hidden">
                        <div className="min-h-[40px] w-[5px] bg-white rounded-full ml-5 mr-3"></div>
                        <p className="text-white">Manajemen</p>
                      </div>
                    </Link>
                    <Link to="/admin/analitik/pesanan/">
                      <div className="flex items-center gap-3 overflow-hidden hover:opacity-80">
                        <div className="min-h-[40px] w-[5px] bg-white rounded-full ml-5 mr-3"></div>
                        <p className="text-white">Pesanan</p>
                      </div>
                    </Link>
                  </div>
                </>
              );
            }
            return (
              <>
                {/* Active */}
                <Link to={menu.destination}>
                  {exactPath == menu.menuTitle.toLowerCase() ? (
                    <div className="bg-white py-1 px-2 gap-3 cursor-pointer flex items-center rounded-lg mb-3">
                      <div className="p-3 bg-primary rounded-md">
                        <img src={menu.iconActive} alt={menu.menuTitle} />
                      </div>

                      <p className="font-bold">{menu.menuTitle}</p>
                    </div>
                  ) : (
                    // Disabled
                    <div className="p-1 gap-3 cursor-pointer hover:opacity-80 flex items-center flex-row justify-between rounded-lg mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white rounded-md">
                          <img
                            className="w-[19px] h-[19px]"
                            src={menu.iconDisabled}
                            alt={menu.menuTitle}
                          />
                        </div>

                        <p className="font-normal text-white">
                          {menu.menuTitle}
                        </p>
                      </div>
                      <img src="/admin/goToSign.svg" alt="view" />
                    </div>
                  )}
                </Link>
              </>
            );
          })}
        </div>

        <div
          onClick={logout}
          className="flex gap-4 items-center hover:opacity-80 cursor-pointer"
        >
          <img className="pl-4" src="/admin/keluarIcon.svg" alt="" />
          <p className="text-white text-xl">Keluar</p>
        </div>
      </div>

      {/* Padding menyesuaikan */}
      <div
        className="p-6 hidden max-md:flex z-100 gap-4 items-center "
        // onBlur={() => setIsNavbarClosed(false)}
      >
        <img
          onClick={() => setIsNavbarClosed(true)}
          src="/admin/hamburgerIcon.svg"
          className={`w-[25px] h-[25px]`}
          alt=""
        />

        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-2xl">
            {sidebarModalHeader.find((p) => p.position === locationURL)?.header}
          </h1>

          <img
            className={`w-[30px] h-[32px] ${
              sidebarModalHeader.find((p) => p.position === locationURL)
                ?.searchIcon
                ? "block"
                : "hidden"
            } ${showInputBox ? "hidden" : "block"}`}
            src="/admin/searchIcon.svg"
            alt=""
            onClick={() => setShowInputBox(!showInputBox)}
          />
          <input
            type="text"
            className={`border-2 border-primary py-[2px] px-4 rounded-lg outline-none ${
              showInputBox ? "block" : "hidden"
            } w-40`}
            name=""
            id=""
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
