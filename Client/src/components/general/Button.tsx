import { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "../../lib/util";

const buttonVariants = cva(
  "w-full py-3 rounded-md transition cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-violet-600 text-white hover:bg-violet-500 focus:ring-violet-400 focus:ring-2 focus:ring-offset-2",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        danger: 
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
        outline:
          "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
        loginRegister:
          "bg-black text-white rounded-2xl hover:bg-gray-800 transition focus:ring-black focus:ring-2 focus:ring-offset-2",
        underlinedWord:
          "text-gray-300 underline flex justify-start hover:text-blue-600",
      },
      size: {
        sm: "py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
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
} & HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

/*
type Props = {
  children: ReactNode;
};

export default function Button({
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement> & Props) {
  return (
    <button
      className={cn(
        "bg-violet-600 text-white w-full py-3 rounded-md mt-8 hover:bg-violet-500 transition cursor-pointer",
        props.className
      )}
    >
      {children}
    </button>
  );
}
*/
