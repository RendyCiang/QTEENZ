import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export function getNamedDays(input?: number) {
  if (!input) return;
  return days[input - 1];
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Des",
];

export function getNamedMonth(input?: number) {
  if (!input) return;
  return months[input - 1];
}

export function formatTime(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatToRupiah(number?: number) {
  if (!number) return undefined;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export function formatDate(date?: string | null | Date) {
  if (typeof date === "string") date = new Date(date);
  if (!date) return undefined;
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
export const isBetweenDate = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return undefined;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = Date.now();
  return start.getTime() <= now && now <= end.getTime();
};

export const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (e) {
    return null;
  }
};

export function maskString(input?: string | null): string {
  if (!input) return "";
  if (input.length <= 4) return input; // Return as is if length is too short
  if (input.length >= 15)
    return input.slice(0, 2) + "*".repeat(12) + input.slice(-2);
  return input.slice(0, 2) + "*".repeat(8) + input.slice(-2);
}

export function getFileName(input?: string | null) {
  if (!input) return "";
  const fileName = input.substring(input.lastIndexOf("/") + 1);
  return fileName;
}

export function formatDateWithOffset(
  dateString: string | undefined,
  daysToAdd: number = 0
): string {
  if (!dateString) return "Tidak tersedia";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Format salah";

  // Tambah hari
  date.setDate(date.getDate() + daysToAdd);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatUpdateDate(
  shopStatus: string | undefined,
  updateAt: string | undefined
): string {
  if (shopStatus !== "Accepted") return "N/A";
  if (!updateAt) return "Tidak tersedia";

  const date = new Date(updateAt);
  if (isNaN(date.getTime())) return "Format salah";

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function extractPublicId(url: string): string {
  const basePattern =
    /\/upload\/v\d+\/(.+)\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/;
  const match = url.match(basePattern);

  if (match && match[1]) {
    return match[1]; // This is the public_id
  }

  throw new Error("Invalid Cloudinary URL format");
}

export function formatToIndoTime(isoString: string | null) {
  if (isoString === null || isoString === undefined) return;
  const date = new Date(isoString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
