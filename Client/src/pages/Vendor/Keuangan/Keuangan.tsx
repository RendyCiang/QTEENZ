import vendorMenuList from "@/assets/Admin/vendorDashboard";
import Sidebar from "@/components/admin/Sidebar";
import useFetchData from "@/hooks/useFetchData";
import { KeuanganItem, KeuanganPayload } from "@/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
// import { DateRange } from "react-day-picker";
import { Link, useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import Notification from "@/components/general/Notification";
import ModalNotification from "@/components/vendor/ModalNotification";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

const Keuangan = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const { id } = useParams();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 4, 20),
    to: addDays(new Date(2025, 4, 25), 5),
  });

  const [visible, setVisible] = useState(true);

  const {
    data: historyVendorData,
    isLoading: historyVendorLoading,
    error: historyVendorError,
  } = useFetchData<KeuanganPayload>("/history/get-vendor-history");

  const [allHistory, setAllHistory] = useState<KeuanganItem[]>([]);
  const totalEarnings = allHistory
    .filter((item) => {
      const orderDate = new Date(item.createAt);
      return (
        item.status_payment === "Success" &&
        dateRange?.from &&
        dateRange?.to &&
        orderDate >= dateRange.from &&
        orderDate <= dateRange.to
      );
    })
    .reduce((acc, curr) => acc + curr.order.total_price, 0);

  const isLoading = historyVendorLoading;
  const error = historyVendorError;

  useEffect(() => {
    const historyData = historyVendorData?.data || [];
    setAllHistory(historyData);
  }, [historyVendorData]);

  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const dailyEarnings = daysOfWeek.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {} as Record<string, number>);

  allHistory.forEach((item) => {
    const orderDate = new Date(item.createAt);
    if (
      item.status_payment === "Success" &&
      dateRange?.from &&
      dateRange?.to &&
      orderDate >= dateRange.from &&
      orderDate <= dateRange.to
    ) {
      const dayName = daysOfWeek[orderDate.getDay()];
      dailyEarnings[dayName] += item.order.total_price;
    }
  });
  const chartData = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Daily Earnings (Rp)",
        data: [
          dailyEarnings["Senin"],
          dailyEarnings["Selasa"],
          dailyEarnings["Rabu"],
          dailyEarnings["Kamis"],
          dailyEarnings["Jumat"],
          dailyEarnings["Sabtu"],
          dailyEarnings["Minggu"],
        ],
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 2,
        fill: false,
        pointRadius: 7,
        pointBackgroundColor: "#36A2EB",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Daily Earnings Statistics",
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return "Rp " + context.parsed.y.toLocaleString("id-ID");
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10000000,
        ticks: {
          stepSize: 100000,
          callback: function (tickValue: string | number) {
            if (
              [
                0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000,
                4000000, 4500000, 5000000, 5500000, 6000000, 6500000, 7000000,
                7500000,
              ].includes(Number(tickValue))
            ) {
              return "Rp " + Number(tickValue).toLocaleString("id-ID");
            }
            return null;
          },
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };
  return (
    <>
      <Sidebar props={vendorMenuList} />

      <div className=" bg-white justify-between  pl-70 pr-10 flex max-md:hidden">
        <div className="pt-6 pb-8 flex items-center gap-2">
          <p className="cursor-pointer hover:text-primary">
            <Link to={"/"}>Beranda </Link>
          </p>
          <p>&#62;</p>
          <span className="font-bold cursor-pointer hover:text-primary">
            <Link to={`/vendor/keuangan/${id}`}> Keuangan </Link>
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
      <div className="bg-[#FFF8F8] min-h-screen pl-70 pr-10 max-md:pt-5 max-md:pl-5 max-md:pr-5 pb-10">
        {/* Manajemen Keuangan */}
        <div className="pt-2 pb-2 max-md:pt-0 max-md:pb-0">
          <h1 className="text-3xl font-bold max-md:text-2xl max-md:pb-5">
            Manajemen Keuangan
          </h1>
        </div>

        {/* Card Total Pendapatan & Graph */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex relative w-full md:w-[365px] h-[234px] bg-white rounded-lg">
            <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4">
                <img src="/vendor/money.svg" alt="" />
                <h2 className="text-sm font-medium">Total Pendapatan</h2>
              </div>
              <div className="flex flex-col mt-10 ite">
                <div className="flex gap-2 justify-start items-centertext-xl">
                  Rp.{" "}
                  <span className="text-primary font-bold text-4xl">
                    {" "}
                    {visible ? totalEarnings.toLocaleString("id-ID") : "••••••"}
                  </span>
                  <span className="mt-2">
                    <Icon
                      icon={visible ? "mdi:eye" : "mdi:eye-off"}
                      className={`text-xl cursor-pointer ${
                        visible ? "text-black" : "text-gray-400"
                      }`}
                      onClick={() => setVisible(!visible)}
                    />
                  </span>
                </div>
                <div className="flex flex-row justify-start items-center text-[14px] text-gray">
                  <p>dibanding minggu lalu</p>
                  <div className="w-[53px] h-[21px] bg-[#9EFFF7] flex ml-2 items-center justify-center rounded-sm ">
                    <p>5%</p>
                    <img src="/vendor/arrowUp.svg" alt="" className="w-3 h-3" />
                  </div>
                </div>
                <hr className="border-gray-400 mt-4" />
              </div>
              <div className="flex flex-row justify-between items-center mt-4">
                <p>Akun</p>
                <p>{allHistory[0]?.vendor?.name || "-"}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[234px] bg-white rounded-lg px-2 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-lg p-6">
              <Line
                key={
                  (dateRange?.from?.toISOString() || "") +
                  "-" +
                  (dateRange?.to?.toISOString() || "")
                }
                data={chartData}
                options={chartOptions}
              />
            </div>
          </div>
        </div>

        {/* Riwayat Transakasi */}
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mt-10">
            <h3>Riwayat Transaksi</h3>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          <div className="overflow-x-auto max-h-[70vh] rounded-lg bg-white max-md:border-gray-300 mt-4">
            <div className="flex flex-col min-w-[820px]">
              {/* Header */}
              <div className="flex items-center justify-between py-4 text-gray-500 text-sm whitespace-nowrap px-2 text-center">
                <div className="w-[120px]  max-md:text-sm">Id Pesanan</div>
                <div className="w-[120px]  max-md:text-sm">Waktu</div>
                <div className="w-[100px] ">Total Item</div>
                <div className="w-[120px] max-md:text-sm">Pesanan</div>
                <div className="w-[120px] max-md:text-sm">Pembayaran</div>
                <div className="w-[120px] max-md:text-sm text-right">
                  Total (Rp)
                </div>
                <div className="w-[100px] max-md:text-sm ">Rating</div>
              </div>

              {/* Row Data */}
              <div className="max-h-[60vh] overflow-y-auto text-center">
                {allHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 text-sm text-gray-800 hover:bg-gray-50 transition whitespace-nowrap px-2 border-b border-gray-100"
                  >
                    <div className="w-[120px] text-center text-wrap">
                      {item.id}
                    </div>
                    <div className="w-[120px]">
                      {new Date(item.createAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="w-[100px] text-center">
                      {item.order.total_menu}
                    </div>
                    <div className="w-[120px] text-wrap">
                      {item.order.orderItem
                        .map((oi) => oi.menuVariant.menu.name)
                        .join(", ")}
                    </div>
                    <div className="w-[120px]">{item.status_payment}</div>
                    <div className="w-[120px] text-right">
                      {item.order.total_price.toLocaleString("id-ID")}
                    </div>
                    <div className="w-[100px] text-center">
                      {item.review?.rating ? `${item.review.rating}/5` : "-"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Keuangan;
