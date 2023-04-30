import { useState, useLayoutEffect } from "react";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      console.log(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", updateSize);
    // updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return { isMobile };
}

export default useWindowSize;
