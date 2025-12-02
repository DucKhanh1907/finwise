import React from "react";
import Svg, { Path } from "react-native-svg";

const AddCategories = (props:any) => (
  <Svg
    width={43}
    height={43}
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 20.2H41M21.0667 41V2"
      stroke="#F1FFF3"
      strokeWidth={4}
      strokeLinecap="round"
    />
  </Svg>
);

export default AddCategories;
