import vendorMenuList from "@/assets/Admin/vendorDashboard";
import LoadingSpinner from "@/assets/LoadingSpinner";
import Sidebar from "@/components/admin/Sidebar";
import Button from "@/components/general/Button";
import useFetchData from "@/hooks/useFetchData";
import useArchivedMenu from "@/hooks/Vendor/useArchivedMenu";
import useDeleteMenu from "@/hooks/Vendor/useDeleteMenu";
import useUpdateMenu from "@/hooks/Vendor/useUpdateMenu";
import { VendorMenuItem, VendorMenuItemPayload } from "@/types/types";
import React, { isValidElement, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
type Variasi = {
  nama: string;
  stok: string;
  harga: string;
};
function EachMenuDetail() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } =
    useFetchData<VendorMenuItemPayload>("menus/get-menu");
  const [allMenus, setAllMenus] = useState<VendorMenuItem[]>([]);
  const { id } = useParams();
  const [menuDetail, setMenuDetail] = useState<VendorMenuItem | undefined>();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([]);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");

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
      if (foundMenu) {
        setMenuName(foundMenu.name || "");
        setMenuDescription(foundMenu.description || "");
      }
    }
  }, [data, id]);

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

  //isValid Variasi
  const isValidVariasi = (item: Variasi) => {
    return (
      item.nama.trim() !== "" &&
      item.stok.trim() !== "" &&
      item.harga.trim() !== ""
    );
  };

  // Fungsi Update
  const { updateMenu } = useUpdateMenu();
  const handleSubmit = () => {
    if (!menuName) {
      alert("Nama perlu diisi.");
      return;
    } else if (!menuDescription) {
      alert("Deskripsi perlu diisi");
      return;
    } else if (!selectedCat) {
      alert("Categories perlu diisi");
      return;
    }

    const filteredVariasi = variasi ? variasi.filter(isValidVariasi) : [];

    // Baru buat payload
    const payLoad = {
      name: menuName,
      description: menuDescription,
      categoryId: selectedCat,
      variants:
        filteredVariasi.length > 0
          ? filteredVariasi.map((item) => ({
              name: item.nama,
              stock: Number(item.stok),
              price: Number(item.harga),
            }))
          : [],
    };
    updateMenu({ id: id, payload: payLoad });
    refetch();
  };

  //Hapus Menu
  const { deleteMenu } = useDeleteMenu();
  const handleDelete = () => {
    if (!id) {
      alert("ID menu tidak ditemukan");
      return;
    }
    deleteMenu(id);
    refetch();
  };

  const { archiveMenu } = useArchivedMenu();
  const handleArchive = () => {
    archiveMenu(id);
  };

  return (
    <>
      <Sidebar props={vendorMenuList} />

      {/* Nav */}
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
            <Link to={`/vendor/menu/editmenu/${id}`}> Detail </Link>
          </span>
        </div>
      </div>

      {/* Konten */}
      <div className="bg-[#FFF8F8] w-full pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5 pt-2 ">
        <h1 className="text-[32px] font-semibold max-md:text-2xl">
          {menuDetail ? (
            <p className="text-[32px] font-semibold max-md:text-2xl">
              {menuDetail.name}
            </p>
          ) : (
            <p>Memuat detail menu...</p>
          )}
        </h1>
        <div></div>
        <div className="flex items-center justify-between mt-4  max-md:items-start max-md:gap-2">
          {/* Status */}

          <div className="flex gap-4 items-center h-10">
            <span className="font-semibold max-md:text-[14px]">Status: </span>
            <span className="rounded-[8px] bg-green-200 text-[14px] h-fit w-max py-2 px-8 max-md:px-4 max-md:py-2">
              Tersedia
            </span>
          </div>
          {/* Arsip & delete */}
          <div className="flex gap-4 items-center max-md:gap-1">
            <div className="flex rounded-[8px] bg-primary text-[14px] h-fit w-max py-2 px-8 items-center gap-2 hover:bg-primary-2nd max-md:text-[12px] max-md:px-4 max-md:py-1.5 ">
              <span>
                <img src="/icon/arsip.png" alt="" />
              </span>
              <span className=" text-white cursor-pointer max-md:hidden"  onClick={handleArchive}>
                Arsipkan
              </span>
            </div>

            <div className="flex rounded-[8px] border-1 border-primary-2nd text-[14px] h-fit w-max py-2 px-8 items-center gap-2 cursor-pointer hover:bg-gray-200 max-md:px-5 max-md:h-fit max-md:py-1.5  ">
              <span>
                <img src="/icon/trash.png" alt="" onClick={handleDelete} />
              </span>
              <span
                className=" cursor-pointer text-primary font-medium max-md:text-[12px] max-md:hidden"
                onClick={handleDelete}
              >
                Hapus
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 w-full mx-4 border-1 border-primary-4th bg-white rounded-[8px] max-md:flex-col max-md:mx-0">
          <div className="px-8 py-6 max-md:pt-4">
            {/* Atas */}
            <div className="flex justify-between gap-10 max-md:flex-col max-lg:flex-col">
              <div className="flex flex-col item items-center gap-2">
                <span>
                  <img
                    src={menuDetail?.photo}
                    alt=""
                    className="h-fit lg:w-lg md:w-md sm:w-sm"
                  />
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

              <div className="flex flex-col gap-4 w-full max-md:mt-4 max-md:w-full">
                <div className="flex justify-between gap-10 items-center max-md:flex-col max-md:gap-1 max-md:items-start">
                  <p className="font-medium text-[14px]">Nama makanan:</p>
                  <div className="border-1 border-gray rounded-[8px]">
                    <input
                      type="text"
                      className="py-1 rounded-[8px] px-2 w-sm max-md:w-full"
                      placeholder="Nama makanan"
                      value={menuName}
                      onChange={(e) => setMenuName(e.target.value)}
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
                      value={menuDescription}
                      onChange={(e) => setMenuDescription(e.target.value)}
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

            <div className="max-md:flex max-md:flex-col-reverse">
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
                        <td className="p-3 min-w-[150px]">
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
                            className="border border-gray-300 rounded-[8px] py-2 px-2 w-full text-sm"
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
            </div>

            <div className="flex justify-between items-center gap-2 mt-4">
              <button
                className="rounded-[8px] w-full py-2 px-4 bg-primary text-white cursor-pointer hover:bg-primary-2nd"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                  </>
                ) : (
                  "Simpan"
                )}
              </button>
              <button
                className="rounded-[8px] w-full py-2 px-4 bg-white border-1 border-primary text-primary cursor-pointer hover:bg-gray-200"
                onClick={handleDelete}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                  </>
                ) : (
                  "Hapus"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EachMenuDetail;
