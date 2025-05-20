import { useEffect, useState } from "react";

const LoadingText = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // 0 to 3
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <p>Loading{".".repeat(dotCount)}</p>;
};

export default LoadingText;
