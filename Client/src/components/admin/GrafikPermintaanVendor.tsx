import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

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

  useEffect(() => {
    return () => {
      setChartKey((prev) => prev + 1); // Ensures chart is remounted
    };
  }, []);
  return (
    <>
      <div className="max-h-[27vh] w-full h-full bg-white rounded-lg col-span-2 p-10">
        <Doughnut
          key={chartKey}
          data={{
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
              {
                label: "Ulasan",
                data: tempData.map((item) => item.data),
                backgroundColor: ["#ffc116", "#5e67c2", "#fe4a23"],
                borderRadius: 5,
              },
            ],
          }}
        />
        ;
      </div>
    </>
  );
};

export default GrafikPermintaanVendor;
