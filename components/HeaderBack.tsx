import IconBack from '@/assets/icons/IconBack';
import IconNotification from '@/assets/icons/IconNotification';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HeaderBackProps{
    title: string,
    onPressBack: ()=>void;

}

const HeaderBack: React.FC<HeaderBackProps> = ({title, onPressBack}) => {
  const router = useRouter();
  return (
    <View className='w-10/12 flex-row justify-between items-center'>
      <TouchableOpacity className='w-2/12' onPress={onPressBack}>
        <IconBack/>
      </TouchableOpacity>
      <View>
        <Text className='text-[22px] font-semibold'>{title}</Text>
      </View>
      <View className='w-2/12 items-end'>
        <TouchableOpacity className='bg-lightGreen items-center justify-center rounded-full px-3 w-[40px] h-[40px]' onPress={()=>router.push('/screens/NotificationScreen')}>
            <IconNotification/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HeaderBack