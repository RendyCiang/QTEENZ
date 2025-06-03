import LoadingText from "@/assets/LoadingText";
import useFetchData from "@/hooks/useFetchData";
import { GetHistoryReviewData, GetHistoryReviewPayload } from "@/types/types";
import React, { use, useEffect, useState } from "react";

const KepuasanPengguna = () => {
  const { data, isLoading, error } =
    useFetchData<GetHistoryReviewPayload>(`/history/get-history`);

  const [reviewData, setReviewData] = useState<GetHistoryReviewPayload>();

  useEffect(() => {
    if (data) {
      setReviewData(data);
    }
  }, [data]);

  return (
    <>
      <div className="rounded-xl min-h-[23vh] row-span-1 px-6 py-6 pb-12 bg-primary ">
        <div className="flex gap-2 items-center ">
          <img className="pb-4" src="/admin/kepuasanPengguna.svg" alt="" />
          <p className="text-white pb-4">Kepuasan Pengguna</p>
        </div>

        <div>
          <h1 className="text-7xl text-white font-semibold">
            {reviewData?.averageRating || <LoadingText className="text-2xl" />}
            /5.0
          </h1>
          <p className="text-white">
            {reviewData?.totalReviews || "Loading..."} dari{" "}
            {reviewData?.totalUserReviews || "Loading..."} pengguna
          </p>
          {reviewData && (
            <progress
              className="w-full mt-2 mb-2 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary rounded-full"
              value={
                reviewData?.totalReviews / reviewData?.totalUserReviews || 0
              }
            ></progress>
          )}
        </div>
      </div>
    </>
  );
};

export default KepuasanPengguna;
