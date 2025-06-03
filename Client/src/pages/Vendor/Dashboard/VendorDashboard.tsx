import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import Notification from "@/components/general/Notification";
import ModalNotification from "@/components/vendor/ModalNotification";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import DashboardStats from "./DashboardStats";
import DashboardOrderSection from "./DashboardOrderSection";
import DashboardReviewSection from "./DashboardReviewSection";
import DashboardSatisfactionSection from "./DashboardSatisficationSection";

const VendorDashboard = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const { id } = useParams();
  const scrollbarStyleWebkit = `
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: var(--color-primary-4th);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--color-primary-3rd);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-primary);
    }
  `;

  const rating = 4.5;
  const maxRating = 5.0;
  const percentage = (rating / maxRating) * 100;

  interface ToggleVisibilityProps {
    value: number | string;
  }
  function ToggleVisibility({ value }: ToggleVisibilityProps) {
    const [visible, setVisible] = useState(true);
    const numericValue = typeof value === "number" ? value : 0;

    return (
      <div>
        <div className="flex gap-4 items-center">
          <h2 className="text-4xl font-semibold">
            {visible ? (
              <span className="text-black">{`Rp. ${numericValue.toLocaleString(
                "id-ID"
              )}`}</span>
            ) : (
              <span className="text-gray-400">••••••••</span>
            )}
          </h2>
          <button
            onClick={() => setVisible(!visible)}
            aria-label="Toggle visibility"
          >
            <Icon
              icon={visible ? "mdi:eye" : "mdi:eye-off"}
              className={`text-xl cursor-pointer ${
                visible ? "text-black" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{scrollbarStyleWebkit}</style>
      <div className="flex justify-between">
        <Sidebar props={vendorMenuList} />
        <div className="justify-center items-center gap-5 mr-4 hidden max-md:flex">
          <Notification
            count={7}
            onClick={() => setNotifOpen(true)}
            apiEndpoint="orders/get-orders-vendor"
          />
        </div>
      </div>

      {/* Header */}
      <div className=" bg-white justify-between  pl-70 pr-10 flex max-md:hidden ">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/dasbor/${id}`}> Dasbor </Link>
          </span>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Notification
            count={0}
            onClick={() => setNotifOpen(true)}
            apiEndpoint="orders/get-orders-vendor"
          />
          <h1 className="font-bold">Vendor</h1>
        </div>
        <ModalNotification
          visible={notifOpen}
          onClose={() => setNotifOpen(false)}
        />
      </div>

      {/* Content */}
      <div className="bg-background md:pl-[17.5rem] pr-10 pt-5 max-md:pt-10 max-md:pl-5 max-md:pr-5 pb-6 min-h-screen max-md:pb-20">
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-3xl font-bold max-md:hidden mb-6">
            Vendor Dasbor
          </h1>

          {/* Dashboard Stats */}
          <DashboardStats />

          {/* Orders Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 flex-grow">
            <DashboardOrderSection />

            {/* Reviews Section */}
            <DashboardReviewSection />

            {/* Satisfaction + Top Items */}
            <DashboardSatisfactionSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
