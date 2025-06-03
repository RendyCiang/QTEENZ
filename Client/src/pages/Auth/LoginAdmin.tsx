import { useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import TextBox from "@/components/general/TextBox";
import homeIcon from "/home-icon.svg";
import useAuth from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const loginSchemaAdmin = z.object({
  password: z.string().nonempty("Password is required"),
});

export type FormFields = z.infer<typeof loginSchemaAdmin>;
function LoginAdmin() {
  const [password, setPassword] = useState<string>("");

  const { login, loginLoading } = useAuth();

  // const handleSubmit = () => {
  //   login({ identity: "admin@gmail.com", password, rememberMe: true });
  // };

  // React hook form + zod
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchemaAdmin),
  });

  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    login({
      identity: "admin@gmail.com",
      password: data.password,
      rememberMe: true,
    });
  };

  return (
    <>
      <Toaster />
      {/* // Div satu layar */}
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
          </div>
          <div className="grid grid-cols-2 flex-1 max-lg:flex max-lg:flex-col">
            <div className="text-white flex flex-col gap-8 justify-center max-lg:gap-4 max-sm:gap-2">
              <div className="flex flex-1 flex-col gap-6 justify-center max-lg:items-center max-lg:text-center max-lg:gap-2 max-sm:mb-6">
                <div>
                  <h4 className="font-accent italic text-2xl text-white">
                    Yuk Masuk!
                  </h4>
                  <h1 className="font-extrabold text-6xl max-md:text-5xl text-white">
                    HALO <br /> ADMIN
                  </h1>
                  <h1 className="hidden md:block md:text-[0.875rem] text-white">
                    Masukkan kata sandi untuk memverifikasi
                  </h1>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="bg-white px-10 py-12 rounded-xl flex flex-col gap-6 justify-center w-full h-fit my-auto max-sm:my-0 max-sm:px-8 max-sm:py-10"
            >
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

              <Button
                type="submit"
                loading={loginLoading}
                variant="loginRegister"
              >
                Verifikasi
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAdmin;
