import { Star } from "lucide-react";
import { useState } from "react";
import { API } from "@/utils/API";
import toast from "react-hot-toast";

type ReviewProps = {
  orderId: string;
  onClose: () => void;
};

const Review = ({ orderId, onClose }: ReviewProps) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [applicationReview, setApplicationReview] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Harap Pilih Rating.");
      return;
    }
    if (!description.trim() || !applicationReview.trim()) {
      setError("Harap Isi Field Yang Ada.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await API.post(`/reviews/create-review/${orderId}`, {
        rating,
        description,
        applicationReview,
      });

      if (response.status === 200 || response.status === 201) {
        toast("Review Berhasil!");
        onClose();
      }
    } catch (err) {
      toast("Review Gagal. Ulangi Lagi Nanti.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[8px] w-full max-w-[600px] flex flex-col my-10 max-md:my-4 shadow-md relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-[24px] cursor-pointer z-10"
        aria-label="Close"
      >
        ×
      </button>

      <div className="px-10 py-8 max-md:px-4 max-md:py-6 flex flex-col items-center">
        <h1 className="font-bold text-[28px] mt-2 text-center max-md:text-[20px]">
          Bagaimana makananmu?
        </h1>
        <p className="text-[14px] font-medium text-center max-md:text-[12px] mt-1">
          Berapa kamu akan menilai kami?
        </p>

        <div className="flex gap-4 my-4 justify-center">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              size={32}
              strokeWidth={1}
              onClick={() => setRating(num)}
              className={`cursor-pointer transition-colors duration-200 ${
                num <= rating
                  ? "fill-primary stroke-primary"
                  : "fill-white stroke-gray-400"
              }`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-[14px] mb-4">{error}</p>}

        <div className="flex flex-col items-start w-full gap-2 my-4">
          <p className="font-medium text-[14px] max-md:text-[12px]">
            Berikan penilaianmu
          </p>
          <textarea
            cols={50}
            rows={5}
            className="w-full border rounded-[8px] outline-0 px-3 py-2 focus:outline-primary text-[14px] resize-none"
            placeholder="Makanannya enak!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col items-start w-full gap-2 my-4">
          <p className="font-medium text-[14px] max-md:text-[12px]">
            Bagaimana penilaianmu mengenai fasilitas kantin atau aplikasi?
          </p>
          <textarea
            cols={50}
            rows={5}
            className="w-full border rounded-[8px] outline-0 px-3 py-2 focus:outline-primary text-[14px] resize-none"
            placeholder="Vendornya gercep banget!"
            value={applicationReview}
            onChange={(e) => setApplicationReview(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`bg-primary rounded-[8px] text-white font-medium text-[14px] w-full py-2 hover:bg-primary-2nd cursor-pointer transition-colors duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Penilaian"}
        </button>
      </div>
    </div>
  );
};

export default Review;
