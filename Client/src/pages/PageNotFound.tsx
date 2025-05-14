import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="bg-primary flex-col min-h-screen flex justify-center items-center gap-2 max-md:gap-0">
      <h1 id="pagenotfoundh1" className="font-bold italic text-white text-5xl">
        Oops!
      </h1>
      <div className="max-md:scale-80">
        <img className="" src="/UnauthorizedPNG.png" alt="" />
      </div>

      <div className="">
        <p className="text-center font-semibold text-2xl text-white max-w-[500px]">
          Halaman tidak ditemukan
        </p>
        <Link to="/">
          <p className="underline text-center font-medium text-white max-md:text-[14px]">
            Kembali ke halaman utama
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
