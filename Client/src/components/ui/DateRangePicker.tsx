import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import "react-day-picker/dist/style.css";

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isSelectingStart, setIsSelectingStart] = useState(true);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    if (isSelectingStart) {
      onChange({ from: selectedDate, to: undefined });
      setIsSelectingStart(false);
    } else {
      const from = value.from;
      if (from && selectedDate < from) {
        onChange({ from: selectedDate, to: undefined });
        setIsSelectingStart(false);
      } else {
        onChange({ from, to: selectedDate });
        setIsSelectingStart(true);
      }
    }
  };

  const displayText =
    value.from && value.to
      ? `${format(value.from, "PPP", { locale: id })} - ${format(
          value.to,
          "PPP",
          { locale: id }
        )}`
      : value.from
      ? `${format(value.from, "PPP", { locale: id })} - Pilih tanggal akhir`
      : "Pilih rentang tanggal";

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[14px] hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{displayText}</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4  right-0">
          <DayPicker
            className="text-[14px]"
            mode="single"
            selected={isSelectingStart ? value.from : value.to}
            onSelect={handleSelect}
            locale={id}
            showOutsideDays
            modifiers={{
              range_start: value.from,
              range_end: value.to,
              range_middle:
                value.from && value.to
                  ? { from: value.from, to: value.to }
                  : undefined,
            }}
            classNames={{
              day: "p-2 hover:bg-gray-100 text-[14px]",
              day_selected: "text-white text-[14px]",
              day_range_middle: "bg-blue-100 text-blue-800 text-[14px]",
              range_start: "bg-blue-100 text-black font-bold !text-[14px]",
              range_end: "bg-blue-100 font-bold text-black text-[14px]",
              day_outside: "text-gray-400 text-[14px]",
              caption: "text-[14px] mb-2",
              nav_button: "p-1 hover:bg-gray-200 text-[14px]",
            }}
          />
        </div>
      )}
    </div>
  );
}
