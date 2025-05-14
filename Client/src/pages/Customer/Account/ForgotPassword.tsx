import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import TextBox from "@/components/general/TextBox";
import homeIcon from "@/assets/home-icon.svg";
import toast, { Toaster } from "react-hot-toast";
import { forgotPasswordSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import useUpdateUser from "@/hooks/User/useUpdateUser";

export type FormFields = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // React hook form + zod
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { updateUser, updateLoading } = useUpdateUser();

  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password tidak sama");
      return;
    }

    try {
      await updateUser({
        id: id,
        credentials: { password: data.newPassword },
      });
      toast.success("Kata Sandi berhasil diperbarui");
      navigate("/");
    } catch (e) {
      toast.error("Gagal memperbarui kata sandi");
    }
  };
  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <Toaster />
      <div className="max-w-[1440px] w-full mx-auto p-12 flex flex-col flex-1 max-sm:p-8">
        <div className="grid grid-cols-2 flex-1  max-lg:grid-cols-1">
          <div className="text-white flex flex-col gap-8 justify-center max-lg:gap-4 max-sm:gap-2">
            <div className="flex cursor-pointer hover:opacity-80 items-start">
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
                  Wah,
                </h4>
                <h1 className="font-extrabold text-6xl leading-[100%] max-sm:text-5xl">
                  KATA <br /> SANDI <br /> BARU !!
                </h1>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="bg-white px-10 py-12 rounded-xl flex flex-col gap-6 justify-center w-full h-fit my-auto max-sm:px-8 max-sm:py-10"
          >
            <TextBox
              label="Kata Sandi Baru"
              placeholder="********"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.newPassword?.message}
              name="newPassword"
            />
            <TextBox
              label="Tulis UlangKata Sandi Baru"
              placeholder="********"
              type="password"
              required={true}
              register={register}
              errorMsg={errors.confirmPassword?.message}
              name="confirmPassword"
            />
            <Button
              loading={updateLoading}
              variant="loginRegister"
              type="submit"
              className="flex justify-center items-center gap-3"
            >
              Perbarui Kata Sandi
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
