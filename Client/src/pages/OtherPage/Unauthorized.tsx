import { roleStore } from "@/store/roleStore";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const { role, loadRole } = roleStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadRole();
  }, []);

  const clickHandle = () => {
    if (role === "Admin") {
      navigate("/admin/dasbor");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-primary flex-col min-h-screen flex justify-center items-center gap-3">
      <h1 id="pagenotfoundh1" className="font-bold italic text-white text-5xl">
        Oops!
      </h1>
      <h1 className="font-bold text-8xl text-white">403</h1>
      <div>
        <p className="text-center font-semibold text-2xl text-white max-w-[500px]">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <p
          onClick={clickHandle}
          className="cursor-pointer text-center underline text-white"
        >
          Kembali ke halaman utama
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
