import { roleStore } from "@/store/roleStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ShoppingCart, Menu } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavbarMain() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { role, roleId } = roleStore();
  return (
    <nav className="bg-background">
      <div className="text-black px-8 lg:px-12 py-6 grid grid-cols-3 items-center text-s font-semibold">
        <div className="hidden lg:flex gap-12 col-span-1">
          <h1
            className={`border-b-2 ${
              location.pathname === "/"
                ? "text-primary font-bold border-none"
                : "border-transparent hover:border-primary"
            } transition-all duration-300 cursor-pointer}"`}
          >
            <Link to={`/`}>BERANDA</Link>
          </h1>
          <h1
            className={`border-b-2 ${
              location.pathname === "/customer/food"
                ? "text-primary font-bold border-none"
                : "border-transparent hover:border-primary"
            } transition-all duration-300 cursor-pointer}"`}
          >
            <Link to={`/customer/food`}>ORDER</Link>
          </h1>
          <h1
            className={`border-b-2 ${
              location.pathname === "/customer/history"
                ? "text-primary font-bold border-none"
                : "border-transparent hover:border-primary"
            } transition-all duration-300 cursor-pointer}"`}
          >
            <Link to={`/customer/history`}>RIWAYAT</Link>
          </h1>
        </div>
        <div className="flex gap-0 col-span-1 sm:gap-12 lg:gap-0 justify-center items-center">
          <div>
            <Icon
              icon={menuOpen ? "material-symbols:close" : "ri:menu-2-fill"}
              className="hidden sm:flex lg:hidden text-black text-3xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
          <h1 className="text-primary text-lg sm:text-2xl font-extrabold">
            <Link to="/">QTEENZ</Link>
          </h1>
        </div>
        <div className="hidden lg:flex justify-end items-center gap-6 sm:gap-10 col-span-1">
          {role === "Buyer" && (
            <>
              <Link to={`/profile/${roleId}`}>
                <Icon
                  icon={"material-symbols:person-rounded"}
                  className="text-4xl"
                />
              </Link>
              <Link to="/customer/shoppingcart">
                <div className="relative cursor-pointer group">
                  <Icon
                    icon="fluent:cart-24-filled"
                    className="w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] mt-0.5 sm:mt-0 p-2 text-black group-hover:text-primary transition-colors duration-200"
                  />
                  <p className="p-[2px] absolute flex right-0 top-0 text-xs w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-primary  text-white text-center justify-center items-center transition-colors duration-200">
                    50
                  </p>
                </div>
              </Link>
              <Link to="/customer/notification">
                <div className="relative cursor-pointer group">
                  <Icon
                    icon="ion:notifcations"
                    className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] pt-3 text-black group-hover:text-primary transition-colors duration-200"
                  />
                  <p className="p-[2px] absolute flex right-0 top-0 text-xs w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-primary text-white text-center justify-center items-center transition-colors duration-200">
                    20
                  </p>
                </div>
              </Link>
            </>
          )}

          {role === null && (
            <>
              <div className="hidden sm:flex justify-center items-center gap-1 hover:text-primary transition-all duration-300 cursor-pointer">
                <Icon
                  icon={"material-symbols:person-rounded"}
                  className="text-4xl"
                />
                <Link to={`/login`}>MASUK</Link>
              </div>
            </>
          )}

          {role === "Admin" && (
            <>
              <Link to={`/admin/dasbor`}>
                <Icon
                  icon={"material-symbols:person-rounded"}
                  className="text-4xl"
                />
              </Link>
            </>
          )}

          {role === "Seller" && (
            <>
              <Link to={`/vendor/dasbor/${roleId}`}>
                <Icon
                  icon={"material-symbols:person-rounded"}
                  className="text-4xl"
                />
              </Link>
            </>
          )}
          {/* {role !== "Admin" ? (
            <>
              <Link to={`/profile/${roleId}`}>
                <Icon
                  icon={"material-symbols:person-rounded"}
                  className="text-4xl"
                />
              </Link>
              <Link to="/customer/shoppingcart">
                <div className="relative cursor-pointer group">
                  <Icon
                    icon="fluent:cart-24-filled"
                    className="w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] mt-0.5 sm:mt-0 p-2 text-black group-hover:text-primary transition-colors duration-200"
                  />
                  <p className="p-[2px] absolute flex right-0 top-0 text-xs w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-primary  text-white text-center justify-center items-center transition-colors duration-200">
                    50
                  </p>
                </div>
              </Link>
              <Link to="/customer/notification">
                <div className="relative cursor-pointer group">
                  <Icon
                    icon="ion:notifcations"
                    className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] pt-3 text-black group-hover:text-primary transition-colors duration-200"
                  />
                  <p className="p-[2px] absolute flex right-0 top-0 text-xs w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-primary text-white text-center justify-center items-center transition-colors duration-200">
                    20
                  </p>
                </div>
              </Link>
            </>
          ) : role === null ? (
            <>
              <div className="hidden sm:flex justify-center items-center gap-1 hover:text-primary transition-all duration-300 cursor-pointer">
                <Icon
                  icon={"material-symbols:person-rounded"}
                  className="text-4xl"
                />
                <Link to={`/login`}>MASUK</Link>
              </div>
            </>
          ) : (
            <>
              {" "}
              <Link to={`/admin/dasbor`}>
                <Icon
                  icon={"material-symbols:person-rounded"}
                  className="text-4xl"
                />
              </Link>
            </>
          )} */}
        </div>
      </div>
      {menuOpen && (
        <div
          className="lg:hidden flex flex-col gap-10 px-10 py-12 bg-background absolute min-w-[30%] mx-8 rounded-2xl"
          style={{ boxShadow: "0px 4px 20px rgba(250, 242, 235, 0.80)" }}
        >
          <h1 className="font-medium text-lg w-fit text-primary">
            <Link to={`/`}>BERANDA</Link>
          </h1>
          <h1 className="font-medium text-lg w-fit">
            <Link to={`/customer/food`}>ORDER</Link>
          </h1>
          <h1 className="font-medium text-lg w-fit">
            <Link to={``}>RIWAYAT</Link>
          </h1>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-100 flex justify-around items-center pt-3 pb-4 sm:hidden z-50">
        <Link to={`/`}>
          <button
            className={`flex flex-col cursor-pointer items-center text-xs text-gray-600 ${
              location.pathname === "/" ? "text-primary" : "text-gray-600"
            }`}
          >
            <Icon icon="material-symbols:home-rounded" className="text-2xl" />
            <span>Beranda</span>
          </button>
        </Link>
        <Link to={`/customer/food`}>
          <button
            className={`flex flex-col items-center cursor-pointer text-xs text-gray-600 ${
              location.pathname === "/customer/food"
                ? "text-primary"
                : "text-gray-600"
            }`}
          >
            <Icon icon="fluent:food-24-filled" className="text-2xl" />
            <span>Order</span>
          </button>
        </Link>
        <Link to={`/customer/history`}>
          <button
            className={`flex flex-col items-center text-xs text-gray-600 ${
              location.pathname === "/customer/history"
                ? "text-primary"
                : "text-gray-600"
            }`}
          >
            <Icon
              icon="material-symbols:history-rounded"
              className="text-2xl"
            />
            <span>Riwayat</span>
          </button>
        </Link>
        <Link to={`/profile/${roleId}`}>
          <button
            className={`flex flex-col items-center text-xs text-gray-600 ${
              location.pathname === "/customer/food"
                ? "text-primary"
                : "text-gray-600"
            }`}
          >
            <Icon icon="material-symbols:person-rounded" className="text-2xl" />
            <span>Profil</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavbarMain;
