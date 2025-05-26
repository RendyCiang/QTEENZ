import { cartStore } from "@/store/cartStore";
import { CartItems, OrderItems } from "@/types/types";

const useHandleCart = () => {
  const { setItemCount } = cartStore();

  function getCartItems() {
    return JSON.parse(sessionStorage.getItem("cart") || "[]");
  }

  // function setCartItems(selectedItems: CartItems) {
  //   const prevCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
  //   const newCart = [...prevCart, ...selectedItems];
  //   sessionStorage.setItem("cart", JSON.stringify(newCart));

  //   const totalItemCount = newCart.reduce(
  //     (sum: number, item: { quantity: number }) => sum + item.quantity,
  //     0
  //   );
  //   setItemCount(totalItemCount);
  // }
  function setCartItems(selectedItems: CartItems, functionality: string) {
    if (functionality === "delete") {
      sessionStorage.setItem("cart", JSON.stringify(selectedItems));

      const totalItemCount = selectedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setItemCount(totalItemCount);
      return;
    }
    const prevCart: CartItems = JSON.parse(
      sessionStorage.getItem("cart") || "[]"
    );

    const cartMap = new Map<string, CartItems[number]>();
    prevCart.forEach((item) => {
      cartMap.set(item.variantId, item);
    });

    selectedItems.forEach((newItem) => {
      if (cartMap.has(newItem.variantId)) {
        // Replace the quantity with the new one (from detail page)
        cartMap.set(newItem.variantId, {
          ...cartMap.get(newItem.variantId)!,
          quantity: newItem.quantity,
        });
      } else {
        cartMap.set(newItem.variantId, newItem);
      }
    });

    const updatedCart = Array.from(cartMap.values());
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    const totalItemCount = updatedCart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setItemCount(totalItemCount);
  }

  function changeVendor(selectedItems: CartItems) {
    sessionStorage.setItem("cart", JSON.stringify(selectedItems));

    const totalItemCount = selectedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setItemCount(totalItemCount);
  }

  function deleteSelectedCartItems(selectedIds: Set<string>) {
    const prevCart: CartItems = JSON.parse(
      sessionStorage.getItem("cart") || "[]"
    );

    const updatedCart = prevCart.filter(
      (item) => !selectedIds.has(item.variantId)
    );

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));

    const totalItemCount = updatedCart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setItemCount(totalItemCount);
    // return updatedCart;
  }

  return { getCartItems, setCartItems, changeVendor, deleteSelectedCartItems };
};

export default useHandleCart;
