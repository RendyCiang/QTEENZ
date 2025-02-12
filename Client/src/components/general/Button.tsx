import { HTMLAttributes, ReactNode } from "react";
import cn from "../../lib/util";

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
