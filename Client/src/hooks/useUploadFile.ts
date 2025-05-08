import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";

const useUploadFile = () => {
  const allowedFileTypes = {
    images: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    documents: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  };

  const uploadFile = useMutation({
    mutationFn: async ({
      file,
      folderDestination,
      name,
    }: {
      file: File;
      folderDestination: string;
      name?: string;
    }) => {
      const fileTypeCategory = Object.keys(allowedFileTypes).find((category) =>
        allowedFileTypes[category as keyof typeof allowedFileTypes].includes(
          file.type
        )
      );

      if (!fileTypeCategory) {
        throw new Error("File type is not allowed!");
      }

      const uploadType = fileTypeCategory === "images" ? "image" : "raw";

      const finalFolder =
        folderDestination === "vendor" && name
          ? `vendor/${name}`
          : folderDestination;

      const { data } = await API.get("/cloudinary/get-signature", {
        params: { folder: finalFolder, fileName: file.name },
      });

      const { cloud_name, api_key, signature, timestamp, folder } = data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);

      const url = await API.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${uploadType}/upload`,
        formData
      );

      return url.data.secure_url;
    },

    onError: () => {
      throw new Error("Gagal mengunggah file!");
    },
  });

  return {
    isLoading: uploadFile.isPending,
    url: uploadFile.data,
    uploadFile: uploadFile.mutateAsync,
    error: uploadFile.error,
  };
};

export default useUploadFile;
