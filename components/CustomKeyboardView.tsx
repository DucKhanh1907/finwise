import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform, ViewProps } from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;
}

const CustomKeyboardView: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={Platform.OS === 'ios' ? 80 : 100} // khoảng cách đẩy lên
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default CustomKeyboardView;
