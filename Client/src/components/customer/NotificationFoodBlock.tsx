import React from "react";

function NotificationFoodBlock() {
  return (
    <>
      <div className="mr-12 flex flex-col bg-white">
        <div className="grid grid-cols-12 py-3.5 px-6">
          <p className="col-span-7 col-start-1 font-semibold text-2xl text-start self-center">
            Nama Vendor
          </p>
          <p className="col-span-5 col-start-8 text-[0.85rem] text-gray text-right">
            Tanggal Pemesanan
          </p>
        </div>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="px-6 inline-block">
            <div className="flex flex-col justify-items-center w-40">
              <img
                src="https://swansdown.com/wp-content/uploads/2021/10/Basic-waffles-1024x683.jpg.webp"
                className="w-35 h-35 self-center"
              />
              <p className="pt-3 self-center">Nama Makanan</p>
            </div>
          </div>
        </div>
        <div className="bg-gray h-[0.1rem] my-3.5 mx-5"></div>
        <div className="px-6 pb-3 flex flex-row gap-10">
          <p>??? Menu</p>
          <p>Rp24000</p>
        </div>
      </div>
    </>
  );
}

export default NotificationFoodBlock;
