import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export default function ContactInstagramIcon(props:any) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      {...props}
    >
      <Path
        d="M14.4531 0.650391H3.84767C2.08186 0.650391 0.650391 2.08186 0.650391 3.84767V14.4531C0.650391 16.2189 2.08186 17.6504 3.84767 17.6504H14.4531C16.2189 17.6504 17.6504 16.2189 17.6504 14.4531V3.84767C17.6504 2.08186 16.2189 0.650391 14.4531 0.650391Z"
        stroke="#093030"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={14.1768}
        cy={4.33398}
        r={0.65}
        fill="#093030"
        stroke="#093030"
        strokeWidth={0.7}
      />
    </Svg>
  );
}
