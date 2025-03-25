import { useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import TextBox from "@/components/general/TextBox";
import homeIcon from "@/assets/home-icon.svg"

function LoginAdmin() {
  const [password, setPassword] = useState<string>("");
  
  return (
    // Div satu layar
    <div className="p-20 relative h-screen w-screen grid md:grid-cols-12 md:grid-rows-12 sm:grid-cols-4 sm:grid-rows-10 justify-evenly gap-14 bg-primary overflow-auto">
      {/* Div sebelah kiri */}
      <div className="md:col-span-6 md:row-span-12 sm:col-span-full sm:row-span-2 sm:row-start-1 grid md:grid-rows-12 sm:grid-rows-4 relative bg-none">
        <div className="md:row-span-1 flex items-center justify-between gap-2">
          <ImageButton
            imageSrc={homeIcon}
            variant="general"
            size="lg"
            hover="underlineText"
            toPage="/"
          >
            Kembali ke Beranda
          </ImageButton>
        </div>

        <div className="flex flex-col md:row-start-4 md:row-span-5 sm:row-start-3">
          <h1 className="md:text-5xl md:text-left sm:text-3xl sm:text-center text-white font-accent italic">
            Yuk Masuk!
          </h1>
          <h1 className="md:text-[7rem] md:text-left sm:text-[5rem] sm:text-center text-white font-extrabold leading-[100%]">
            HALO ADMIN
          </h1>
          <h1 className="hidden md:block text-[1.75rem] text-white">
            Masukkan kata sandi untuk memverifikasi
          </h1>
        </div>
      </div>

      {/* Div sebelah kanan */}
      <div className="md:col-span-6 md:row-span-12 sm:col-span-full sm:row-start-1 sm:row-span-full p-12 pt-15 md:my-64 sm:my-72 relative flex flex-col justify-evenly gap-1 bg-white rounded-2xl max-h-full max-w-full">
        <TextBox
          label="Kata Sandi"
          value={password}
          onChange={setPassword}
          placeholder="********"
          type="password"
          required={true}
        />

        <Button variant="loginRegister">
          Verifikasi
        </Button>
      </div>
    </div>
  );
}

export default LoginAdmin;
