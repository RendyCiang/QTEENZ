import { useEffect, useState } from "react";
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
import { Icon } from "@iconify/react/dist/iconify.js";
import { roleStore } from "@/store/roleStore";

export type FormFields = z.infer<typeof loginSchema>;

function Login() {
  const [emailPhoneLogin, setEmailPhoneLogin] = useState<string>("");
  const [isRemember, setRemember] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const { login, loginLoading } = useAuth();
  const { role } = roleStore();
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
    <div className="bg-primary min-h-screen flex flex-col">
      <Toaster />
      <div className="max-w-[1440px] w-full mx-auto p-12 flex flex-col flex-1 max-sm:p-8">
        <div className="flex justify-between items-center">
          <ImageButton
            imageSrc={homeIcon}
            variant="general"
            size="lg"
            hover="underlineText"
            toPage="/"
          >
            Kembali ke Beranda
          </ImageButton>

          <Link to="/login/admin">
            <p className="underline text-xl max-sm:text-md text-white">Admin</p>
          </Link>
        </div>
        <div className="grid grid-cols-2 flex-1 max-lg:flex max-lg:flex-col">
          <div className="text-white flex flex-col gap-8 justify-center max-lg:gap-4 max-sm:gap-2">
            <div className="flex flex-1 flex-col gap-6 justify-center max-lg:items-center max-lg:text-center max-lg:gap-2 max-sm:mb-6">
              <div>
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
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="bg-white px-10 py-12 rounded-xl flex flex-col gap-6 justify-center w-full  my-auto max-lg:my-0 max-sm:px-8 max-sm:py-10"
          >
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
            <div className="">
              <Button
                loading={loginLoading}
                variant="loginRegister"
                type="submit"
              >
                Masuk
              </Button>

              <p className="text-xs place-self-center mt-2">
                Belum punya akun?{" "}
                <Link to="/register">
                  <Button variant="standardWord" size="xsm">
                    Daftar Akun
                  </Button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
