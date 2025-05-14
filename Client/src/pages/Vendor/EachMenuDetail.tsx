import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import React, { useState } from "react";
type Variasi = {
  nama: string;
  stok: string;
  harga: string;
};
function EachMenuDetail() {
  const [variasi, setVariasi] = useState<Variasi[]>([
    { nama: "", stok: "", harga: "" },
  ]);

  // Fungsi tambah baris
  const handleAddRow = () => {
    setVariasi([...variasi, { nama: "", stok: "", harga: "" }]);
  };

  // Fungsi hapus baris
  const handleDeleteRow = (index: number) => {
    setVariasi(variasi.filter((_, i) => i !== index));
  };

  // Fungsi handle input
  const handleInputChange = (
    index: number,
    field: keyof Variasi,
    value: string | number
  ) => {
    const newVariasi = [...variasi];
    newVariasi[index] = { ...newVariasi[index], [field]: value };
    setVariasi(newVariasi);
  };

  return (
    <>
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <p className="pt-6 pb-8 max-md:pt-0 max-md:pb-0">
          Beranda &#62; <span className="font-normal">Menu &#62;</span>{" "}
          <span className="font-bold">Detail</span>
        </p>{" "}
        <h1 className="font-bold">Vendor</h1>
      </div>

      {/* Konten */}
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5 pt-2 ">
        <h1 className="text-[32px] font-semibold max-md:text-2xl">
          Bakmi Ayam Kecap
        </h1>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-4 items-center h-10">
            {/* Status */}
            <span className="font-semibold">Status: </span>
            <span className="rounded-[8px] bg-green-200 text-[14px] h-fit w-max py-2 px-8">
              Tersedia
            </span>
          </div>
          {/* Arsip & delete */}
          <div className="flex gap-4 items-center">
            <div className="flex rounded-[8px] bg-primary text-[14px] h-10 w-max py-2 px-8 items-center gap-2 hover:bg-primary-2nd">
              <span>
                <img src="/icon/arsip.png" alt="" />
              </span>
              <span className=" text-white cursor-pointer">Arsipkan</span>
            </div>

            <div className="flex rounded-[8px] border-1 border-primary-2nd text-[14px] h-10 w-max py-2 px-8 items-center gap-2 cursor-pointer hover:bg-gray-100">
              <span>
                <img src="/icon/trash.png" alt="" />
              </span>
              <span className=" cursor-pointer text-primary font-medium">
                Hapus
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 w-full mx-4 border-1 border-primary-4th bg-white rounded-[8px]">
          <div className="px-8 py-6">
            {/* Atas */}
            <div className="flex justify-between">
              <div className="flex flex-col item items-center gap-2">
                <span>
                  <img src="/icon/BakmiKotak.png" alt="" />
                </span>
                <span className="flex flex-col">
                  <p className="text-[14px] text-gray">
                    Ukuran gambar: maks. 1 MB
                  </p>
                  <p className="text-[14px] text-gray">
                    Format gambar: .JPEG, .PNG
                  </p>
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-10 items-center">
                  <p className="font-medium text-[14px]">Nama makanan:</p>
                  <div className="border-1 border-gray rounded-[8px]">
                    <input
                      type="text"
                      className="py-1 rounded-[8px] px-2 w-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-10 items-center">
                  <p className="font-medium text-[14px]">Deskripsi makanan:</p>
                  <div className=" rounded-[8px]">
                    <textarea
                      className="border-1 border-gray rounded-[8px] w-96 h-32 px-2 py-2 resize-none"
                      rows={6}
                      placeholder="Masukkan deskripsi makanan..."
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-10 items-center">
                  <p className="font-medium text-[14px]">Kategori:</p>
                  <div className="border-1 border-gray rounded-[8px]">
                    <select
                      className="rounded-[8px] px-2 py-1 w-sm h-8 text-start"
                      defaultValue="Bakmi"
                    >
                      <option value="Bakmi">Bakmi</option>
                      <option value="Nasi Goreng">Nasi Goreng</option>
                      <option value="Sate">Sate</option>
                      {/* Tambahkan opsi lain sesuai kebutuhan */}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Tengah Tambah */}
            <div className="flex justify-end mt-2">
              <button
                className="text-[14px] bg-primary rounded-[8px] text-white py-2 px-4 cursor-pointer hover:bg-primary-2nd"
                onClick={handleAddRow}
              >
                + Tambah Variasi
              </button>
            </div>

            {/* Table */}
            <div className="p-4 bg-white rounded-[8px] border border-primary-4th mt-4">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="">
                    <th className="p-3 border-b-1 border-primary-3rd text-left font-medium text-[14px]">
                      No.
                    </th>
                    <th className="p-3 border-b-1 border-primary-3rd text-left font-medium text-[14px]">
                      Variasi
                    </th>
                    <th className="p-3 border-b-1 border-primary-3rd text-left font-medium text-[14px]">
                      Stok
                    </th>
                    <th className="p-3 border-b-1 border-primary-3rd text-left font-medium text-[14px]">
                      Harga
                    </th>
                    <th className="p-3 border-b-1 border-primary-3rd text-left font-medium text-[14px]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variasi.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-3 align-middle">{idx + 1}.</td>
                      <td className="p-3">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-[8px] py-2 px-2 w-full"
                          placeholder="Variasi"
                          value={row.nama}
                          onChange={(e) =>
                            handleInputChange(idx, "nama", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          className="border border-gray-300 rounded-[8px] py-2 px-2 w-20"
                          placeholder="Stok"
                          value={row.stok}
                          onChange={(e) =>
                            handleInputChange(idx, "stok", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-[8px] py-2 px-2 w-full"
                          placeholder="Harga"
                          value={row.harga}
                          onChange={(e) =>
                            handleInputChange(idx, "harga", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-3 text-center">
                        <img
                          src="/icon/trash.png"
                          alt="Hapus"
                          className="cursor-pointer inline-block w-5 h-5"
                          onClick={() => handleDeleteRow(idx)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center gap-2 mt-4">
              <button className="rounded-[8px] w-full py-2 px-4 bg-primary text-white cursor-pointer hover:bg-primary-2nd">
                Simpan
              </button>
              <button className="rounded-[8px] w-full py-2 px-4 bg-white border-1 border-primary text-primary cursor-pointer hover:bg-gray-50">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EachMenuDetail;
