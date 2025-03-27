import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import buyerWhite from "/PWA/pembeli-white.png";
import TextBox from "@/components/general/TextBox";
import { useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import homeIcon from "@/assets/home-icon.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import useRegisterBuyer from "@/hooks/useRegisterBuyer";
import { set, SubmitHandler, useForm } from "react-hook-form";
import CheckBox from "@/components/general/CheckBox";
import { registerBuyerSchema } from "@/utils/schema";

export type FormFields = z.infer<typeof registerBuyerSchema>;

export default function RegisterBuyer() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRemember, setRemember] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("086648527123");

  // React hook form + zod
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(registerBuyerSchema),
  });

  const { registerBuyer, loginLoading } = useRegisterBuyer();

  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    if (data.pass2 !== data.pass) {
      toast.error("Password tidak sama");
      return;
    }
    registerBuyer({
      role: "Buyer",
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      password: password,
      rememberMe: isRemember,
    });
  };

  const handleSubmitButton = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      identity === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Password tidak sama");
      return;
      // 086648527123
    }

    if (identity.includes("@")) {
      setEmail(identity);
    } else {
      setPhone(identity);
    }

    registerBuyer({
      role: "Buyer",
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      password: password,
      rememberMe: isRemember,
    });
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <Toaster />
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

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="bg-white px-10 py-12 rounded-xl flex flex-col gap-6 justify-center w-full h-fit my-auto max-sm:px-8 max-sm:py-10"
          >
            <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
              <TextBox
                label="Nama Depan"
                value={firstName}
                onChange={setFirstName}
                placeholder="John"
                required={true}
                register={register}
                errorMsg={errors.namaDepan?.message}
                name="namaDepan"
              />
              <TextBox
                label="Nama Belakang"
                value={lastName}
                onChange={setLastName}
                placeholder="Doe"
                type="text"
                required={true}
                register={register}
                errorMsg={errors.namaBlkg?.message}
                name="namaBlkg"
              />
            </div>
            <TextBox
              label="Email / Nomor Telepon"
              value={identity}
              onChange={setIdentity}
              placeholder="johndoe@gmail.com"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.email?.message}
              name="email"
            />
            <TextBox
              label="Kata Sandi"
              value={password}
              onChange={setPassword}
              placeholder="Masukkan password"
              type="password"
              required={true}
              register={register}
              errorMsg={errors.pass?.message}
              name="pass"
            />
            <TextBox
              label="Tulis Ulang Kata Sandi"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Masukkan ulang password"
              type="password"
              required={true}
              register={register}
              errorMsg={errors.pass2?.message}
              name="pass2"
            />
            <CheckBox
              checked={isRemember}
              onChangeFunc={(checked) => setRemember(checked)}
              label="Ingat saya"
            />
            <Button
              type="submit"
              loading={loginLoading}
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
          </form>
        </div>
      </div>
    </div>
  );
}
