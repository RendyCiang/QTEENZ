import NavbarNotification from "@/components/customer/NavbarNotification";
import NotificationFoodBlock from "@/components/customer/NotificationFoodBlock";
import NotificationPrimaryBlock from "@/components/customer/NotificationPrimaryBlock";
import NotificationProgressStatus from "@/components/customer/NotificationProgressStatus";
import Button from "@/components/general/Button";
import React, { useEffect, useState } from "react";

function NotificationPage() {
  const [pageFilter, setPageFilter] = useState<number>();

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

        <NotificationPrimaryBlock />
      </div>
    </>
  );
}

export default NotificationPage;
