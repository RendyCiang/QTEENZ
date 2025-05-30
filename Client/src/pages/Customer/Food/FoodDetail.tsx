import { useEffect, useRef, useState } from "react";
import Button from "@/components/general/Button";
import FoodDetailQuantityControl from "@/components/customer/FoodDetailQuantityControl";
import ImagePlaceholder from "/food-detail-placeholder.svg";
import NavbarMain from "@/components/general/NavbarMain";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import { APIPayload, CartItems, VendorMenuItem } from "@/types/types";
import LoadingSpinner from "@/assets/LoadingSpinner";
import { ChevronLeft } from "lucide-react";
import { roleStore } from "@/store/roleStore";
import useHandleCart from "@/hooks/User/useHandleCart";
import ConfirmModal from "@/components/general/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";

const FoodDetail = () => {
  const [catatan, setCatatan] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useFetchData<APIPayload<VendorMenuItem>>(
    `menus/get-menu/${id}`
  );
  const { role } = roleStore();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState<VendorMenuItem>();

  useEffect(() => {
    if (data) {
      const menus = data.data;
      setMenuItem(menus);
      console.log(menus);

      const initialQuantities: Record<string, number> = {};
      menus.menuVariants.forEach((v) => {
        initialQuantities[v.id] = 0;
      });
      setQuantities(initialQuantities);
    }
  }, [data, id]);

  const { getCartItems, setCartItems, changeVendor } = useHandleCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const pendingCartItemsRef = useRef<CartItems>([]);

  const handleAddToCart = () => {
    if (menuItem) {
      const selectedItems = Object.entries(quantities)
        .filter(([_, qty]) => qty > 0)
        .map(([variantId, quantity]) => ({
          variantId: variantId,
          quantity,
          VendorMenuItem: menuItem,
        }));
      if (selectedItems.length === 0) {
        toast.error("Silakan pilih variasi makanan terlebih dahulu");
        return;
      }

      const prevCart = getCartItems();
      const existingVendorId =
        prevCart.length > 0 ? prevCart[0].VendorMenuItem.vendorId : null;

      if (existingVendorId && existingVendorId !== menuItem.vendorId) {
        pendingCartItemsRef.current = selectedItems;
        setIsModalOpen(true); // only this causes re-render
      } else {
        setCartItems(selectedItems, "update");
        toast.success("Berhasil menambahkan ke keranjang");
      }
    }
  };

  const doChangeVendor = () => {
    changeVendor(pendingCartItemsRef.current);
    pendingCartItemsRef.current = [];
    toast.success("Berhasil menambahkan ke keranjang");
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Terjadi kesalahan: {error.message || "Gagal memuat data"}
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Menu tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F8] px-8 min-h-screen">
      <NavbarMain />
      <Toaster />
      <ConfirmModal
        isOpen={isModalOpen}
        message="Keranjang berisi makanan dari vendor lain. Ingin mengganti vendor dan menghapus isi keranjang sebelumnya?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={doChangeVendor}
      />
      <div className="flex pb-4">
        <ChevronLeft className="text-gray" />
        <p
          className="text-[16px] font-medium text-gray cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Kembali
        </p>
      </div>

      <div className="bg-white p-12 rounded-md border-2 border-[#FFE4DF] grid grid-cols-12 max-md:flex max-md:flex-col">
        {/* Div sisi kiri */}
        <div className="col-span-6 col-start-1">
          <div className="flex flex-row justify-start items-center gap-x-8">
            <h1 className="font-semibold text-3xl">{menuItem.name}</h1>
            <div className="py-2 px-4 rounded-2xl bg-[#FFF8F8]">
              <h1 className="text-sm text-primary">{menuItem.vendor.name}</h1>
            </div>
          </div>

          <img
            src={menuItem.photo || ImagePlaceholder}
            alt={menuItem.name || "Food Image"}
            className="pt-7 lg:w-xl md:w-md sm:w-sm mr-5"
          />
        </div>

        {/* Div sisi kanan */}
        <div className="mr-16 col-span-6 col-start-7 grid grid-rows-12 max-md:mr-0 max-md:p-2">
          <div className="row-span-1 row-start-2 flex flex-col overflow-auto gap-3">
            <h1 className="text-gray-700">Deskripsi</h1>
            <h1>{menuItem.description}</h1>
          </div>

          <div className="row-span-1 row-start-3 flex flex-row items-end justify-between">
            <h1 className="text-gray-700">Variasi</h1>
            <h1 className="text-gray-500">Harga</h1>
          </div>

          <div className="row-start-4 row-span-3 self-center flex flex-col gap-2">
            {/* {menuItem.menuVariants.map((variant) => (
              <FoodDetailQuantityControl
                key={variant.id}
                foodVariant={variant.name}
                foodPrice={variant.price}
              />
            ))} */}
            {menuItem.menuVariants.map((variant) => (
              <FoodDetailQuantityControl
                key={variant.id}
                foodVariant={variant.name}
                foodPrice={variant.price}
                quantity={quantities[variant.id] || 0}
                onQuantityChange={(qty) =>
                  setQuantities((prev) => ({ ...prev, [variant.id]: qty }))
                }
              />
            ))}
          </div>

          <div className="row-start-7 row-span-3">
            {/* Tempat catatan bisa kamu aktifkan kalau perlu */}
          </div>

          <div className="row-start-10 row-span-2 self-center flex flex-col gap-2">
            {role === null ? (
              <Link to={`/login`}>
                <Button variant="primaryRed" textColor="white">
                  Tambahkan ke Keranjang
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleAddToCart}
                variant="primaryRed"
                textColor="white"
              >
                Tambahkan ke Keranjang
              </Button>
            )}

            <Button
              variant="outlineRed"
              textColor="red"
              onClick={() => navigate(-1)}
            >
              Kembali Berbelanja
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
