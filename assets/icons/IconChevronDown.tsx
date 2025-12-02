import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const IconChevronDown: React.FC<Props> = ({
  width = 11,
  height = 7,
  color = "#00D09E",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11 7"
      fill="none"
      accessibilityRole="image"
    >
      <Path
        d="M0.865234 0.864784L5.36346 5.71094L9.86523 0.864783"
        stroke={color}
        strokeWidth={1.73077}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default IconChevronDown;
