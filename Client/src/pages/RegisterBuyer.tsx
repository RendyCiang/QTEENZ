import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import buyerWhite from "/PWA/pembeli-white.png";
import TextBox from "@/components/general/TextBox";
import { useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import homeIcon from "@/assets/home-icon.svg";

export default function RegisterBuyer() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <div className="max-w-[1440px] w-full mx-auto p-12 flex flex-col flex-1 max-sm:p-8">
        <div className="grid grid-cols-2 flex-1  max-lg:grid-cols-1">
          <div className="text-white flex flex-col gap-8 justify-center max-lg:gap-4 max-sm:gap-2">
            <div className="flex items-start">
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
            <div className="flex flex-1 flex-col gap-6 justify-center max-lg:items-center max-lg:text-center max-lg:gap-2 max-sm:mb-6">
              <div>
                <h4 className="font-accent italic text-2xl max-sm:text-xl">
                  Halooo,
                </h4>
                <h1 className="font-extrabold text-6xl leading-[100%] max-sm:text-5xl">
                  SELAMAT <br /> DATANG
                </h1>
                <h3 className="max-sm: text-[14px]">
                  Daftarkan akun Anda dan akses fitur kami!
                </h3>
              </div>
              <img
                className="max-w-[200px] max-lg:hidden"
                src={buyerWhite}
                alt=""
              />
            </div>
          </div>

          <div className="bg-white px-10 py-12 rounded-xl flex flex-col gap-6 justify-center w-full h-fit my-auto max-sm:px-8 max-sm:py-10">
            <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
              <TextBox
                label="Nama Depan"
                value={firstName}
                onChange={setFirstName}
                placeholder="John"
                required
              />
              <TextBox
                label="Nama Belakang"
                value={lastName}
                onChange={setLastName}
                placeholder="Doe"
                type="text"
                required
              />
            </div>
            <TextBox
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="johndoe@gmail.com"
              type="text"
              required
            />
            <TextBox
              label="Kata Sandi"
              value={password}
              onChange={setPassword}
              placeholder="Masukkan password"
              type="password"
              required
            />
            <TextBox
              label="Tulis Ulang Kata Sandi"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Masukkan ulang password"
              type="password"
              required
            />
            <Button
              variant="loginRegister"
              className="flex justify-center items-center gap-3"
            >
              Daftar
              <Icon
                icon={"heroicons-solid:arrow-right"}
                className="text-white text-base"
                style={{ transform: "rotate(-45deg)" }}
              />
            </Button>
            <div className="">
              <h4 className="text-sm text-center text-gray">
                Sudah punya akun?{" "}
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="underline cursor-pointer hover:opacity-80 transition text-primary"
                >
                  Masuk
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
