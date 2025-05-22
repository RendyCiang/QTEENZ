import React from "react";
import { useState } from "react";

// type Props = {
//   pageState: number;
// };

function NavbarNotification() {
  const [filterType, setFilterType] = useState<number>(0);
  // 0 -> Sedang diproses
  // 1 -> Selesai
  // 2 -> Pengembalian dana

  return (
    <nav className="bg-background">
      <div className="grid grid-cols-12 justify-items-center">
        <button
          onClick={() => setFilterType(0)}
          className={`border-b-2 col-span-4 col-start-1 ${
            filterType === 0
              ? "text-primary font-bold border-none"
              : "border-transparent hover:border-primary"
          } transition-all duration-300 cursor-pointer`}
        >
          Sedang Diproses
        </button>
        <button
          onClick={() => setFilterType(1)}
          className={`border-b-2 col-span-4 col-start-5 ${
            filterType === 1
              ? "text-primary font-bold border-none"
              : "border-transparent hover:border-primary"
          } transition-all duration-300 cursor-pointer`}
        >
          Selesai
        </button>
        <button
          onClick={() => setFilterType(2)}
          className={`border-b-2 col-span-4 col-start-9 ${
            filterType === 2
              ? "text-primary font-bold border-none"
              : "border-transparent hover:border-primary"
          } transition-all duration-300 cursor-pointer`}
        >
          Pengembalian Dana
        </button>
      </div>
    </nav>
  );
}

export default NavbarNotification;
