import vendorMenuList from "@/assets/Admin/vendorDashboard";
import AdminVendorDashboard from "@/components/admin/AdminVendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import Notification from "@/components/general/Notification";
import ModalNotification from "@/components/vendor/ModalNotification";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const VendorDashboard = () => {
  const [showInputBox, setShowInputBox] = useState<boolean>(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { id } = useParams();
  return (
    <>
      <div className="flex justify-between">
        <Sidebar props={vendorMenuList} />
        <div className="flex justify-center items-center gap-5 mr-4 hidden max-md:flex">
          <Notification count={7} onClick={() => setNotifOpen(true)} />
        </div>
      </div>
      <div className="bg-background ">
        <div className=" bg-white justify-between flex max-md:hidden pl-70 pr-10 max-md:pt-10 max-md:pl-5 max-md:pr-5">
          <p className="pt-6 pb-6">
            Home &#62; <span className="font-bold">Vendor</span>
          </p>{" "}
          <div className="flex justify-center items-center gap-5">
            <Notification count={7} onClick={() => setNotifOpen(true)} />
            <h1 className="font-bold">Vendor</h1>
          </div>
        </div>

        <ModalNotification
          visible={notifOpen}
          onClose={() => setNotifOpen(false)}
        />
      </div>
      <div className="bg-background min-h-screen pl-70 pr-10 pt-5 max-md:pt-10 max-md:pl-5 max-md:pr-5">
        {/* Manajemen Vendor */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-4xl font-bold max-md:hidden">Manajemen Vendor</h1>
          <div className=" flex justify-between items-center mt-7 max-md:mt-0">
            <div>
              <p className="font-bold text-xl max-md:text-sm">
                Total Vendor{" "}
                <span className="text-gray ml-4 max-md:text-sm">200</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {!showInputBox && (
                <img
                  src="/admin/searchIcon.svg"
                  className="p-3 bg-white border-gray-200 border-1 rounded-xl"
                  alt=""
                  onClick={() => setShowInputBox(!showInputBox)}
                />
              )}

              {showInputBox && (
                <input
                  type="text"
                  placeholder="Find Vendor"
                  className="p-2 rounded-xl outline-none border-gray border-1"
                />
              )}

              <button className="px-6 py-[10px] bg-primary max-md:px-2 max-md:py-[5px] max-md:rounded-md text-white rounded-xl">
                + Tambah
              </button>
            </div>
          </div>
        </div>

        {/* <AdminVendorDashboard /> */}

        <div className="justify-end flex my-2 max-md:justify-center">
          <div className="flex gap-4 ">
            <span className="text-xl ">&#60;</span>
            <p className="font-bold">1</p>
            <span className="text-xl font-bold">&#62;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
