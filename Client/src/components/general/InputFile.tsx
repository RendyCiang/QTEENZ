import React, { useRef } from "react";
import { X, FileText } from "lucide-react";
import { FieldValues } from "react-hook-form";

type InputFile<T extends FieldValues> = {
  label: string;
  value: File | null;
  onChange: (newValue: File | null) => void;
  required?: boolean;
  name: string;
  errorMsg: string;
  linkTemplate: string;
};

const InputFile = <T extends FieldValues>({
  label,
  value,
  onChange,
  required = false,
  name,
  errorMsg = "",
  linkTemplate = "",
}: InputFile<T>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2.5">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-gray-800 font-medium text-[16px] flex items-center gap-1 max-sm:text-[14px]">
          {label}
          {required && <span className="text-primary">*</span>}
        </label>

        <a
          href={linkTemplate}
          download={linkTemplate}
          className="text-gray-400 underline cursor-pointer hover:opacity-80"
        >
          unduh template
        </a>
      </div>

      {/* Input Box */}
      <div
        className={`relative w-full p-6 outline-1 outline-dashed rounded-md text-[14px] flex flex-col items-center cursor-pointer hover:opacity-80 ${
          value ? "border-primary bg-gray-100" : "outline-gray-400"
        }`}
        onClick={() => {
          if (value) {
            const fileURL = URL.createObjectURL(value);
            window.open(fileURL, "_blank"); // Open file in a new tab
          } else {
            fileInputRef.current?.click(); // Open file input
          }
        }}
      >
        {/* File Preview */}
        {value ? (
          <div className="flex items-center gap-2">
            <FileText size={24} className="text-gray-600" />
            <p className="truncate max-w-[200px]">{value.name}</p>
          </div>
        ) : (
          <>
            <img src="/Misc/uploadFile.svg" alt="Upload File" />
            <p className="text-md">
              Seret file Anda atau <span className="text-primary">cari</span>
            </p>
            <p className="text-sm text-gray-400">Max hanya file 10 MB</p>
          </>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          className="hidden"
          name={name}
          ref={fileInputRef}
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            onChange(file);
          }}
        />

        {/* "X" Button to Remove File */}
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

export default InputFile;
