import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// IconCheckbox: a small, customizable checkbox-like icon converted from SVG
// Props:
// - size: number (width & height in px) — default 12
// - stroke: string (stroke color) — default '#052224'
// - strokeWidth: number — default 1
// - style: view style

export default function IconCheckbox({ size = 12, stroke = '#052224', strokeWidth = 1, style }:any) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <Path
          d="M10.1223 0.5H1.87774C1.11684 0.5 0.5 1.11684 0.5 1.87774V10.1223C0.5 10.8832 1.11684 11.5 1.87774 11.5H10.1223C10.8832 11.5 11.5 10.8832 11.5 10.1223V1.87774C11.5 1.11684 10.8832 0.5 10.1223 0.5Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M3.5 6.62603L5.30318 8.5L9.5 3.5"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
}
