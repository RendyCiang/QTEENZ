import { HTMLAttributes, ReactNode, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useNavigate } from "react-router-dom";
import cn from "../../lib/util";
import LoadingSpinner from "@/assets/LoadingSpinner";

const buttonVariants = cva(
  "w-full py-3 rounded-md transition cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-violet-600 text-white hover:bg-violet-500 focus:ring-violet-400 focus:ring-2 focus:ring-offset-2",
        primaryRed:
          "bg-primary text-white hover:bg-red-500 focus:ring-red-800 focus:ring-2 focus:ring-offset-2",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        tertiary: "bg-primary text-white hover:bg-gray-300 focus:ring-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
        outline:
          "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
        outlineRed:
          "border border-primary text-gray-800 hover:bg-gray-200 focus:ring-primary",
        loginRegister:
          "bg-black text-white hover:bg-gray-800 transition duration-200 focus:ring-black focus:ring-2 focus:ring-offset-2",
        standardWord:
          "text-red-500 hover:text-red-400 hover:underline p-0 w-auto h-auto",
        underlinedWord:
          "text-gray-400 underline p-1 flex justify-start transition duration-300 hover:text-blue-600",
        underlineOnHoverAndClick:
          "relative p-0 w-auto h-auto transition-colors duration-200 group",
        createUpdateMenu:
          "rounded-[8px] w-full py-2 px-4 bg-primary text-white cursor-pointer hover:bg-primary-2nd",
        deleteMenu:
          "rounded-[8px] w-full py-2 px-4 bg-white border-1 border-primary text-primary cursor-pointer hover:bg-gray-200",
      },
      size: {
        xsm: "py-1 text-xs",
        sm: "py-1 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg",
        normalLg: "px-2 py-2 text-lg",
      },
      textColor: {
        white: "text-white",
        gray: "text-gray-800",
        lightGray: "text-gray-400",
        red: "text-red-500",
        blue: "text-blue-600",
        black: "text-black",
      },
      hoverTextColor: {
        lightGray: "hover:text-gray-400",
        blue: "hover:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = {
  children: ReactNode;
  toPage?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  initialActive?: boolean;
  underlineColor?: string;
  onActiveChange?: (isActive: boolean) => void;
} & HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  textColor,
  hoverTextColor,
  className,
  toPage,
  loading = false,
  disabled = false,
  type = "button",
  initialActive = false,
  underlineColor = "bg-primary",
  onActiveChange,

  ...props
}) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(initialActive);

  const handleClick = () => {
    if (toPage && !loading) {
      navigate(toPage);
    }

    if (variant === "underlineOnHoverAndClick") {
      const newActiveState = !isActive;
      setIsActive(newActiveState);
      if (onActiveChange) {
        onActiveChange(newActiveState);
      }
    }
  };

  return (
    <button
      disabled={loading || disabled}
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
          textColor:
            isActive && variant === "underlineOnHoverAndClick"
              ? textColor
              : textColor,
          hoverTextColor,
        }),
        className,
        loading || disabled ? "flex justify-center items-center" : ""
      )}
      onClick={handleClick}
      {...props}
    >
      {loading ? <LoadingSpinner /> : children}

      {variant === "underlineOnHoverAndClick" && (
        <span
          className={cn(
            "absolute bottom-2 left-0 w-full h-1 transition-transform duration-200 origin-left",
            underlineColor,
            isActive ? "scale-x-100" : "scale-x-0",
            "group-hover:scale-x-100"
          )}
        />
      )}
    </button>
  );
};

export default Button;
