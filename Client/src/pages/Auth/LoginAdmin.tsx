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
      <div className="p-12 relative h-screen max-w-screen grid md:grid-cols-12 md:grid-rows-12 sm:grid-cols-4 sm:grid-rows-10 justify-evenly  bg-primary overflow-auto gap-14 max-md:gap-6">
        {/* Div sebelah kiri */}
        <div className="md:col-span-6 md:row-span-12 md:col-start-1  sm:col-span-full sm:row-span-2 grid md:grid-rows-12 sm:grid-rows-4 relative bg-none">
          <div className="md:row-span-1 flex justify-between">
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

          <div className="max-md:text-center md:row-start-6 md:row-span-6 md:col-span-6 ">
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
        <div className="md:col-span-6 md:row-span-5 md:row-start-5 md:col-start-7">
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className=" p-12 pt-15  relative flex flex-col justify-evenly gap-1 bg-white rounded-2xl max-h-full max-w-full"
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

        {/* Div sebelah kanan */}
      </div>
    </>
  );
}

export default LoginAdmin;
