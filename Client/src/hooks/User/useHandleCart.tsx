import { cartStore } from "@/store/cartStore";
import { OrderItems } from "@/types/types";

const useHandleCart = () => {
  const { setItemCount } = cartStore();

  function getCartItems() {
    return JSON.parse(sessionStorage.getItem("cart") || "[]");
  }

  function setCartItems(selectedItems: OrderItems) {
    const prevCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const newCart = [...prevCart, ...selectedItems];
    sessionStorage.setItem("cart", JSON.stringify(newCart));

    const totalItemCount = newCart.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0
    );
    setItemCount(totalItemCount);
  }
  function changeVendor(selectedItems: OrderItems) {
    sessionStorage.setItem("cart", JSON.stringify(selectedItems));

    const totalItemCount = selectedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setItemCount(totalItemCount);
  }

  return { getCartItems, setCartItems, changeVendor };
};

export default useHandleCart;
