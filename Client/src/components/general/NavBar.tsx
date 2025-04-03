// import React from "react";
// import { Link } from "react-router-dom";

// type NavbarProps = {
//   data: {
//     name: string;
//     profileLink: string;
//     cartItems: string; // change later to object that contains the cart items
//   };
// };

// const Navbar: React.FC<NavbarProps> = ({ data }) => {
//   return (
//     <div className="flex justify-between items-center w-full">
//       <Link to="/">
//         <p className="   text-primary font-extrabold max-md:text-sm text-2xl">
//           QTEENZ
//         </p>
//       </Link>
//       <div className="flex items-center justify-center gap-3">
//         <div className="flex items-center gap-3">
//           <img
//             className="w-[30px] h-[30px] rounded-full bg-cover border-primary border-1"
//             src={
//               data.profileLink
//                 ? data.profileLink
//                 : "/admin/penggunaDisabled.svg"
//             }
//             alt=""
//           />
//           <p className="font-semibold text-xl uppercase">Nama</p>
//         </div>

//         {/* keranjang */}
//         <div className="relative">
//           <img
//             src="/user/keranjang.svg"
//             className="w-[40px] h-[40px] p-2"
//             alt=""
//           />
//           <p className="p-[2px] absolute right-0 top-0 text-[10px] rounded-full bg-primary text-white">
//             50
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import Button from "./Button";
import UserProfileHeader from "./UserProfileHeader";
import ProfileIcon from "@/assets/profile-icon.svg";
import CartIcon from "@/assets/cart-icon.svg";
import ImageButton from "./ImageButton";

const Navbar = () => {
  return (
    <div className="bg-[#FFF8F8] py-5 grid grid-cols-12 justify-center">
      <Button
        variant="underlineOnHoverAndClick"
        className="font-semibold col-span-1 col-start-1"
      >
        Beranda
      </Button>
      <Button
        variant="underlineOnHoverAndClick"
        className="font-semibold col-span-1 col-start-2"
      >
        Order
      </Button>
      <Button
        variant="underlineOnHoverAndClick"
        className="font-semibold col-span-1 col-start-3"
      >
        Riwayat
      </Button>

      <h1 className="font-bold text-primary text-3xl col-span-2 col-start-6 self-center">
        QTEENZ
      </h1>

      {/* Ini UserProfileHeader mungkin bisa diganti aja ke ImageButton.tsx, tapi rapiin dlu ImageButton.tsx nya */}
      {/* <UserProfileHeader
        username="Mike Kimeison"
        profileImageUrl={ProfileIcon}
        imageSize={40}
        fontWeight="font-bold"
        fontSize="text-base"
        className="col-span-3 col-start-10 justify-center px-20"
      /> */}

      <div className="flex flex-row col-start-10 col-span-2 justify-center">
        <ImageButton
          imageSrc={ProfileIcon}
          variant="general_black"
          size="md"
          className="font-semibold tracking-wide uppercase"
        >
          Michael Kimeison
        </ImageButton>
      </div>

      <div className="mr-3 col-span-1 col-start-12 flex flex-rows justify-end">
        <ImageButton
          imageSrc={CartIcon}
        />
      </div>
    </div>
  );
};

export default Navbar;

