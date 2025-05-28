import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import sellerWhite from "/PWA/vendor-white.png";
import TextBox from "@/components/general/TextBox";
import { useEffect, useState } from "react";
import Button from "@/components/general/Button";
import ImageButton from "@/components/general/ImageButton";
import homeIcon from "/home-icon.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckBox from "@/components/general/CheckBox";
import { registerVendorSchema } from "@/utils/schema";
import InputImage from "@/components/general/InputImage";
import InputFile from "@/components/general/InputFile";
import useRegisterVendor from "@/hooks/useRegisterVendor";
import axios from "axios";
import useUploadFile from "@/hooks/useUploadFile";
import useRequestVendor from "@/hooks/useRequestVendor";

export type FormFields = z.infer<typeof registerVendorSchema>;

export default function RegisterVendor() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState("");
  const [isRemember, setRemember] = useState<boolean>(false);

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

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const { registerVendor } = useRegisterVendor();
  const { requestVendor } = useRequestVendor();
  const { uploadFile } = useUploadFile();

  const dropdownOptionsLocation = [
    { value: "Kantin_Basement", label: "Kantin Basement" },
    { value: "Kantin_Payung", label: "Kantin Payung" },
    { value: "Kantin_Lt5", label: "Kantin Lt5" },
  ];

  const dropdownOptionsBank = [
    { value: "BCA", label: "Bank Central Asia" },
    { value: "Mandiri", label: "Bank Mandiri" },
    { value: "BNI", label: "Bank Negara Indonesia" },
    { value: "BRI", label: "Bank Rakyat Indonesia" },
    { value: "CIMB", label: "Bank CIMB Niaga" },
    { value: "Permata", label: "Bank Permata" },
    { value: "Danamon", label: "Bank Danamon" },
    { value: "Maybank", label: "Bank Maybank" },
    { value: "Panin", label: "Bank Panin" },
    { value: "OCBC", label: "Bank OCBC" },
    { value: "HSBC", label: "Bank HSBC" },
    { value: "UOB", label: "Bank UOB" },
    { value: "Citibank", label: "Bank Citibank" },
  ];

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

    setRegisterLoading(true);
    console.log(data);

    try {
      const [imgKTPURL, proposalUsahaURL, suratPermohonanURL] =
        await Promise.all([
          uploadFile({
            file: imageKTP,
            folderDestination: "Vendor",
            name: data.namaGerai,
          }),
          uploadFile({
            file: proposalUsaha,
            folderDestination: "Vendor",
            name: data.namaGerai,
          }),
          uploadFile({
            file: suratPermohonan,
            folderDestination: "Vendor",
            name: data.namaGerai,
          }),
        ]);

      await Promise.all([
        await registerVendor({
          role: "Seller",
          name: data.namaGerai,
          vendor_name: data.namaPemilik,
          email: data.email,
          phone: data.nomorTelp,
          password: data.pass,
          rememberMe: isRemember,
          location: data.lokasi,
          open_hour: data.jamBuka,
          close_hour: data.jamTutup,
          bank_account: data.nomorRekening,
          bank_type: data.bankPemilikRekening,
        }),

        await requestVendor({
          name: data.namaGerai,
          vendor_name: data.namaPemilik,
          email: data.email,
          phone: data.nomorTelp,
          location: data.lokasi,
          open_hour: data.jamBuka,
          close_hour: data.jamTutup,
          document: suratPermohonanURL,
          proposal: proposalUsahaURL,
          photo: imgKTPURL,
          bank_account: data.nomorRekening,
          bank_type: data.bankPemilikRekening,
        }),
      ]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message?.[0] || "Gagal Registrasi";
        toast.error(errorMessage);
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="bg-primary min-h-screen  flex flex-col">
      <Toaster />
      <div className="max-w-[1440px]  w-full mx-auto p-12 flex flex-col flex-1 max-sm:p-8">
        <div className="grid grid-cols-2 flex-1 items-center max-lg:grid-cols-1">
          <div className="text-white flex flex-col gap-8 justify-center max-lg:gap-4 max-sm:gap-2">
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

            {/* <TextBox
              label="Lokasi"
              value={identity}
              onChange={setIdentity}
              placeholder="Kantin Bawah"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.lokasi?.message}
              name="lokasi"
            /> */}
            <div className="w-full max-h-[70vh] ">
              <p className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
                Lokasi
              </p>
              <select
                value={identity}
                {...register("lokasi", {
                  required: true,
                  onChange: (e) => setIdentity(e.target.value),
                })}
                name="lokasi"
                className="border-1 py-3 px-3 rounded-[8px] w-full"
              >
                <option value="" disabled>
                  Pilih Lokasi
                </option>
                {dropdownOptionsLocation.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.lokasi && (
                <p className="text-red-500 text-sm">{errors.lokasi.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1">
              <TextBox
                label="Jam Buka"
                placeholder="09.00"
                required={true}
                register={register}
                errorMsg={errors.jamBuka?.message}
                name="jamBuka"
              />
              <TextBox
                label="Jam Tutup"
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

            {/* <TextBox
              label="Bank Pemilik Rekening"
              value={identity}
              onChange={setIdentity}
              placeholder="Central Bank Asia"
              type="text"
              required={true}
              register={register}
              errorMsg={errors.bankPemilikRekening?.message}
              name="bankPemilikRekening"
            /> */}

            <div className="w-full max-h-[70vh] ">
              <p className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
                Bank Pemilik Rekening
              </p>
              <select
                value={identity}
                {...register("bankPemilikRekening", {
                  required: true,
                  onChange: (e) => setIdentity(e.target.value),
                })}
                name="bankPemilikRekening"
                className="border-1 py-3 px-3 rounded-[8px] w-full"
              >
                <option value="" disabled>
                  Pilih Bank
                </option>
                {dropdownOptionsBank.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.bankPemilikRekening && (
                <p className="text-red-500 text-sm">
                  {errors.bankPemilikRekening.message}
                </p>
              )}
            </div>

            <TextBox
              label="Kata Sandi"
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
              linkTemplate="/vendor/Template Proposal Usaha.docx"
              errorMsg={errorProposalUsaha}
            />

            <InputFile
              name=""
              label="Surat Permohonan Kerja Sama"
              value={suratPermohonan}
              onChange={setSuratPermohonan}
              required={true}
              linkTemplate="/vendor/Template Surat Permohonan.docx"
              errorMsg={errorSuratPermohonan}
            />

            <CheckBox
              checked={isRemember}
              onChangeFunc={(checked) => setRemember(checked)}
              label="Ingat saya"
            />
            <Button
              type="submit"
              loading={registerLoading}
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
                  className="underline cursor-pointer hover:opacity-80  transition text-primary"
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
