import React, { useState } from "react";
import { GetHistoryBuyerData } from "@/types/types";
import Review from "../Review";

function HistoryMenuContainer({ order }: { order: GetHistoryBuyerData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));

  const displayedItems = order.order.orderItem.slice(0, 3);
  const hasMoreItems = order.order.orderItem.length > 3;

  const handleReviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReviewModalOpen(true);
  };

  return (
    <>
      <div
        className="rounded-[8px] bg-white cursor-pointer min-h-[240px] w-full border border-gray-200 p-4 flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="text-[18px] font-semibold max-md:text-[14px]">
                {order.order.id}
              </p>
              <p>{formatDate(order.createAt)}</p>
              <p className="text-primary text-[16px] font-semibold max-md:text-[12px]">
                {order.vendor.name}
              </p>
            </div>
            <p className="text-[16px] font-semibold text-primary max-md:text-[12px]">
              Rp {formatRupiah(order.order.total_price)}
            </p>
          </div>
          <p className="text-gray-500 text-[14px] max-md:text-[12px]">
            Total Pesanan: {order.order.total_menu}
          </p>
          <p className="text-gray-500 text-[14px] max-md:text-[12px] flex-1">
            Pesanan:
            <ul className="ml-6 mt-1 list-disc list-outside">
              {displayedItems.length > 0 ? (
                displayedItems.map((item, idx) => (
                  <li key={idx} className="truncate">
                    {item.menuVariant.menu.name} - {item.menuVariant.name} :{" "}
                    <span className="font-semibold">{item.quantity}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No items</li>
              )}
              {hasMoreItems && <li className="text-gray-500 italic">...</li>}
            </ul>
          </p>
          <p className="text-gray-500 text-[14px] max-md:text-[12px]">
            Pickup : {order.order.status_pickup}
          </p>
          <p className="text-gray-500 text-[14px] max-md:text-[12px]">
            Delivery : {order.order.delivery_status === "true" ? "Yes" : "No"}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[14px] text-gray-500 max-md:text-[12px]">
              Status : {order.order.status}
            </p>
            <button
              onClick={handleReviewClick}
              className={`w-[80px] h-[40px] rounded-4xl text-white cursor-pointer flex items-center justify-center text-[14px] max-md:w-[60px] max-md:h-[20px] max-md:text-[12px] ${
                order.review === null
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={order.review !== null}
            >
              Review
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[8px] p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-semibold">Order Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-[24px] cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[16px] font-semibold">{order.order.id}</p>
                <p>{formatDate(order.createAt)}</p>
                <p className="text-primary text-[16px] font-semibold">
                  {order.vendor.name}
                </p>
              </div>
              <p className="text-gray-500 text-[14px]">
                Total Pesanan : {order.order.total_menu}
              </p>
              <p className="text-gray-500 text-[14px]">
                Pesanan :
                <ul className="ml-6 mt-1">
                  {order.order.orderItem.length > 0 ? (
                    order.order.orderItem.map((item, idx) => (
                      <li key={idx} className="mb-2">
                        <span className="font-semibold">
                          {item.menuVariant.menu.name} - {item.menuVariant.name}
                        </span>
                        <br />
                        Quantity : {item.quantity}
                        <br />
                        Price : Rp {formatRupiah(item.menuVariant.price)}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic">No items</li>
                  )}
                </ul>
              </p>
              <p className="text-gray-500 text-[14px]">
                Total Harga : Rp {formatRupiah(order.order.total_price)}
              </p>
              <p className="text-gray-500 text-[14px]">
                Pickup : {order.order.status_pickup}
              </p>
              <p className="text-gray-500 text-[14px]">
                Delivery :{" "}
                {order.order.delivery_status === "true" ? "Yes" : "No"}
              </p>
              <p className="text-gray-500 text-[14px]">
                Status : {order.order.status}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleReviewClick}
                className={`w-full py-2 rounded-[8px] cursor-pointer text-white text-[14px] ${
                  order.review === null
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={order.review !== null}
              >
                Review
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 rounded-[8px] text-white bg-primary hover:bg-opacity-90 text-[14px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50">
          <Review
            orderId={order.order.id}
            onClose={() => setIsReviewModalOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default HistoryMenuContainer;
