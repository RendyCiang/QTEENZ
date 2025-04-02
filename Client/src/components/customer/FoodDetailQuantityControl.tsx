import React from "react";
import QuantityControl from "../general/QuantityControl";

type FoodDetailQuantityControlProps = {
  foodVariant: string;
  foodPrice: number;
}

const FoodDetailQuantityControl: React.FC<FoodDetailQuantityControlProps> = ({
  foodVariant,
  foodPrice,

}) => {
  const [foodQuantity, setFoodQuantity] = React.useState(0);

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="flex flex-row justify-start">
        <div className="bg-primary w-1 rounded-sm"></div>
        <div className="w-56 pl-20 py-2 content-center bg-[#FFF8F5] self-center">{foodVariant}</div>
      </div>

      <div>
        <QuantityControl
          quantity={foodQuantity}
          onDecrement={() => setFoodQuantity(Math.max(0, foodQuantity - 1))}
          onIncrement={() => setFoodQuantity(foodQuantity + 1)}
        />
      </div>

      <div>
        {foodPrice}
      </div>
    </div>
  );
};

export default FoodDetailQuantityControl;
