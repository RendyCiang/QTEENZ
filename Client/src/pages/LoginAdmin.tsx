import { useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import TextBox from "@/components/general/TextBox";
import homeIcon from "@/assets/home-icon.svg"

function LoginAdmin() {
  const [password, setPassword] = useState<string>("");
  
  return (
    // Div satu layar
    <div className="p-20 relative h-screen w-screen grid grid-cols-2 justify-evenly gap-14 bg-primary overflow-auto">
      {/* Div sebelah kiri */}
      <div className="relative flex flex-col bg-none justify-center max-h-full max-w-full">
        <div className="absolute top-0 w-full flex items-center justify-between gap-2">
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

        <div className="text-white">
          <h1 className="text-5xl font-accent italic">Yuk Masuk!</h1>
          <h1 className="text-[7rem] font-extrabold leading-[100%]">
            HALO ADMIN
          </h1>
          <h1 className="text-[1.75rem]">
            Masukkan kata sandi untuk memverifikasi
          </h1>
        </div>
      </div>

      {/* Div sebelah kanan */}
      <div className="flex flex-col gap-7 bg-white rounded-2xl p-12 pt-15 max-h-full max-w-full my-64 justify-center">
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
