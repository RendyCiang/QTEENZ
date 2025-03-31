import Button from "./Button";
import UserProfileHeader from "./UserProfileHeader";
import ProfileIcon from "@/assets/profile-icon.svg";
import CartIcon from "@/assets/cart-icon.svg";
import ImageButton from "./ImageButton";

const NavBar = () => {
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

export default NavBar;
