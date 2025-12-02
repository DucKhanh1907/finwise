import React from "react";
import Svg, { Path } from "react-native-svg";

export default function ArrowRightIcon(props:any) {
  return (
    <Svg
      width={10}
      height={16}
      viewBox="0 0 10 16"
      fill="none"
      {...props}
    >
      <Path
        d="M1.25 14.25L8.25 7.75256L1.25 1.25"
        stroke="#093030"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
