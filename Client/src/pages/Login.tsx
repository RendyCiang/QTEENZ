import { useState } from "react";
import RadioButton from "@/components/general/RadioButton";
import TextBox from "@/components/general/TextBox";
import CheckBox from "@/components/general/CheckBox";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import homeIcon from "@/assets/home-icon.svg";
import loginGirl from "@/assets/login-girl-icon.svg";

function Login() {
  const [radioOption, setRadioOption] = useState<string>("");
  const [emailPhoneLogin, setEmailPhoneLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    // Div satu layar
    <div className="p-20 relative h-screen w-screen grid md:grid-cols-12 md:grid-rows-12 sm:grid-cols-4 sm:grid-rows-10 justify-evenly gap-14 bg-primary overflow-auto">
      {/* Div Sisi Kiri */}
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

          <Button
            variant="underlinedWord"
            textColor="white"
            hoverTextColor="lightGray"
            className="w-auto"
            toPage="/loginAdmin"
          >
            Admin
          </Button>
        </div>

        <div className="flex flex-col md:row-start-4 md:row-span-5 sm:row-start-2">
          <h1 className="md:text-5xl md:text-left sm:text-3xl sm:text-center text-white font-accent italic">
            Yuk Masuk!
          </h1>
          <h1 className="md:text-[7rem] md:text-left sm:text-[4rem] sm:text-center text-white font-extrabold leading-[100%]">
            JUMPA KEMBALI
          </h1>
          <h1 className="hidden md:block md:text-[1.75rem] text-white">
            Masuk ke akun anda untuk mengakses fitur kami
          </h1>
        </div>
      </div>

      {/* Div Sisi Kanan */}
      <div className="md:col-span-6 md:row-span-12 sm:col-span-full sm:row-start-4 sm:row-span-8 relative flex flex-col gap-7 bg-white rounded-2xl p-12 pt-15 max-h-full max-w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <h1 className="font-medium">Pilih salah satu</h1>
            <h1 className="text-red-500"> *</h1>
          </div>

          <div className="flex flex-row justify-start gap-20">
            <RadioButton
              label="Vendor"
              value="Vendor"
              name="Vendor"
              checked={radioOption === "Vendor"}
              onChange={setRadioOption}
            />
            <RadioButton
              label="Pembeli"
              value="Pembeli"
              name="Pembeli"
              checked={radioOption === "Pembeli"}
              onChange={setRadioOption}
            />
          </div>
        </div>

        <TextBox
          label="Email/No Telepon"
          value={emailPhoneLogin}
          onChange={setEmailPhoneLogin}
          placeholder="john doe"
          required={true}
        />
        <TextBox
          label="Kata Sandi"
          value={password}
          onChange={setPassword}
          placeholder="********"
          type="password"
          required={true}
        />

        <div className="flex flex-col gap-3">
          <Button variant="underlinedWord" size="xsm">
            Lupa Kata Sandi?
          </Button>
          <CheckBox label="Ingat saya" />
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="loginRegister">
            Masuk
          </Button>

          <p className="text-xs place-self-center">
            Belum punya akun?{" "}
            <Button variant="standardWord" size="xsm">
              Daftar Akun
            </Button>
          </p>
        </div>

        <img
          src={loginGirl}
          alt="Login Girl Icon"
          className="w-52 h-52 place-self-end sm:hidden md:block"
        />
      </div>
    </div>
  );
}

export default Login;
