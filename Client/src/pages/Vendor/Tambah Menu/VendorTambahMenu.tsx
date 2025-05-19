import { use, useEffect, useState } from "react";
import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import InputImage from "@/components/general/InputImage";
import useDeleteMenu from "@/hooks/Vendor/useDeleteMenu";
import { Link, useParams } from "react-router-dom";
import {
  APIPayload,
  VendorMenuItem,
  VendorMenuItemPayload,
} from "@/types/types";
import useFetchData from "@/hooks/useFetchData";
import useAddMenu from "@/hooks/Vendor/useAddMenu";
import useUploadFile from "@/hooks/useUploadFile";

type Variasi = {
  nama: string;
  stok: string;
  harga: string;
};

const VendorTambahMenu = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { id } = useParams();
  const { data, isLoading, error } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const {
    uploadFile,
    isLoading: isLoadingFile,
    error: errorFile,
  } = useUploadFile();
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const [menuDetail, setMenuDetail] = useState<VendorMenuItem | undefined>();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [namaMakanan, setNamaMakanan] = useState("");
  const [deskripsiMakanan, setDeskripsiMakanan] = useState("");
  const [categories, setCategories] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([]);
  const [variasi, setVariasi] = useState<Variasi[]>([
    { nama: "", stok: "", harga: "" },
  ]);

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setAllMenus(data.data);
      const foundMenu = data.data.find((menu) => menu.id.toString() === id);
      setMenuDetail(foundMenu);

      const uniqCategoryMap = new Map();
      menus.forEach((item) => {
        if (!uniqCategoryMap.has(item.categoryId)) {
          uniqCategoryMap.set(item.categoryId, {
            id: item.categoryId,
            name: item.category?.name,
            imageUrl: item.photo,
          });
        }
      });

      const uniqCategories = Array.from(uniqCategoryMap.values());
      setCategories(uniqCategories);

      if (foundMenu?.menuVariants) {
        const mappedVariasi = foundMenu.menuVariants.map((variants) => ({
          nama: variants.name,
          stok: variants.stock.toString(),
          harga: variants.price.toString(),
        }));
        setVariasi(mappedVariasi);
      }
      if (foundMenu?.categoryId) {
        setSelectedCat(foundMenu.categoryId);
      }
    }
    if (image) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [data, id, image]);

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

  //State awal
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
  });

  //Tambah Menu
  const { addMenu, addLoading } = useAddMenu();
  const handleAddMenu = async () => {
    if (
      !namaMakanan ||
      !deskripsiMakanan ||
      !selectedCat ||
      variasi.length === 0
    ) {
      alert("Semua field harus diisi.");
      return;
    }

    const isValid = variasi.every(
      (v) =>
        v.nama.trim() !== "" &&
        !isNaN(parseInt(v.harga)) &&
        !isNaN(parseInt(v.stok))
    );

    if (!isValid) {
      alert("Variasi tidak boleh kosong.");
      return;
    }

    if (!image) {
      alert("Gambar harus diunggah.");
      return;
    }

    try {
      console.log("🔁 Uploading image...");
      const photoUrl = await uploadFile({
        file: image,
        folderDestination: "vendor/food",
      });

      const payload = {
        name: namaMakanan,
        description: deskripsiMakanan,
        categoryId: selectedCat,
        photo: photoUrl,
        variants: variasi.map((v) => ({
          name: v.nama,
          stock: parseInt(v.stok),
          price: parseInt(v.harga),
        })),
      };

      console.log("📤 Sending payload to addMenu:", payload);

      await addMenu(payload);
    } catch (error) {
      alert("Gagal mengunggah gambar atau menambahkan menu.");
    }
  };

  //Hapus Menu
  const { deleteMenu } = useDeleteMenu();
  const handleDelete = () => {
    if (!id) {
      alert("ID menu tidak ditemukan");
      return;
    }
    deleteMenu(id);
  };

  return (
    <>
      <Sidebar props={vendorMenuList} />

      {/* Navbar  */}
      <div className=" bg-white justify-between flex w-full pl-70 pr-10 items-center max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>
          <p>&#62;</p>
          <p className="cursor-pointer hover:text-primary">
            <Link to={`/vendor/menu/listmenu/${id}`}>Menu </Link>
          </p>
          <p>&#62;</p>

          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/menu/addmenu/${id}`}> Tambah Menu </Link>
          </span>
        </div>
        <h1 className="font-bold">Vendor</h1>
      </div>

      {/* Konten */}
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5 pt-2 ">
        <h1 className="pr-10 w-full text-4xl font-bold max-md:text-3xl max-md:pl-5 max-md:pr-0">
          Tambah Menu
        </h1>
        {/* Content */}
        <div className="mt-8 w-full mx-4 border-1 border-primary-4th bg-white rounded-[8px]  max-md:flex-col max-md:mx-0">
          <div className="px-8 py-6 max-md:pt-4">
            {/* Atas */}
            <div className="flex justify-between gap-10 max-md:flex-col max-lg:flex-co max-md:gap-0">
              <div className="flex flex-col item items-center gap-2 max-md:items-start">
                <InputImage
                  label=""
                  value={image}
                  onChange={setImage}
                  name="FoodImage"
                  errorMsg=""
                />
              </div>

              <div className="flex flex-col gap-4 w-full max-md:mt-4 max-md:w-full">
                <div className="flex justify-between gap-10 items-center max-md:flex-col max-md:gap-1 max-md:items-start">
                  <p className="font-medium text-[14px]">Nama makanan:</p>
                  <div className="border-1 border-gray rounded-[8px]">
                    <input
                      type="text"
                      className="py-1 rounded-[8px] px-2 w-sm max-md:w-full"
                      placeholder="Masukkan nama makanan..."
                      value={namaMakanan}
                      onChange={(e) => setNamaMakanan(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-5 items-center max-md:flex-col max-md:gap-1 max-md:items-start">
                  <p className="font-medium text-[14px]">Deskripsi makanan:</p>
                  <div className=" rounded-[8px]">
                    <textarea
                      className="border-1 border-gray rounded-[8px]  w-96 h-30 px-2 py-2  max-md:w-full resize-none"
                      rows={10}
                      placeholder="Masukkan deskripsi makanan..."
                      value={deskripsiMakanan}
                      onChange={(e) => setDeskripsiMakanan(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-5 max-md:flex-col max-md:gap-1">
                  <label className="font-medium text-[14px]">Kategori:</label>
                  <div className="border border-gray rounded-[8px]">
                    {isLoading ? (
                      <p className="px-2 py-1">Loading...</p>
                    ) : error ? (
                      <p className="px-2 py-1 text-red-500">
                        Error fetching data
                      </p>
                    ) : (
                      <select
                        className="rounded-[8px] px-2 py-1 w-sm h-8 text-start max-md:w-full"
                        value={selectedCat ?? ""}
                        onChange={(e) =>
                          setSelectedCat(e.target.value as string)
                        }
                      >
                        <option value="" disabled>
                          Pilih Kategori
                        </option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-md:flex max-md:flex-col">
              {/* Tengah Tambah */}
              <div className="flex justify-end mt-2 max-md:pt-4 max-md:justify-normal max-md:w-full">
                <button
                  className="text-[14px] bg-primary rounded-[8px] text-white py-2 px-4 cursor-pointer hover:bg-primary-2nd max-md:w-full"
                  onClick={handleAddRow}
                >
                  + Tambah Variasi
                </button>
              </div>

              {/* Table */}
              <div className="p-4 bg-white rounded-[8px] border border-primary-4th mt-4 overflow-x-auto">
                <table className="min-w-[600px] w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-3 border-b border-primary-3rd text-left font-medium text-[14px] whitespace-nowrap">
                        No.
                      </th>
                      <th className="p-3 border-b border-primary-3rd text-left font-medium text-[14px] whitespace-nowrap">
                        Variasi
                      </th>
                      <th className="p-3 border-b border-primary-3rd text-left font-medium text-[14px] whitespace-nowrap">
                        Stok
                      </th>
                      <th className="p-3 border-b border-primary-3rd text-left font-medium text-[14px] whitespace-nowrap">
                        Harga
                      </th>
                      <th className="p-3 border-b border-primary-3rd text-left font-medium text-[14px] whitespace-nowrap">
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
                            className="border border-gray-300 rounded-[8px] py-2 px-2 w-full text-sm"
                            placeholder="Variasi"
                            value={row.nama}
                            onChange={(e) =>
                              handleInputChange(idx, "nama", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-3 min-w-[100px]">
                          <input
                            type="number"
                            className="border border-gray-300 rounded-[8px] py-2 px-2 w-20 text-sm"
                            placeholder="Stok"
                            value={row.stok}
                            onChange={(e) =>
                              handleInputChange(idx, "stok", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-3 min-w-[120px]">
                          <input
                            type="text"
                            className="border border-gray-300 rounded-[8px] py-2 px-2 w-full text-sm"
                            placeholder="Harga"
                            value={row.harga}
                            onChange={(e) =>
                              handleInputChange(idx, "harga", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-3 text-center min-w-[60px]">
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
                <button
                  className="rounded-[8px] w-full py-2 px-4 bg-primary text-white cursor-pointer hover:bg-primary-2nd"
                  onClick={handleAddMenu}
                >
                  Simpan
                </button>
                <button
                  className="rounded-[8px] w-full py-2 px-4 bg-white border-1 border-primary text-primary cursor-pointer hover:bg-gray-200"
                  onClick={handleDelete}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorTambahMenu;
