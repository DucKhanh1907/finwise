
import React from 'react';
import { StatusBar, View, ViewProps } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeScreenProps = ViewProps & {
  children: React.ReactNode;
  backgroundColor?: string;
};

export default function SafeScreen({
  children,
  backgroundColor = '#00D09E',
  style,
  ...props
}: SafeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    >
      <StatusBar
        backgroundColor='#00D09E'
        barStyle={'light-content'}
      />
      {children}
    </SafeAreaView>
  );
}
