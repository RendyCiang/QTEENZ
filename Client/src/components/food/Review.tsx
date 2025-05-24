import { Star } from "lucide-react";
import React, { useState } from "react";

function Review() {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white rounded-[8px] w-full max-w-[600px] px-10 py-8 flex items-center flex-col my-10 max-md:px-4 max-md:py-6 shadow-md">
      <h1 className="font-bold text-[28px] mt-2 text-center max-md:text-[20px]">
        Bagaimana makananmu?
      </h1>
      <p className="text-[14px] font-medium text-center max-md:text-[12px] mt-1">
        Berapa kamu akan menilai kami?
      </p>

      <div className="flex gap-4 my-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <Star
            key={num}
            size={32}
            strokeWidth={1}
            onClick={() => setRating(num)}
            className={`cursor-pointer transition-colors duration-200 ${
              num <= rating
                ? "fill-primary stroke-primary"
                : "fill-white stroke-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-col items-start w-full gap-2 my-4">
        <p className="font-medium text-[14px] max-md:text-[12px]">
          Berikan penilaianmu
        </p>
        <textarea
          cols={50}
          rows={5}
          className="w-full border rounded-[8px] outline-0 px-3 py-2 focus:outline-primary text-[14px] resize-none"
          placeholder="Makanannya enak!"
        ></textarea>
      </div>
      <div className="flex flex-col items-start w-full gap-2 my-4">
        <p className="font-medium text-[14px] max-md:text-[12px]">
          Bagaimana penilaianmu mengenai fasilitas kantin atau aplikasi?
        </p>
        <textarea
          cols={50}
          rows={5}
          className="w-full border rounded-[8px] outline-0 px-3 py-2 focus:outline-primary text-[14px] resize-none"
          placeholder="Vendornya gercep banget!"
        ></textarea>
      </div>

      <button className="bg-primary rounded-[8px] text-white font-medium text-[14px] w-full py-2 hover:bg-primary-2nd cursor-pointer transition-colors duration-200">
        Submit Penilaian
      </button>
    </div>
  );
}

export default Review;
