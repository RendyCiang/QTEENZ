import LoadingSpinner from "@/assets/LoadingSpinner";
import LoadingText from "@/assets/LoadingText";
import Button from "@/components/general/Button";
import NavbarMain from "@/components/general/NavbarMain";
import useCreateOrder from "@/hooks/Order/useCreateOrder";
import useHandleCart from "@/hooks/User/useHandleCart";
import { roleStore } from "@/store/roleStore";
import { CartItem, CartItems, OrderItems } from "@/types/types";
import { API } from "@/utils/API";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function ShoppingCart() {
  const { getCartItems, setCartItems, deleteSelectedCartItems } =
    useHandleCart();
  const { createOrder, createOrderAsync, createOrderLoading } =
    useCreateOrder();

  const [cartItems, setCartItemsState] = useState<CartItems>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { role } = roleStore();

  useEffect(() => {
    setCartItemsState(getCartItems());
    console.log(getCartItems());
  }, []);

  function updateQuantity(variantId: string, delta: number) {
    setCartItemsState((prev) => {
      const updated = prev
        .map((item) => {
          if (item.variantId === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      setCartItems(updated, "update"); // Only call after you finalized new state
      return updated;
    });

    setSelectedIds((prev) => {
      const updatedSet = new Set(prev);
      const stillExists = cartItems.some((i) => i.variantId === variantId);
      if (!stillExists) updatedSet.delete(variantId);
      return updatedSet;
    });
  }

  function deleteSelectedItems() {
    // const newCart = cartItems.filter(
    //   (item) => !selectedIds.has(item.variantId)
    // );
    // console.log(selectedIds);
    // console.log(newCart);

    // setCartItemsState(newCart);
    // setCartItems(newCart, "delete");
    deleteSelectedCartItems(selectedIds);
    setSelectedIds(new Set());
  }

  function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    if (cartItems.length !== 0) {
      const newSelectedIds: Set<string> = isChecked
        ? new Set<string>(cartItems.map((item) => item.variantId))
        : new Set<string>();
      setSelectedIds(newSelectedIds);
    }
  }

  const [deliveryOption, setDeliveryOption] = useState<"Diambil" | "Diantar">(
    "Diambil"
  );

  // function handleCheckout() {
  //   const itemsToBuy = cartItems.filter((item) =>
  //     selectedIds.has(item.variantId)
  //   );

  //   if (itemsToBuy.length === 0) {
  //     toast.error("Kamu belum memilih apa apa.");
  //     return;
  //   }

  //   const orderItems: OrderItems = itemsToBuy.map((i) => ({
  //     menuVariantId: i.variantId,
  //     quantity: i.quantity,
  //   }));

  //   const orderPayload = {
  //     items: orderItems,
  //     // deliveryCriteria: deliveryOption,
  //   };

  //   createOrder(orderPayload, {
  //     onSuccess: (data) => {
  //       deleteSelectedCartItems(selectedIds);
  //       setSelectedIds(new Set());
  //       // console.log("Order response:", data);
  //     },
  //   });
  // }

  async function handleCheckout() {
    if (role === null) {
      navigate("/login");
      return;
    }

    const itemsToBuy = cartItems.filter((item) =>
      selectedIds.has(item.variantId)
    );

    if (itemsToBuy.length === 0) {
      toast.error("Kamu belum memilih apa apa.");
      return;
    }

    const orderItems: OrderItems = itemsToBuy.map((i) => ({
      menuVariantId: i.variantId,
      quantity: i.quantity,
    }));

    const orderPayload = {
      items: orderItems,
    };

    try {
      const data = await createOrderAsync(orderPayload);
      deleteSelectedCartItems(selectedIds);
      setSelectedIds(new Set());
      // On success: window.open and navigation are done in your hook's onSuccess
    } catch (e) {
      // error handled by your hook onError, or add more here if needed
    }
  }
  return (
    <>
      <NavbarMain />
      <Toaster />
      <div className="px-8 py-4 max-md:px-4 max-md:py-2 pb-10  bg-background min-h-screen">
        <h1 className="flex items-center font-semibold text-[32px] justify-center max-md:text-[24px] ">
          Keranjang Belanja
        </h1>

        <div className="flex justify-between px-8 mt-8 max-md:flex-row max-md:px-4">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              {/* <img
                src="/icon/Bakmi.png"
                alt=""
                className="h-[40px] w-[40px] max-md:h-[20px] max-md:w-[20px]"
              /> */}
              <Icon
                icon="grommet-icons:restaurant"
                className={` text-3xl text-center transition-transform duration-300`}
              />
              <div className="py-2 px-4 rounded-2xl bg-secondary-3rd">
                <h1 className="text-sm text-primary">
                  {cartItems.length > 0
                    ? cartItems[0].VendorMenuItem.vendor.name || <LoadingText />
                    : "Nama Vendor"}
                </h1>
              </div>
            </div>
            <div className="flex items-center w-fit px-2 h-fit py-0.5 bg-primary rounded-[8px] max-md:px-2 max-md:py-0.5">
              {/* <p className="text-white text-[14px] max-md:text-[12px]">
                Diambil
              </p>
              <ChevronDown className="text-white text-[14px]" /> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center w-fit px-2 h-fit py-1 bg-primary rounded-[8px] cursor-pointer max-md:px-2 max-md:py-0.5">
                    <p className="text-white text-sm max-md:text-[12px]">
                      {deliveryOption}
                    </p>
                    <ChevronDown className="text-white text-sm ml-2" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-28 bg-white shadow-md rounded-lg mt-2 z-[9999]">
                  {["Diambil", "Diantar"].map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() =>
                        setDeliveryOption(option as "Diambil" | "Diantar")
                      }
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-white rounded"
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div
            className={`flex items-center w-fit px-3 h-fit py-2 bg-primary-3rd rounded-[8px] max-md:px-2 max-md:py-0.5 ${
              selectedIds.size === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Trash
              onClick={deleteSelectedItems}
              className={` text-[10px] max-md:scale-50   ${
                selectedIds.size === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            />
          </div>
        </div>

        {/* Table */}
        <div className="w-full mt-6 pb-4 px-8 py-2 bg-white border-1 border-primary-3rd rounded-[8px] max-md:px-4 max-md:py-2">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse ">
              <thead>
                <tr>
                  <th className="px-2 py-2 w-8">
                    {/* Select All */}
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        cartItems.length > 0 &&
                        selectedIds.size === cartItems.length
                      }
                      className="border-1 border-gray rounded-[8px] "
                    />
                  </th>
                  <th
                    className="text-[16px] text-gray font-medium px-2 py-2 text-left max-md:text-[12px]"
                    colSpan={3}
                  >
                    Menu
                  </th>
                  <th
                    className="text-[16px] text-gray font-medium px-2 py-2 text-center max-md:text-[12px]"
                    colSpan={3}
                  >
                    Jumlah
                  </th>
                  <th
                    className="text-[16px] text-gray font-medium px-2 py-2 text-center max-md:text-[12px]"
                    colSpan={2}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Contoh satu baris data */}

                {cartItems.map((item, index) => (
                  <tr key={item.variantId}>
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        className="border-1 border-gray rounded-[8px]"
                        checked={selectedIds.has(item.variantId)}
                        onChange={(e) => {
                          const newSet = new Set(selectedIds);
                          if (e.target.checked) {
                            newSet.add(item.variantId);
                          } else {
                            newSet.delete(item.variantId);
                          }
                          setSelectedIds(newSet);
                        }}
                      />
                    </td>
                    {/* Menu: 4 kolom */}
                    <td className="px-2 py-2 max-md:px-1" colSpan={3}>
                      <div className="flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-1">
                        <img
                          src={
                            item?.VendorMenuItem.photo
                              ? item.VendorMenuItem.photo
                              : undefined
                          } // replace with item.image if available
                          alt=""
                          className="w-30 h-30 object-cover rounded max-md:w-15 max-md:h-15"
                        />
                        {!item.VendorMenuItem.photo && <LoadingSpinner />}
                        <div>
                          <div className=" flex flex-col gap-1 max-md:gap-0">
                            <p className="font-medium text-[20px] max-md:text-[14px]">
                              {item?.VendorMenuItem.name || <LoadingText />}
                            </p>
                            <p className="text-[16px] text-primary font-medium max-md:text-[12px]">
                              {(() => {
                                const variant =
                                  item.VendorMenuItem.menuVariants.find(
                                    (i) => i.id === item.variantId
                                  );
                                return variant ? (
                                  `Rp ${variant.price.toLocaleString("id-ID")}`
                                ) : (
                                  <LoadingText />
                                );
                              })()}
                            </p>
                          </div>
                          <div className="flex flex-row gap-2 pr-2 pt-2 max-md:pt-0">
                            <div className="border-2 rounded-md max-md:hidden"></div>
                            <div className="flex flex-col max-md:flex-col">
                              <div className="flex gap-2">
                                <p className="text-[14px] text-black max-md:text-[10px] ">
                                  Varian:
                                </p>
                                <p className="text-[14px] text-gray max-md:text-[10px]">
                                  {(() => {
                                    const variant =
                                      item.VendorMenuItem.menuVariants.find(
                                        (i) => i.id === item.variantId
                                      );
                                    return variant ? (
                                      variant.name
                                    ) : (
                                      <LoadingText />
                                    );
                                  })()}
                                </p>
                              </div>

                              {/* Catatan */}
                              <div className=" gap-2 hidden">
                                <p className="text-[14px] text-black max-md:text-[10px]">
                                  Catatan:
                                </p>
                                <p className="text-[14px] text-gray max-md:text-[10px]">
                                  Pisah cabe ya
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Jumlah: 3 kolom */}
                    <td
                      className="px-2 py-2 max-md:px-0 max-md:py-0"
                      colSpan={3}
                    >
                      <div className="flex items-center gap-3 justify-center ">
                        <button
                          onClick={() => updateQuantity(item.variantId, -1)}
                          className="w-6 h-6 rounded bg-primary text-white cursor-pointer max-md:text-[10px] max-md:w-4 max-md:h-4"
                        >
                          -
                        </button>
                        <span className="max-md:text-[12px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, 1)}
                          className="w-6 h-6 rounded bg-primary text-white cursor-pointer max-md:text-[10px] max-md:w-4 max-md:h-4"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    {/* Jumlah: 2 kolom */}
                    <td
                      className="px-2 py-2 font-medium text-[16px] text-center max-md:text-[12px]"
                      colSpan={2}
                    >
                      {(() => {
                        const variant = item.VendorMenuItem.menuVariants.find(
                          (i) => i.id === item.variantId
                        );
                        return variant ? (
                          `Rp ${(variant.price * item.quantity).toLocaleString(
                            "id-ID"
                          )}`
                        ) : (
                          <LoadingText />
                        );
                      })()}
                    </td>
                  </tr>
                ))}
                {/* Tambahkan baris lain sesuai data */}
              </tbody>
            </table>
          </div>
          {cartItems.length === 0 && (
            <p className="text-center text-primary p-5">Belum Ada Makanan!</p>
          )}
        </div>
        {/* Subtotal */}
        <div className="mt-4 w-full flex items-center justify-between pr-10 max-md:pr-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <p className="font-medium text-[14px] text-gray  max-md:text-[12px]">
              {cartItems
                .filter((item) => selectedIds.has(item.variantId))
                .reduce((sum, item) => sum + item.quantity, 0)}{" "}
              Item
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-medium text-[14px] text-gray max-md:text-[12px]">
              Subtotal
            </p>
            <p className="font-semibold text-[16px] max-md:text-[14px]">
              Rp{" "}
              {cartItems
                .filter((item) => selectedIds.has(item.variantId))
                .reduce((sum, item) => {
                  const variant = item.VendorMenuItem.menuVariants.find(
                    (i) => i.id === item.variantId
                  );
                  return sum + item.quantity * (variant?.price ?? 0);
                }, 0)
                .toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Lanjut Pembayaran */}
        <Button
          onClick={handleCheckout}
          variant="primaryRed"
          loading={createOrderLoading}
          className="w-full h-fit py-2 mt-4"
        >
          <p>Lanjutkan Pembayaran</p>
        </Button>
      </div>
    </>
  );
}

export default ShoppingCart;
