import useFetchData from "@/hooks/useFetchData";
import { ReviewVendorSpecifiedPayload } from "@/types/types";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";

export default function DashboardReviewSection() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useFetchData<ReviewVendorSpecifiedPayload>(
    `/reviews/get-review/${id}`
  );
  console.log("Review data:", data);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-5  border border-primary-4th flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Icon icon="ic:baseline-rate-review" className="text-xl mr-2" />
            <h2 className="text-lg font-semibold">Ulasan Pengguna</h2>
          </div>
          <Link
            to={`/vendor/ulasan/${id}`}
            className="text-sm text-gray underline"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="space-y-4 max-h-[550px] overflow-y-auto">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-start pb-2 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex items-center ml-2">
                      <div className="h-3 w-3 bg-gray-200 rounded mr-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-6"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-5 border border-primary-4th flex-grow">
        <div className="text-red-600">Error: {(error as Error).message}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-5 border border-primary-4th flex-grow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Icon icon="ic:baseline-rate-review" className="text-xl mr-2" />
          <h2 className="text-lg font-semibold">Ulasan Pengguna</h2>
        </div>
        <Link
          to={`/vendor/ulasan/${id}`}
          className="text-sm text-gray underline"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="space-y-4 max-h-[550px] overflow-y-auto">
        {data?.data?.length === 0 ? (
          <p className="text-gray-500 text-center">Tidak ada ulasan tersedia</p>
        ) : (
          data?.data?.map((review, idx) => (
            <div key={idx} className="flex items-start pb-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src={review.buyer.photo}
                  alt={review.buyer.buyerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium">{review.buyer.buyerName}</h3>
                  <div className="flex items-center ml-2">
                    <Icon icon="mdi:star" className="text-yellow-400 text-sm" />
                    <span className="text-xs ml-1">{review.rating}/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {review.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
