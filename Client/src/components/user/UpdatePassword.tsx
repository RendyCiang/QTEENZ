import { Toaster } from "react-hot-toast";
import Button from "../general/Button";
import TextBox from "../general/TextBox";
import { updatePasswordSchema } from "@/utils/schema";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useParams } from "react-router-dom";
import { roleStore } from "@/store/roleStore";
import useUpdateUserPassword from "@/hooks/User/useUpdateUserPassword";

export type FormFields = z.infer<typeof updatePasswordSchema>;

const UpdatePassword = () => {
  const { roleId } = roleStore();
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { changeLoading, changePassword } = useUpdateUserPassword();

  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    // Handle form submission logic here
    console.log(data);

    changePassword({
      id: id,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="px-5 py-8 bg-white w-full rounded-lg shadow-md flex flex-col gap-5 max-md:shadow-none">
      <Toaster />
      <p className="text-3xl font-bold max-md:hidden">Atur Kata Sandi</p>
      <p className="max-md:hidden">Lindungi kata sandi anda dari akun anda</p>

      <div className="max-md:hidden w-full bg-gray-300 h-[1px] rounded-3xl "></div>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-5"
      >
        <TextBox
          label="Kata Sandi Sekarang"
          placeholder="********"
          required={true}
          register={register}
          errorMsg={errors.oldPassword?.message}
          name="oldPassword"
          type="password"
        ></TextBox>
        <TextBox
          label="Kata Sandi Baru"
          placeholder="********"
          required={true}
          register={register}
          errorMsg={errors.newPassword?.message}
          name="newPassword"
          type="password"
        ></TextBox>
        <TextBox
          label="Ketik Kembali Kata Sandi Baru"
          placeholder="********"
          required={true}
          register={register}
          errorMsg={errors.confirmPassword?.message}
          name="confirmPassword"
          type="password"
        ></TextBox>
        <Button
          loading={changeLoading}
          type="submit"
          variant="tertiary"
          className="mt-10"
        >
          <div className="w-full flex items-center justify-center gap-2">
            <p>Simpan</p>
          </div>
        </Button>
      </form>

      <Link to={`/forgotpassword/${roleId}`}>
        <p className="underline cursor-pointer text-center">Lupa Kata Sandi?</p>
      </Link>
    </div>
  );
};

export default UpdatePassword;
