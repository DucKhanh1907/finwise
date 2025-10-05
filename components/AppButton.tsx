import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type AppButtonProps={
    primary?: boolean;
    title: string;
    onPress?: () => void;
}
const AppButton: React.FC<AppButtonProps> = ({primary, title, onPress}) => {
  return (
    <TouchableOpacity style={{minWidth: wp('50%')}} onPress={onPress} className={`px-[8px] py-[8px] rounded-full items-center ${
        primary ? 'bg-primary' : 'bg-ligtGreen'
      }`}>
        <Text className='text-[18px] text-center items-center color-letterAndIcon font-semibold'>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton