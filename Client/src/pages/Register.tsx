import { Icon } from "@iconify/react";
import vendor from "/PWA/vendor.png";
import buyer from "/PWA/pembeli.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="bg-primary min-h-screen">
      <div className="max-w-[1440px] mx-auto p-10">
        <div className="grid-cols-2"></div>
        <div className="flex gap-2 items-center">
          <Icon
            icon={"material-symbols:home-rounded"}
            className="text-white text-2xl"
          />
          <h3 className="text-white text-sm">Kembali ke Beranda</h3>
        </div>
        <div className="text-white text-center flex flex-col p-8 gap-4">
          <div>
            <h4 className="font-accent italic text-2xl">Halooo,</h4>
            <h1 className="font-extrabold text-6xl">
              SELAMAT <br /> DATANG
            </h1>
          </div>
          <h3>Pilihlah opsi yang menggambarkan diri Anda</h3>
        </div>
        <div className="grid grid-cols-2 gap-7 max-w-[700px] mx-auto">
          <div
            onClick={() => {
              navigate("/register/vendor");
            }}
            className="bg-white p-10 rounded-lg cursor-pointer hover:translate-y-[-8px] transition-transform"
          >
            <img src={vendor} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/register/buyer");
            }}
            className="bg-white p-10 rounded-lg cursor-pointer hover:translate-y-[-8px] transition-transform"
          >
            <img src={buyer} alt="" />
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-sm text-center text-white">
            Sudah punya akun?{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
              className="underline cursor-pointer hover:opacity-80 transition"
            >
              Masuk
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
