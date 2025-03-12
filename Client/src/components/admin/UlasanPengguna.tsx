import React from "react";
import { Link } from "react-router-dom";
const UlasanPengguna = () => {
  return (
    <>
      {/* Ulasan Pengguna */}
      <div className="col-span-3 p-4 bg-white rounded-xl shadow-md mt-4 w-full">
        <div className="justify-between flex items-center my-4">
          <div className="flex items-center gap-2">
            <img src="/admin/ulasanPengguna.svg" alt="" />
            <p>Ulasan Pengguna</p>
          </div>
          <Link to={"/"}>
            <p className="text-gray underline">Lihat Semua</p>
          </Link>
        </div>

        {/* Feedbacks */}
        <div className="overflow-y-scroll max-h-[35vh]">
          {Array.from({ length: 10 }).map((_, idx) => {
            return (
              <div key={idx} className="flex items-center gap-3 mb-3">
                <img
                  className="w-[60px] cover rounded-full h-[60px]"
                  src="/haerinTemp.jpg"
                  alt=""
                />

                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <p className="font-bold">Rene Wells</p>
                    <img
                      className="cover rounded-full "
                      src="/admin/bintangRating.svg"
                      alt=""
                    />
                    <p className="text-gray opacity-[90]">5.0/5.0</p>
                  </div>

                  <div className="overflow-hidden max-w-full">
                    <p>
                      Aplikasinya sangat membantu! Gampang digunakan,
                      pembayarannya lancar.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UlasanPengguna;
