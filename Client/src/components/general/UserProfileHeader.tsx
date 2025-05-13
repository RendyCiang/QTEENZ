import React from "react";
import { HTMLAttributes } from "react";

type UserProfileHeaderProps = {
  username: string;
  profileImageUrl: string;
  imageSize?: number;
  fontWeight?: string;
  fontSize?: string;
} & HTMLAttributes<HTMLButtonElement>;

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  username,
  profileImageUrl,
  imageSize,
  fontWeight,
  fontSize,
  className,
}) => {
  return (
    <div className={"flex flex-row items-center gap-3 py-2" + className}>
      <div
        className="rounded-full overflow-hidden flex-shrink-0"
        style={{ width: imageSize, height: imageSize }}
      >
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${username}'s profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            {username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className={`${fontSize} ${fontWeight} tracking-wide uppercase`}>
        {username}
      </div>
    </div>
  );
};

export default UserProfileHeader;
