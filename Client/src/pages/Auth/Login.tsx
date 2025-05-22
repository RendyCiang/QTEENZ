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
    <div className="p-12 relative min-h-screen w-full grid md:grid-cols-12 md:grid-rows-12 sm:grid-cols-4 sm:grid-rows-10 justify-evenly gap-14 bg-primary overflow-auto">
      <Toaster />
      {/* Div Sisi Kiri */}
      <div className="md:col-span-6 md:row-span-12 sm:col-span-full sm:row-span-2 sm:row-start-1 grid md:grid-rows-12 sm:grid-rows-4 relative bg-none">
        <div className="md:row-span-1 flex flex-row items-start justify-between">
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
            toPage="/loginAdmin"
          >
            Admin
          </Button>
        </div>

        <div className="flex flex-col md:row-start-4 md:row-span-5 sm:row-start-2">
          <h1 className="md:text-2xl md:text-left sm:text-3xl sm:text-center text-white font-accent italic">
            Yuk Masuk!
          </h1>
          <h1 className="md:text-6xl md:text-left sm:text-[4rem] sm:text-center text-white font-extrabold leading-[100%]">
            JUMPA <br />
            KEMBALI
          </h1>
          <h1 className="hidden md:block md:text-[0.875rem] text-white">
            Masuk ke akun anda untuk mengakses fitur kami
          </h1>
        </div>
      </div>

      {/* Div Sisi Kanan */}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="md:col-span-6 md:row-span-12 sm:col-span-full sm:row-start-4 sm:row-span-8 relative flex flex-col gap-7 bg-white rounded-2xl p-12 pt-15 max-h-full max-w-full"
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
          <Button variant="underlinedWord" size="xsm">
            Lupa Kata Sandi?
          </Button>
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
