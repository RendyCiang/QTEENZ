import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import sellerWhite from "/PWA/vendor-white.png";
import TextBox from "@/components/general/TextBox";
import { useEffect, useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import homeIcon from "@/assets/home-icon.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import useRegisterBuyer from "@/hooks/useRegisterBuyer";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckBox from "@/components/general/CheckBox";
import { registerVendorSchema } from "@/utils/schema";
import InputImage from "@/components/general/InputImage";
import InputFile from "@/components/general/InputFile";
import useRegisterVendor from "@/hooks/useRegisterVendor";
import axios from "axios";
import useUploadFile from "@/hooks/useUploadFile";

// import templateProposalUsaha from "/Misc/tempFile.pdf";

export type FormFields = z.infer<typeof registerVendorSchema>;

export default function RegisterVendor() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isRemember, setRemember] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("086648527123");

  // Files
  const [imageKTP, setImageKTP] = useState<File | null>(null);
  const [proposalUsaha, setProposalUsaha] = useState<File | null>(null);
  const [suratPermohonan, setSuratPermohonan] = useState<File | null>(null);

  const [errorImgKTP, setErrorImgKTP] = useState<string>("");
  const [errorProposalUsaha, setErrorProposalUsaha] = useState<string>("");
  const [errorSuratPermohonan, setErrorSuratPermohonan] = useState<string>("");

  // React hook form + zod
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(registerVendorSchema),
  });

  const { loginLoading, registerVendor } = useRegisterVendor();
  const { uploadFile } = useUploadFile();

  const handleSubmitForm: SubmitHandler<FormFields> = async (data, e) => {
    e?.preventDefault();

    if (!imageKTP) {
      setErrorImgKTP("Gambar KTP harus diisi.");
      return;
    }
    if (!proposalUsaha) {
      setErrorProposalUsaha("Proposal Usaha harus diisi.");
      return;
    }
    if (!suratPermohonan) {
      setErrorSuratPermohonan("Surat Permohonan harus diisi.");
      return;
    }

    try {
      const imgKTPURL = await uploadFile({
        file: imageKTP,
        folderDestination: "Vendor",
      });
      const proposalUsahaURL = await uploadFile({
        file: proposalUsaha,
        folderDestination: "Vendor",
      });
      const suratPermohonanURL = await uploadFile({
        file: suratPermohonan,
        folderDestination: "Vendor",
      });
      console.log(imgKTPURL, proposalUsahaURL, suratPermohonanURL);

      // registerVendor({
      //   role: "Seller",
      //   name: data.namaPemilik,
      //   email: data.email,
      //   phone: data.nomorTelp,
      //   password: data.pass,
      //   rememberMe: isRemember,
      //   bank: data.bankPemilikRekening,
      //   bank_account: data.nomorRekening,
      //   location: data.lokasi,
      //   open_hour: data.jamBuka,
      //   close_hour: data.jamTutup,
      //   status: "Pending",
      // });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message?.[0] || "Login Gagal";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="bg-primary min-h-screen  flex flex-col">
      <Toaster />
      <div className="max-w-[1440px]  w-full mx-auto p-12 flex flex-col flex-1 max-sm:p-8">
        <div className="grid grid-cols-2 flex-1 items-center max-lg:grid-cols-1">
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
                  Daftarkan gerai Anda dan akses fitur kami!
                </h3>
              </div>
              <img
                className="max-w-[200px] max-lg:hidden"
                src={sellerWhite}
                alt=""
              />
            </div>
          </div>

          {/* Vendor Register Form */}
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="bg-white px-10 py-12 rounded-xl w-full max-h-[70vh] overflow-auto flex flex-col gap-6 max-sm:px-8 max-sm:py-10"
          >
            <TextBox
              label="Nama Gerai"
              value={identity}
              onChange={setIdentity}
              placeholder="Bakmie Efatta"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.namaGerai?.message}
              name="namaGerai"
            />

            <TextBox
              label="Nama Pemilik"
              value={identity}
              onChange={setIdentity}
              placeholder="Jacqueline Audrey"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.namaPemilik?.message}
              name="namaPemilik"
            />

            <TextBox
              label="Email"
              value={identity}
              onChange={setIdentity}
              placeholder="jacqueline.iman@binus.ac.id"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.email?.message}
              name="email"
            />

            <TextBox
              label="No.Telepon"
              value={identity}
              onChange={setIdentity}
              placeholder="0822 1234 5678"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.nomorTelp?.message}
              name="nomorTelp"
            />

            <TextBox
              label="Lokasi"
              value={identity}
              onChange={setIdentity}
              placeholder="Kantin Bawah"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.lokasi?.message}
              name="lokasi"
            />

            <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
              <TextBox
                label="Jam Buka"
                value={firstName}
                onChange={setFirstName}
                placeholder="09.00"
                required={true}
                register={register}
                errorMsg={errors.jamBuka?.message}
                name="jamBuka"
              />
              <TextBox
                label="Jam Tutup"
                value={lastName}
                onChange={setLastName}
                placeholder="17.00"
                type="text"
                required={true}
                register={register}
                errorMsg={errors.jamTutup?.message}
                name="jamTutup"
              />
            </div>
            <TextBox
              label="No. Rekening"
              value={identity}
              onChange={setIdentity}
              placeholder="133018213421"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.nomorRekening?.message}
              name="nomorRekening"
            />

            <TextBox
              label="Bank Pemilik Rekening"
              value={identity}
              onChange={setIdentity}
              placeholder="Central Bank Asia"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.bankPemilikRekening?.message}
              name="bankPemilikRekening"
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

            {/* image ktp */}
            <InputImage
              name="imgKTP"
              label="KTP"
              value={imageKTP}
              onChange={setImageKTP}
              required={true}
              errorMsg={errorImgKTP}
            />
            <InputFile
              name=""
              label="Proposal Usaha"
              value={proposalUsaha}
              onChange={setProposalUsaha}
              required={true}
              linkTemplate="/Misc/tempFile.pdf"
              errorMsg={errorProposalUsaha}
            />

            <InputFile
              name=""
              label="Surat Permohonan Kerja Sama"
              value={suratPermohonan}
              onChange={setSuratPermohonan}
              required={true}
              linkTemplate="/Misc/tempFile.pdf"
              errorMsg={errorSuratPermohonan}
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
                  className="underline cursor-pointer hover:opacity-80 hover:opacity-80 transition text-primary"
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
