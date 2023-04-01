import React, { useEffect } from "react";

interface DatePickerProps {
  start: Date;
  end: Date;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

function DatePicker({ start, end, handleIncrement, handleDecrement }: DatePickerProps) {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  useEffect(() => {
    console.log();
  }, [start, end]);

  return (
    <div className="flex text-lg">
      <button type="button" className="mx-7" onClick={handleDecrement}>
        {"<"}
      </button>
      <span className="w-64 text-center">
        {days[start.getDay()]}, {start.getDate()} {start.toLocaleString("default", { month: "long" })}-{" "}
        {days[end.getDay()]}, {end.getDate()} {end.toLocaleString("default", { month: "long" })}
      </span>
      <button type="button" className="mx-7" onClick={() => handleIncrement()}>
        {">"}
      </button>
    </div>
  );
}

export default DatePicker;
