import React from "react";
import Svg, { Path } from "react-native-svg";

export default function ArrowDownIcon(props:any) {
  return (
    <Svg
      width={18}
      height={11}
      viewBox="0 0 18 11"
      fill="none"
      {...props}
    >
      <Path
        d="M1.38477 1.38355L8.5813 9.13672L15.7835 1.38355"
        stroke="#093030"
        strokeWidth={2.76899}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
