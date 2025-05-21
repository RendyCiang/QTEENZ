import NavbarNotification from "@/components/customer/NavbarNotification";
import Button from "@/components/general/Button";
import React from "react";

function NotificationPage() {
  return (
    <>
      <div className="pl-8 pr-8 pb-10 max-md:mt-4 bg-background">
        {/* Bagian Atas */}
        <div className="pt-8 grid grid-cols-12">
          <Button
            toPage="/customer/food"
            variant="standardWord"
            textColor="black"
            hoverTextColor="lightGray"
            size="md"
            className="col-start-1"
          >
            <span className="text-4xl">&larr;</span>
          </Button>
          <p className="col-start-6 col-span-2 justify-center self-center text-center text-2xl font-semibold">
            PESANAN SAYA
          </p>
        </div>

        <NavbarNotification />
      </div>
    </>
  );
}

export default NotificationPage;
