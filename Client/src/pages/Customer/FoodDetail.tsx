import { useState } from "react";
import NavBar from "@/components/general/NavBar";
import Button from "@/components/general/Button";
import ImagePlaceholder from "@/assets/food-detail-placeholder.svg";

const FoodDetail = () => {
  const [foodName, setFoodName] = useState<string>("Nama Menu Makanan");
  const [vendorName, setVendorName] = useState<string>("Nama Vendor");
  const [foodDescription, setFoodDescription] =
    useState<string>("Deskripsi Makanan");

  return (
    <div className="bg-[#FFF8F8] px-8 min-h-screen">
      <NavBar />

      <Button
        variant="standardWord"
        textColor="gray"
        hoverTextColor="lightGray"
      >
        {"<"} Kembali
      </Button>

      <div className="bg-white p-12 rounded-md border-2 border-[#FFE4DF] grid grid-cols-12">
        {/* Div sisi kiri */}
        <div className="col-span-6 col-start-1">
          <div className="flex flex-row justify-start items-center gap-x-8">
            <h1 className="font-semibold text-3xl">{foodName}</h1>
            <div className="p-2 rounded-2xl bg-[#FFF8F8]">
              <h1 className="text-sm text-primary">{vendorName}</h1>
            </div>
          </div>

          <img src={ImagePlaceholder} className="pt-7" />
        </div>

        {/* Div sisi kanan */}
        <div className="mr-16 col-span-6 col-start-7 grid grid-rows-12">
          <h1 className="row-span-1 row-start-2">Deskripsi</h1>
          <h1 className="row-span-1 row-start-3">{foodDescription}</h1>

          <div className="row-span-1 row-start-4 flex flex-row justify-between">
            <h1>Variasi</h1>
            <h1>Harga</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
