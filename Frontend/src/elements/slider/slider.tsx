import { BaseProps } from "@/types/props/defaultProps";
import { RefObject } from "react";
import Slider, { Settings } from "react-slick";

interface SliderProps extends BaseProps {
  settings: Settings;
  ref: RefObject<Slider>;
}

function SliderWrapper({ children, settings }: SliderProps) {
  return <Slider {...settings}>{children}</Slider>;
}

export default SliderWrapper;
