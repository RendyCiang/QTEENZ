import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import buyerWhite from "/PWA/pembeli-white.png";
import TextBox from "@/components/general/TextBox";
import { useState } from "react";

export default function RegisterBuyer() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

          <div className="bg-white p-8 rounded-xl flex flex-col gap-6 justify-center">
            <div className="flex gap-4">
              <TextBox
                label="Nama Depan"
                value={firstName}
                onChange={setFirstName}
                placeholder="John"
                type="text"
              />
              <TextBox
                label="Nama Belakang"
                value={lastName}
                onChange={setLastName}
                placeholder="Doe"
                type="text"
              />
            </div>
            <TextBox
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="johndoe@gmail.com"
              type="text"
            />
            <TextBox
              label="Kata Sandi"
              value={password}
              onChange={setPassword}
              placeholder="Masukkan password"
              type="password"
            />
            <TextBox
              label="Tulis Ulang Kata Sandi"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Masukkan ulang password"
              type="password"
            />
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
