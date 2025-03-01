import { useState } from "react";
import RadioButton from "@/components/general/RadioButton";
import TextBox from "@/components/general/TextBox";
import CheckBox from "@/components/general/CheckBox";
import Button from "@/components/general/Button";
import homeIcon from "@/assets/home-icon.svg";
import loginGirl from "@/assets/login-girl-icon.svg";

function Login() {
  const [radioOption, setRadioOption] = useState<string>("");
  const [emailPhoneLogin, setEmailPhoneLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (

    // Div satu layar
    <div className="p-14 h-screen w-screen grid grid-cols-2 justify-evenly gap-14 bg-primary">
      
      {/* Div Sisi Kiri */}
      <div className="relative flex flex-col bg-none justify-center">
        <div className="absolute top-0 flex items-center gap-2">
          <img src={homeIcon} alt="Home Icon Image" />
          <h1 className="text-white">Kembali ke Beranda</h1>
        </div>

        <div className="text-white">
          <h1 className="text-4xl font-accent">Yuk Masuk!</h1>
          <h1 className="text-[96px] font-extrabold leading-[100%]">
            JUMPA KEMBALI
          </h1>
          <h1 className="text-4xl">
            Masuk ke akun anda untuk mengakses fitur kami
          </h1>
        </div>
      </div>


      {/* Div Sisi Kanan */}
      <div className="flex flex-col gap-7 bg-white rounded-2xl p-10 ">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Pilih salah satu</h1>
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

        <div className="flex flex-col gap-2">
          <TextBox
            label="Email/No Telepon"
            value={emailPhoneLogin}
            onChange={setEmailPhoneLogin}
            placeholder="john doe"
          />
          <TextBox
            label="Kata Sandi"
            value={password}
            onChange={setPassword}
            placeholder="********"
            type="password"
          />

          <div className="flex flex-col gap-1">
            <Button variant="underlinedWord" size="xsm">
              Lupa Kata Sandi?
            </Button>
            <CheckBox label="Ingat saya" />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button variant="loginRegister">Masuk</Button>
          <p className="text-xs place-self-center">
            Belum punya akun? <Button variant="standardWord" size="xsm">Daftar Akun</Button>
          </p>
        </div>

        <img src={loginGirl} alt="Login Girl Icon" className="w-32 h-32 place-self-end" />
      </div>
    </div>
  );
}

export default Login;
