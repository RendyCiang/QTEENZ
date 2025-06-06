import { Icon } from "@iconify/react";
import vendor from "/PWA/vendor.png";
import buyer from "/PWA/pembeli.png";
import { useNavigate } from "react-router-dom";
import ImageButton from "@/components/general/ImageButton";
import homeIcon from "/home-icon.svg";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="bg-primary min-h-screen">
      <div className="max-w-[1440px] mx-auto p-12 max-sm:p-8">
        <div className="grid-cols-2"></div>
        <div className="flex gap-2 items-center">
          <ImageButton
            imageSrc={homeIcon}
            variant="general"
            size="lg"
            hover="underlineText"
            toPage="/"
            textColor="black"
          >
            Kembali ke Beranda
          </ImageButton>
        </div>
        <div className="text-white text-center flex flex-col p-8 max-md:p-0 max-md:mb-3 gap-5">
          <div>
            <h4 className="font-accent italic text-2xl">Halooo,</h4>
            <h1 className="font-extrabold text-6xl max-md:text-5xl">
              SELAMAT <br /> DATANG
            </h1>
          </div>
          <h3>Pilihlah opsi yang menggambarkan diri Anda</h3>
        </div>
        <div className="grid grid-cols-2 gap-7 max-w-[700px] mx-auto max-md:grid-cols-1">
          <div
            onClick={() => {
              navigate("/register/vendor");
            }}
            className="bg-white p-10 rounded-lg cursor-pointer hover:opacity-80 hover:translate-y-[-8px] transition-transform"
          >
            <img src={vendor} alt="" />
          </div>
          <div
            onClick={() => {
              navigate("/register/buyer");
            }}
            className="bg-white p-10 rounded-lg cursor-pointer hover:opacity-80 hover:translate-y-[-8px] transition-transform"
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
