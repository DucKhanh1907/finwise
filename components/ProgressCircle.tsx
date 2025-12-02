import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import CarIcon from "@/assets/icons/CarIcon";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressCircleProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress = 75,
  size = 100,
  strokeWidth = 8,
  color = "#007AFF",
  backgroundColor = "#E6FFF8",
  style,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withTiming(progress, {
      duration: 1500,
      easing: Easing.out(Easing.ease),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference - (circumference * animatedValue.value) / 100,
  }));

  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size}>
        {/* Vòng tròn nền */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // 🔥 Xoay vòng 12h
        />
        {/* Vòng tròn tiến trình */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // 🔥 Xoay vòng 12h
        />
      </Svg>

      {/* Icon ở giữa */}
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <CarIcon/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProgressCircle;
