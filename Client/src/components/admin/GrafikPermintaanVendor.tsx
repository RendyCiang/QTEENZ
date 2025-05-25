import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import useFetchData from "@/hooks/useFetchData";
import { GetAllVendorRequestPayload } from "@/types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const tempData = [
  {
    label: "Diterima",
    data: 10,
  },
  {
    label: "Ditolak",
    data: 5,
  },
  {
    label: "Ditinjau",
    data: 15,
  },
];

const GrafikPermintaanVendor = () => {
  const [chartKey, setChartKey] = useState<number>(0);

  const [diterima, setDiterima] = useState<number | undefined>(0);
  const [ditolak, setDitolak] = useState<number | undefined>(0);
  const [ditinjau, setDitinjau] = useState<number | undefined>(0);

  const [total, setTotal] = useState<number | undefined>(0);

  const { data, isLoading, error } = useFetchData<GetAllVendorRequestPayload>(
    "/requests/get-requests"
  );

  useEffect(() => {
    if (data) {
      const accepted = data?.data.filter((i) => i.status === "Accepted").length;
      const declined = data?.data.filter((i) => i.status === "Declined").length;
      const pending = data?.data.filter((i) => i.status === "Pending").length;

      setDiterima(accepted);
      setDitolak(declined);
      setDitinjau(pending);

      const sum = accepted + declined + pending;
      if (sum > 0) {
        const acceptedPercent = ((accepted / sum) * 100).toFixed(0);
        setTotal(Number(acceptedPercent));
      } else {
        setTotal(0);
      }
    }
  }, [data, diterima, ditolak, ditinjau]);

  return (
    <>
      <p className="font-bold max-md:mt-5 text-xl md:hidden">Total Pengguna</p>
      <div className="max-h-[27vh] w-full h-full flex items-center bg-white rounded-lg col-span-2 p-10 gap-8">
        <Doughnut
          data={{
            // labels: ["#ffc116", "#fe4a23", "#5e67c2"],
            labels: ["Diterima", "Ditolak", "Ditinjau"],
            datasets: [
              {
                label: "Status Permintaan Vendor",
                data: [diterima, ditolak, ditinjau],
                backgroundColor: ["#ffc116", "#fe4a23", "#5e67c2"],
              },
            ],
          }}
        />

        <div className="flex flex-col justify-center items-center">
          <p className="text-7xl max-md:text-4xl font-bold">{total}% </p>
          <p className="text-3xl max-md:text-xl font-semibold">Diterima</p>
        </div>
      </div>
    </>
  );
};

export default GrafikPermintaanVendor;

// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// export function App() {
//   return <Doughnut data={data} />;
// }
