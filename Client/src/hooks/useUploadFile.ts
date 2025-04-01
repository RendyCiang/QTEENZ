import { API } from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const useUploadFile = () => {
  const uploadFile = useMutation({
    mutationFn: async ({
      file,
      folderDestination,
    }: {
      file: File;
      folderDestination: string;
    }) => {
      const { data } = await API.get("/cloudinary/get-signature", {
        params: { folder: folderDestination, fileName: file.name },
      });

      console.log(data);

      const { cloud_name, api_key, signature, timestamp, folder } = data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);

      const url = await API.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      return url.data.secure_url;
    },

    onError: (e) => {
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
