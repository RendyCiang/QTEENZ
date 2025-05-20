import React from "react";
import QuantityControl from "../general/QuantityControl";

type FoodDetailQuantityControlProps = {
  foodVariant: string;
  foodPrice: number;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

const FoodDetailQuantityControl: React.FC<FoodDetailQuantityControlProps> = ({
  foodVariant,
  foodPrice,
  quantity,
  onQuantityChange,
}) => {
  const handleDecrement = () => {
    onQuantityChange(Math.max(0, quantity - 1));
  };
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start">
        <div className="bg-primary w-1 rounded-sm"></div>
        <div className="w-56 pl-20 py-2 max-md:w-20 max-md:pl-4 content-center bg-[#FFF8F5] self-center">
          {foodVariant}
        </div>
      </div>

      <div>
        {/* <QuantityControl
          quantity={foodQuantity}
          onDecrement={() => setFoodQuantity(Math.max(0, foodQuantity - 1))}
          onIncrement={() => setFoodQuantity(foodQuantity + 1)}
        /> */}
        <div className="flex items-center">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center cursor-pointer border border-gray-200 rounded-md text-gray-500 bg-white"
          >
            -
          </button>

          <input
            type="text"
            value={quantity}
            readOnly
            className="w-8 mx-1 text-center border-0 focus:ring-0"
          />

          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center cursor-pointer bg-red-500 text-white rounded-md"
          >
            +
          </button>
        </div>
      </div>

      <div>{foodPrice}</div>
    </div>
  );
};

export default FoodDetailQuantityControl;
