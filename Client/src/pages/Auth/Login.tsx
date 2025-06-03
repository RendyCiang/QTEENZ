import { useState } from "react";
import TextBox from "@/components/general/TextBox";
import CheckBox from "@/components/general/CheckBox";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import homeIcon from "/home-icon.svg";
import loginGirl from "/login-girl-icon.svg";
import { loginSchema } from "@/utils/schema";
import { Toaster } from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormFields = z.infer<typeof loginSchema>;

function Login() {
  const [emailPhoneLogin, setEmailPhoneLogin] = useState<string>("");
  const [isRemember, setRemember] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const { login, loginLoading } = useAuth();

  // React hook form + zod
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  // const handleSubmitButton = async () => {
  //   login({ identity: emailPhoneLogin, password, rememberMe: isRemember });
  // };

  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    login({
      identity: data.identity,
      password: data.password,
      rememberMe: isRemember,
    });
  };

  return (
    <div className="p-12 min-h-screen grid grid-cols-2  bg-primary max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:justify-center max-lg:items-center">
      <Toaster />
      {/* Div Sisi Kiri */}
      <div className="flex flex-col justify-between">
        <div className=" flex justify-between mb-8 max-lg::mb-4">
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

          <Button
            variant="underlinedWord"
            textColor="white"
            hoverTextColor="lightGray"
            className="w-auto"
            toPage="/login/admin"
          >
            Admin
          </Button>
        </div>

        <div className="max-lg:text-center ">
          <h4 className="font-accent italic text-2xl text-white items-center">
            Yuk Masuk!
          </h4>
          <h1 className="font-extrabold text-6xl max-md:text-5xl text-white">
            JUMPA <br /> KEMBALI
          </h1>
          <h1 className="hidden md:block md:text-[0.875rem] text-white">
            Masuk ke akun anda untuk mengakses fitur kami
          </h1>
        </div>
        <div></div>
      </div>

      {/* Div Sisi Kanan */}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-7 bg-white rounded-2xl px-10 py-12  max-w-full"
      >
        <div className="flex flex-col gap-2">
          {/* <div className="flex flex-row gap-1">
            <h1 className="font-medium">Pilih salah satu</h1>
            <h1 className="text-red-500"> *</h1>
          </div> */}
          {/* 
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
          </div> */}
        </div>

        <TextBox
          label="Email/No Telepon"
          value={emailPhoneLogin}
          onChange={setEmailPhoneLogin}
          placeholder="John Doe"
          required={true}
          register={register}
          errorMsg={errors.identity?.message}
          name="identity"
        />

        <TextBox
          label="Kata Sandi"
          value={password}
          onChange={setPassword}
          placeholder="********"
          type="password"
          register={register}
          required={true}
          errorMsg={errors.password?.message}
          name="password"
        />

        {/* <p className="text-primary text-xl">{error ? error : ""}</p> */}

        <div className="flex flex-col gap-3">
          {/* <Button variant="underlinedWord" size="xsm">
            Lupa Kata Sandi?
          </Button> */}
          <CheckBox
            checked={isRemember}
            onChangeFunc={(checked) => setRemember(checked)}
            label="Ingat saya"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button loading={loginLoading} variant="loginRegister" type="submit">
            Masuk
          </Button>

          <p className="text-xs place-self-center">
            Belum punya akun?{" "}
            <Link to="/register">
              <Button variant="standardWord" size="xsm">
                Daftar Akun
              </Button>
            </Link>
          </p>
        </div>

        <img
          src={loginGirl}
          alt="Login Girl Icon"
          className="w-52 h-52  place-self-end sm:hidden md:block"
        />
      </form>
    </div>
  );
}

export default Login;
