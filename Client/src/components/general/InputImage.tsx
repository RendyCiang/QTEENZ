import React, { useRef } from "react";
import { X } from "lucide-react";
import { FieldValues } from "react-hook-form";

type InputImage<T extends FieldValues> = {
  label: string;
  value: File | null;
  onChange: (newValue: File | null) => void;
  required?: boolean;
  name?: string;
  errorMsg: string;
  disabledState?: boolean;
};

const InputImage = <T extends FieldValues>({
  label,
  value,
  onChange,
  required = false,
  name,
  errorMsg = "",
  disabledState,
}: InputImage<T>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert File to Blob URL for preview
  const imageUrl = value ? URL.createObjectURL(value) : null;

  return (
    <div className="flex flex-col gap-2.5">
      {/* Label */}
      <label className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>

      {/* Input Box */}
      <div
        className={`relative w-full p-10 outline-1 outline-dashed rounded-md text-[14px] flex flex-col items-center  hover:opacity-80 ${
          disabledState ? "cursor-not-allowed" : "cursor-pointer"
        } ${value ? "border-primary bg-gray-100" : "outline-gray-400"}`}
        onClick={() => {
          if (value && imageUrl) {
            window.open(imageUrl, "_blank");
          } else {
            fileInputRef.current?.click();
          }
        }}
      >
        {/* Preview Image */}
        {value && imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-w-full max-h-24 rounded-md"
          />
        ) : (
          <>
            <img src="/Misc/uploadGambar.svg" alt="Upload Gambar" />
            <p className="text-md text-nowrap">
              Seret gambar Anda atau <span className="text-primary">cari</span>
            </p>
            <p className="text-sm text-gray-400">Max hanya 10 MB</p>
          </>
        )}

        {/* Hidden File Input */}
        <input
          disabled={disabledState}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png"
          name={name}
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            onChange(file);
          }}
        />

        {/* "X" Button to Remove Image */}
        {value && (
          <button
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening file dialog
              onChange(null);
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <p className="text-primary text-sm">{errorMsg ? errorMsg : " "}</p>
    </div>
  );
};

export default InputImage;
