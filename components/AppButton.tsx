import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Loading from './Loading';

type AppButtonProps = {
  primary?: boolean;
  title: string;
  onPress?: () => void;
  className?: string;
  loading ?: boolean;
};

const AppButton: React.FC<AppButtonProps> = ({ primary, title, onPress, className, loading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ minWidth: wp('50%') }}
      className={`px-[8px] py-[8px] rounded-full items-center justify-center 
        ${primary ? 'bg-primary' : 'bg-lightGreen'} ${className ?? ''}`}
    >
      {
        loading
        ?
          <Loading size={hp(4)}/>
        :
          <Text className="text-[18px] text-center text-letterAndIcon font-semibold">
            {title}
          </Text>
      }
    </TouchableOpacity>
  );
};

export default AppButton;
