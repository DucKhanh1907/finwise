import { IconKey, icons } from '@/assets/icons/IconHistory';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ItemHistory = ({item}:any) => {
    const categoryKey = item.category as IconKey;
    const IconComponent = icons[categoryKey];
  return (
    <TouchableOpacity className='mb-4'>
        <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center w-5/12 justify-between'>
                <View className='bg-oceanBlue w-[50px] h-[45px] items-center justify-center rounded-2xl'>
                    <IconComponent/>
                </View>
                <View>
                    <Text className='text-[13px] font-semibold'>{item.category}</Text>
                    <Text className='text-[10px] font-semibold color-oceanBlue'>{item.time}</Text>
                </View>
            </View>
            <View className='w-[1px] h-full bg-primary'></View>
            <View className='w-3/12 items-center'>
                <Text className='text-[12px]'>{item.name}</Text>
            </View>
            <View className='w-[1px] h-full bg-primary'></View>
            
            <View className='w-3/12 items-center'>
                <Text className='color-oceanBlue'>{item.amount}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ItemHistory