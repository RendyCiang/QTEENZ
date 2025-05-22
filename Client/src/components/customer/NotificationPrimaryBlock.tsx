import React from "react";
import NotificationFoodBlock from "./NotificationFoodBlock";
import NotificationProgressStatus from "./NotificationProgressStatus";

function NotificationPrimaryBlock() {
  return (
    <>
      <div className="grid grid-cols-12 mt-8">
        <div className="col-span-5 col-start-1">
          <NotificationFoodBlock />
        </div>
        <div className="col-span-7 col-start-6">
          <NotificationProgressStatus />
        </div>
      </div>
    </>
  );
}

export default NotificationPrimaryBlock;
