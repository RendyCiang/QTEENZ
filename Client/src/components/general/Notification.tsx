import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface NotificationProps {
  count?: number;
  to?: string;
  onClick?: () => void;
}

export default function Notification({
  count = 0,
  to,
  onClick,
}: NotificationProps) {
  const content = (
    <div className="relative cursor-pointer group">
      <Icon
        icon="ion:notifcations"
        className="w-[36px] h-[36px] pt-3 mb-1.5 text-black group-hover:text-primary transition-colors duration-200"
      />
      {count > 0 && (
        <p className="p-[2px] absolute flex right-0 top-0 text-[12px] w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-primary text-white text-center justify-center items-center transition-colors duration-200">
          {count}
        </p>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
}
