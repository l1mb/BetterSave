import { useEffect } from "react";

const useKeyDown = (handler: (e: KeyboardEvent) => void, deps: unknown[] = []) => {
  useEffect(() => {
    document.addEventListener("keydown", handler);
    // clean up
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, deps);
};

export default useKeyDown;
