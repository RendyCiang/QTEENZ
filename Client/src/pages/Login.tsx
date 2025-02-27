import { useState } from "react";
import RadioButton from "@/components/general/RadioButton";
import TextBox from "@/components/general/TextBox";
import CheckBox from "@/components/general/CheckBox";

function Login() {
  const [radioOption, setRadioOption] = useState<string>("");
  const [emailPhoneLogin, setEmailPhoneLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="p-14 h-screen w-screen grid grid-cols-2 justify-evenly gap-14" style={{ backgroundColor: "#EF2007" }}>
      <div className="flex flex-col bg-blue-400">
        <div>

        </div>

        <div>
          <h1 className="text-4xl">Yuk Masuk</h1>
          <h1 className="text-8xl">Jumpa Kembali</h1>
          <h1 className="text-4xl">Masuk ke akun anda untuk mengakses fitur kami</h1>
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
          <CheckBox label="Agree to the terms and conditions" />
        </div>
      </div>
    </div>
  );
}

export default Login;
