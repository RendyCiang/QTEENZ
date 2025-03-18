import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="bg-primary flex-col min-h-screen flex justify-center items-center gap-3">
      {/* <h1 id="pagenotfoundh1" className="font-bold italic text-white text-5xl">
        Oops!
      </h1> */}
      <img className="absolute" src="/Unauthorized.png" alt="" />
      <img src="/UnauthorizedHuman.png" alt="" />
      <Link to="/">
        <p className="underline text-center text-white">
          Kembali ke halaman utama
        </p>
      </Link>
      {/* <div>
        <p className="text-center font-semibold text-2xl text-white">
          Halaman tidak ditemukan
        </p>
        <p className="text-center text-white">Kembali ke halaman utama</p>
      </div> */}
    </div>
  );
};

export default PageNotFound;
