import React from "react";
import Svg, { Path } from "react-native-svg";

const TabTransactions = (props: any) => (
  <Svg
    width={35}
    height={27}
    viewBox="0 0 35 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.7793 13.5056H24.0604V18.5395L34 9.76975L24.0604 1V6.03386H14.7793M20.2207 13.4944H10.9396V8.4605L1 17.2302L10.9396 26V20.9661H20.2207"
      stroke="#052224"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TabTransactions;
