import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import buyerWhite from "/PWA/pembeli-white.png";

export default function RegisterBuyer() {
  const navigate = useNavigate();

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div className="max-w-[1440px] w-full mx-auto p-10 flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <Icon
            icon={"material-symbols:home-rounded"}
            className="text-white text-2xl"
          />
          <h3 className="text-white text-sm">Kembali ke Beranda</h3>
        </div>
        <div className="grid grid-cols-2 flex-1">
          <div className="text-white flex flex-col py-8 gap-8 justify-center">
            <div>
              <h4 className="font-accent italic text-2xl">Halooo,</h4>
              <h1 className="font-extrabold text-6xl leading-[100%]">
                SELAMAT <br /> DATANG
              </h1>
              <h3>Daftarkan akun Anda dan akses fitur kami!</h3>
            </div>
            <img className="max-w-[200px]" src={buyerWhite} alt="" />
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
