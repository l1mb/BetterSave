import { BaseProps } from "@/types/props/defaultProps";
import Slider, { Settings } from "react-slick";

interface SliderProps extends BaseProps {
  settings: Settings;
}

function SliderWrapper({ children, settings }: SliderProps) {
  return <Slider {...settings}>{children}</Slider>;
}

export default SliderWrapper;
