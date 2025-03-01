import { useState } from "react";
import RadioButton from "@/components/general/RadioButton";
import TextBox from "@/components/general/TextBox";
import CheckBox from "@/components/general/CheckBox";
import Button from "@/components/general/Button";
import homeIcon from "@/assets/home-icon.svg";

function Login() {
  const [radioOption, setRadioOption] = useState<string>("");
  const [emailPhoneLogin, setEmailPhoneLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="p-14 h-screen w-screen grid grid-cols-2 justify-evenly gap-14 bg-primary">
      <div className="flex flex-col bg-none">
        <div className="flex items-center gap-2">
          <img src={homeIcon} alt="Home Icon Image" />
          <h1 className="text-white">Kembali ke Beranda</h1>
        </div>

        <div className="text-white">
          <h1 className="text-4xl font-accent">Yuk Masuk</h1>
          <h1 className="text-[96px] font-extrabold leading-[100%]">
            JUMPA KEMBALI
          </h1>
          <h1 className="text-4xl">
            Masuk ke akun anda untuk mengakses fitur kami
          </h1>
        </div>
      </div>

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
        </div>

        <div>
          <Button variant="underlinedWord" size="sm">
            Lupa Kata Sandi?
          </Button>
        </div>

        <div>
          <CheckBox label="Ingat saya" />
        </div>

        <div>
          <Button variant="loginRegister">Masuk</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
