import NavbarMain from "@/components/general/NavbarMain";
import useFetchData from "@/hooks/useFetchData";
import useHandleCart from "@/hooks/User/useHandleCart";
import { roleStore } from "@/store/roleStore";
import { OrderItems, OrderItem } from "@/types/types";
import { ChevronDown, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { getCartItems, setCartItems } = useHandleCart();
  const [cartItems, setCartItemsState] = useState<OrderItems>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { role } = roleStore();

  // Data Vendor
  const [vendorData, setVendorData] = useState();
  useEffect(() => {
    setCartItemsState(getCartItems());
    const existingVendorId =
      cartItems.length > 0 ? cartItems[0].vendorId : null;
  }, []);
  // const { data, isLoading, error } = useFetchData<>();
  function updateQuantity(variantId: string, delta: number) {
    const updatedCart = cartItems
      .map((item) => {
        if (item.variantId === variantId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null; // mark for removal
        }
        return item;
      })
      .filter((item): item is OrderItem => item !== null); // remove items with 0 quantity

    setCartItemsState(updatedCart);
    setCartItems(updatedCart); // update Zustand/session storage
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (!updatedCart.find((item) => item.variantId === variantId)) {
        newSet.delete(variantId); // remove from selection if deleted
      }
      return newSet;
    });
  }
  function deleteSelectedItems() {
    const newCart = cartItems.filter(
      (item) => !selectedIds.has(item.variantId)
    );
    setCartItemsState(newCart);
    setCartItems(newCart);
    setSelectedIds(new Set());
  }
  function handleCheckout() {
    const itemsToBuy = cartItems.filter((item) =>
      selectedIds.has(item.variantId)
    );
    console.log("You are buying:", itemsToBuy);
    // send to API or route to checkout with these items
  }
  return (
    <>
      <NavbarMain />
      <div className="px-8 py-4 max-md:px-4 max-md:py-2 pb-10  bg-background">
        <h1 className="flex items-center font-semibold text-[32px] justify-center max-md:text-[24px] ">
          Keranjang Belanja
        </h1>

        <div className="flex justify-between px-8 mt-8 max-md:flex-row max-md:px-4">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <img
                src="/icon/Bakmi.png"
                alt=""
                className="h-[40px] w-[40px] max-md:h-[20px] max-md:w-[20px]"
              />
              <p className="font-medium text-[16px] max-md:text-[12px]">
                Bakmi Efatta
              </p>
            </div>
            <div className="flex items-center w-fit px-4 h-fit py-1 bg-primary rounded-[8px] max-md:px-2 max-md:py-0.5">
              <p className="text-white text-[14px] max-md:text-[12px]">
                Diambil
              </p>
              <ChevronDown className="text-white text-[14px]" />
            </div>
          </div>
          <div className="flex items-center w-fit px-3 h-fit py-2 bg-primary-3rd rounded-[8px] max-md:px-2 max-md:py-0.5">
            <Trash
              onClick={deleteSelectedItems}
              className="text-white text-[10px] max-md:scale-50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="w-full mt-6 pb-4 px-8 py-2 bg-white border-1 border-primary-3rd rounded-[8px] max-md:px-4 max-md:py-2">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse ">
              <thead>
                {/* {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
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
                    <td colSpan={3}>
                      <div className="flex items-center gap-4">
                        <img
                          src="/icon/Bakmi2.png"
                          alt=""
                          className="w-30 h-30 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-[20px]">Bakmi ayam</p>
                          <p className="text-[16px] text-primary font-medium">
                            Rp 20.000
                          </p>
                          <p className="text-[14px]">Varian: Reguler</p>
                          <p className="text-[14px]">Catatan: Pisah cabe ya</p>
                        </div>
                      </div>
                    </td>
                    <td colSpan={3}>
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.variantId, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td colSpan={2} className="text-center">
                      Rp {item.quantity * 20000}
                    </td>
                  </tr>
                ))} */}
                <tr>
                  <th className="px-2 py-2 w-8">
                    <input
                      type="checkbox"
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
                <tr>
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      className="border-1 border-gray rounded-[8px]"
                    />
                  </td>
                  {/* Menu: 4 kolom */}
                  <td className="px-2 py-2 max-md:px-1" colSpan={3}>
                    <div className="flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-1">
                      <img
                        src="/icon/Bakmi2.png"
                        alt=""
                        className="w-30 h-30 object-cover rounded max-md:w-15 max-md:h-15"
                      />
                      <div>
                        <div className=" flex flex-col gap-1 max-md:gap-0">
                          <p className="font-medium text-[20px] max-md:text-[14px]">
                            Bakmi ayam
                          </p>
                          <p className="text-[16px] text-primary font-medium max-md:text-[12px]">
                            Rp 20.000
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
                                Reguler
                              </p>
                            </div>
                            <div className="flex gap-2 ">
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
                  <td className="px-2 py-2 max-md:px-0 max-md:py-0" colSpan={3}>
                    <div className="flex items-center gap-3 justify-center ">
                      <button className="w-6 h-6 rounded bg-primary text-white cursor-pointer max-md:text-[10px] max-md:w-4 max-md:h-4">
                        -
                      </button>
                      <span className="max-md:text-[12px]">2</span>
                      <button className="w-6 h-6 rounded bg-primary text-white cursor-pointer max-md:text-[10px] max-md:w-4 max-md:h-4">
                        +
                      </button>
                    </div>
                  </td>
                  {/* Jumlah: 2 kolom */}
                  <td
                    className="px-2 py-2 font-medium text-[16px] text-center max-md:text-[12px]"
                    colSpan={2}
                  >
                    Rp 40.000
                  </td>
                </tr>
                {/* Tambahkan baris lain sesuai data */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subtotal */}
        <div className="mt-4 w-full flex items-center justify-between pr-10 max-md:pr-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <p className="font-medium text-[14px] text-gray  max-md:text-[12px]">
              3 Item
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-medium text-[14px] text-gray max-md:text-[12px]">
              Subtotal
            </p>
            <p className="font-semibold text-[16px] max-md:text-[14px]">
              Rp 60,000
            </p>
          </div>
        </div>

        {/* Lanjut Pembayaran */}
        <Link to={role === null ? "/login" : ""}>
          <button
            onClick={handleCheckout}
            className="w-full h-fit py-2 bg-primary rounded-[8px] text-white mt-4 text-[16px] hover:bg-primary-2nd cursor-pointer max-md:text-[12px]"
          >
            Lanjutkan Pembayaran
          </button>
        </Link>
      </div>
    </>
  );
}

export default ShoppingCart;
