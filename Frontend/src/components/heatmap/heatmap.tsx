import moment from "moment";
import React, { useEffect, useState } from "react";
import { Tooltip, Whisper } from "rsuite";

export interface HeatMapProps {
  data: string[];
  height: number;
  width: number;
  label: string;
}

function HeatMap({ data, height, width, label }: HeatMapProps) {
  const [daysCount, setDeysCount] = useState(0);
  const [newData, setNewData] = useState<Date[]>([]);

  useEffect(() => {
    if (data) {
      const min = Math.min(...data.map((x) => new Date(x).getTime()));
      const nowTime = new Date().getTime();
      const daysNumber = Math.ceil((nowTime - min) / (1000 * 3600 * 24));
      setDeysCount(daysNumber);
      const tempArr = [];
      for (let index = 0; index < daysNumber; index++) {
        tempArr.push(moment(min).add(index, "d").toDate());
      }
      setNewData(tempArr);
    }
  }, [data]);

  return (
    <>
      <span className="mb-3 font-bold uppercase">{label}</span>
      <div style={{ width: `min-content`, height: `${height}px` }} className="flex flex-col flex-wrap gap-1 ">
        {newData.map((date, index) => (
          <div
            className={`flex h-4 w-4 rounded-sm ${
              moment(date).format("l") === moment(new Date()).format("l") ? "animate-pulse bg-violet-400" : ""
            } ${new Date(date).getMonth() !== new Date(data[index - 1]).getMonth() ? "pr-2" : "px-1"} ${
              data.map((x) => moment(x).format("l")).includes(moment(date).format("l"))
                ? "bg-violet-700"
                : "bg-violet-100"
            }`}
          >
            {data.map((x) => moment(x).format("l")).includes(moment(date).format("l")) && (
              <Whisper
                trigger="hover"
                placement="auto"
                controlId={`control-id-${date}`}
                speaker={
                  <Tooltip>
                    {moment(date).format("l") === moment(new Date()).format("l")
                      ? "Сегодня"
                      : `Дата выполнения: ${moment(date).format("l")}`}
                  </Tooltip>
                }
              >
                <div className="h-4 w-4" />
              </Whisper>
            )}
          </div>
        ))}
      </div>

      <span className="font-light text-gray-400">С даты создания цели прошло: {daysCount} дней</span>
      <div className="mt-2 flex flex-col">
        <div>
          <div className="h-4 w-4 bg-violet-700" />
          <span>Цель выполнена в этот день</span>
        </div>
        <div>
          <div className="h-4 w-4 bg-violet-100" />
          <span>Цель не выполнена в этот день</span>
        </div>
        <div>
          <div className="h-4 w-4 animate-pulse bg-violet-400" />
          <span>Сегодня</span>
        </div>
      </div>
    </>
  );
}

export default HeatMap;
