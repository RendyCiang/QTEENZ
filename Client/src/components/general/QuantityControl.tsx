import React from 'react';

interface QuantityControlProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onDecrement,
  onIncrement
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onDecrement}
        className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md text-gray-500 bg-white"
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
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-md"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;