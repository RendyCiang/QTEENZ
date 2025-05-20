import React from "react";

const TotalPengguna = () => {
  return (
    <>
      <p className="font-bold max-md:mt-5 text-xl md:hidden">Total Pengguna</p>
      <div className="min-h-[22vh] rounded-xl row-span-1 p-6 bg-white shadow-md　">
        <div className="flex gap-2 max-md:hidden">
          <img className="" src="/admin/totalPengguna.svg" alt="" />
          <p>Total Pengguna</p>
        </div>

        <div className="grid grid-cols-3 py-2 pt-4">
          <div className="col-span-2 flex flex-col justify-between">
            <div className="flex gap-2 items-center">
              <div>
                <h1 className="text-6xl font-semibold text-primary">2500</h1>
                <p className="font-bold">Pengguna</p>
              </div>
              <div>
                <img
                  className=" py-4 px-5 bg-primary-3rd rounded-full"
                  src="/admin/arrowPrimaryKanan.svg"
                  alt=""
                />
              </div>
            </div>

            {/* Lihat selengkapnya */}
            <button className="cursor-pointer hover:opacity-80 px-4 py-1 mt-4 text-sm max-w-fit border-gray-300 border-1 rounded-lg">
              Lihat Selengkapnya
            </button>
          </div>

          {/*  */}
          <div className="flex flex-col gap-2 col-span-1">
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">2300</h1>
              <p>Pembeli</p>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">200</h1>
              <p>Vendor</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalPengguna;
