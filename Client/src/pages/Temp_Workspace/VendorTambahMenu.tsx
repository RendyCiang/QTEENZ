import { useState } from "react";
import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import TextBox from "@/components/general/TextBox";
import Button from "@/components/general/Button";

const VendorTambahMenu = () => {

  const [namaMakanan, setNamaMakanan] = useState<string>("");
  const [deskripsiMakanan, setDeskripsiMakanan] = useState<string>("");
  const [kategoriMakanan, setKategoriMakanan] = useState<string>("");

  return (
    <>
      <Sidebar props={vendorMenuList} />

      {/* Bagian atas yg kek navbar */}
      <div className="bg-white justify-between pl-70 pr-10 flex max-md:hidden">
        <p className="pt-6 pb-8">
          Home &#62; <span className="font-bold">Tambah Menu</span>
        </p>{" "}
        <h1 className="font-bold pt-8">Admin</h1>
      </div>

      <div className="bg-[#FFF8F8] min-h-screen pl-72 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5 flex flex-col">
        <h1 className="py-5 text-4xl font-semibold max-md:hidden">
          Tambah Menu
        </h1>

        <div className="h-fit py-12 px-16 bg-white grid grid-rows-12 rounded-md border-2 border-[#FFE4DF]">
          <div className="row-start-1 row-span-3 grid grid-cols-12">
            <div className="col-start-1 col-span-4 bg-amber-500">
              <h1>Masukkin uploader disini nanti</h1>
            </div>
            <div className="col-start-5 col-span-4 grid grid-rows-9 justify-center">
              <h1 className="row-start-1 row-span-2 self-center">
                Nama Makanan<span className="text-red-500">*</span>
              </h1>
              <h1 className="row-start-3 row-span-5 self-center">
                Deskripsi Makanan<span className="text-red-500">*</span>
              </h1>
              <h1 className="row-start-8 row-span-2 self-center">
                Kategori<span className="text-red-500">*</span>
              </h1>
            </div>
            <div className="col-start-9 col-span-4 grid grid-rows-9 gap-2">
              <div className="row-start-1 row-span-2 self-center">
                <TextBox
                  value={namaMakanan}
                  onChange={setNamaMakanan}
                  placeholder="Masukkan nama makanan"
                  required={false}
                  multiline={false}
                  errorMsg={""}
                />
              </div>
              <div className="row-start-3 row-span-5 self-center">
                <TextBox
                    value={deskripsiMakanan}
                    onChange={setDeskripsiMakanan}
                    placeholder="Masukkan deskripsi makanan"
                    required={false}
                    multiline={true}
                    errorMsg={""}
                  />
              </div>
              <div className="row-start-8 row-span-2 self-center">
                {/* INI UBAH JADI DROPDOWN */}
                <TextBox
                  value={kategoriMakanan}
                  onChange={setKategoriMakanan}
                  placeholder="Masukkan kategori makanan"
                  required={false}
                  multiline={false}
                  errorMsg={""}
                />
              </div>
            </div>
          </div>

          <div className="row-start-5 row-span-1 flex flex-row-reverse items-center">
            <div className="">
              <Button variant="primaryRed" size="md" className="">
                + Tambah Variasi
              </Button>
            </div>
          </div>

          <div className="row-start-6 row-span-5 flex flex-col rounded-md border-2 border-[#FFE4DF] overflow-scroll">
            <div className="h-full grid grid-cols-11 py-6 px-10">
              <h1 className="col-start-1 col-span-1 font-semibold self-center">No</h1>
              <h1 className="col-start-2 col-span-3 font-semibold self-center">variasi</h1>
            </div>
            <div>
              Hello World
            </div>
          </div>

          <div className="row-start-11 row-span-2">
            <div className="bg-yellow-400 h-full">

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorTambahMenu;
