import React from 'react';
import Svg, { Path } from 'react-native-svg';


const IconBack = ({ width = 21, height = 18, color = '#F1FFF3', style, ...props } :any) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 18"
      fill="none"
      style={style}
      accessibilityRole="image"
      {...props}
    >
      <Path
        d="M11.5642 1L0.999999 8.99685M0.999999 8.99685L11.5642 17M0.999999 8.99685L20 8.99686"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default IconBack;
