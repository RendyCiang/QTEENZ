import { cva, type VariantProps } from "class-variance-authority";
import { useNavigate } from "react-router-dom";

const imageButtonVariants = cva(
  "flex items-center justify-center rounded-lg transition-all duration-300",
  {
    variants: {
      variant: {
        general: "text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        outline: "border border-gray-500 hover:bg-gray-200 text-gray-700",
      },
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-auto h-12",
      },
      shape: {
        square: "rounded-none",
        rounded: "rounded-lg",
        circle: "rounded-full",
      },
      imgBackground: {
        primary: "bg-primary",
      },
      hover:{
        underlineText: "hover:underline hover:opacity-85"
      },
    },
    defaultVariants: {
      variant: "general",
      size: "md",
      shape: "rounded",
    },
  }
);

interface ImageButtonProps extends VariantProps<typeof imageButtonVariants>{
  children?: string;
  imageSrc: string;
  altText?: string;
  toPage?: string;
  className?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  imageSrc,
  altText = "Button Image",
  toPage,
  children,
  variant,
  size,
  shape,
  hover,
  className,
}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if(toPage){
      navigate(toPage);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={imageButtonVariants({ variant, size, shape, hover, className })}
    >
      <div className="flex flex-row gap-5 place-items-center">
        <img src={imageSrc} alt={altText} className="w-8 h-8 object-contain" />
        <span className="hidden md:inline">{children}</span>
      </div>
    </button>
  );
};

export default ImageButton