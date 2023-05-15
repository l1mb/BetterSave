import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { NivoCalendarSegment } from "@/types/models";
import getFormatedString from "@/utils/getNivoFormatedString";

interface NivoCalendarProps {
  data: NivoCalendarSegment[];
  createDate: Date;
}

function NivoCalendar({ data, createDate }: NivoCalendarProps) {
  return (
    <ResponsiveCalendar
      data={data}
      from={createDate}
      to={getFormatedString(new Date())}
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={25}
      monthBorderWidth={0}
      monthBorderColor="#ffffff"
      monthLegendOffset={0}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
}

export default NivoCalendar;
