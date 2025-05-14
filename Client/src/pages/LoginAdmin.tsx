import { useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import TextBox from "@/components/general/TextBox";
import homeIcon from "@/assets/home-icon.svg";
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
      <div className="p-12 relative h-screen max-w-screen grid md:grid-cols-12 md:grid-rows-12 sm:grid-cols-4 sm:grid-rows-10 justify-evenly  bg-primary overflow-auto">
        {/* Div sebelah kiri */}
        <div className="md:col-span-6 md:row-span-12 sm:col-span-full sm:row-span-2 sm:row-start-1 grid md:grid-rows-12 sm:grid-rows-4 relative bg-none">
          <div className="md:row-span-1 flex  justify-between">
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

          <div className="flex flex-col md:row-start-5 md:row-span-5 sm:row-start-3">
            <h1 className="md:text-2xl md:text-left sm:text-3xl sm:text-center text-white font-accent italic">
              Yuk Masuk!
            </h1>
            <h1 className="md:text-6xl md:text-left sm:text-[5rem] sm:text-center text-white font-extrabold leading-[100%]">
              HALO <br />
              ADMIN
            </h1>
            <h1 className="hidden md:block md:text-[0.875rem] text-white">
              Masukkan kata sandi untuk memverifikasi
            </h1>
          </div>
        </div>
        <div className="md:col-span-6 md:row-span-12 sm:col-span-full sm:row-start-1 sm:row-span-full">
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className=" p-12 pt-15 md:my-64 sm:my-72 relative flex flex-col justify-evenly gap-1 bg-white rounded-2xl max-h-full max-w-full"
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
