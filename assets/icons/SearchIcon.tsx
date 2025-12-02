import React from "react";
import Svg, { Path } from "react-native-svg";

export default function SearchIcon(props:any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M13.5321 13.5321L16.75 16.75M15.7221 8.23603C15.7221 12.3705 12.3705 15.7221 8.23603 15.7221C4.10161 15.7221 0.75 12.3705 0.75 8.23603C0.75 4.10161 4.10161 0.75 8.23603 0.75C12.3705 0.75 15.7221 4.10161 15.7221 8.23603Z"
        stroke="#093030"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
