import React, { useEffect, useState } from "react";

type CoolLineProps = {
  time?: number;
  extraClassName?: string;
};

const CoolLine: React.FC<CoolLineProps> = ({ time, extraClassName }) => {
  const [start, setStart] = useState(false);
  const finishDest = "w-full";
  const startPos = "w-0";

  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, time || 100);
  }, []);

  return (
    <div
      className={`${
        extraClassName || ""
      } h-[1px] bg-violet-600  transition-all  duration-1000 ease-in-out ${
        start ? finishDest : startPos
      }`}
    />
  );
};

export default CoolLine;
