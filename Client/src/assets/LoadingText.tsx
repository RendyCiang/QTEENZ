import { useEffect, useState } from "react";

type LoadingTextProps = {
  className?: string;
};

const LoadingText = ({ className }: LoadingTextProps) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // 0 to 3
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <p className={className}>Loading{".".repeat(dotCount)}</p>;
};

export default LoadingText;
