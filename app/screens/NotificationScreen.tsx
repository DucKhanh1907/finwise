import DollarIcon from '@/assets/icons/DollarIcon';
import ReminderIcon from '@/assets/icons/ReminderIcon';
import StarIcon from '@/assets/icons/StarIcon';
import HeaderBack from '@/components/HeaderBack';
import SafeScreen from '@/components/SafeScreen';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

const NotificationScreen = () => {
    const {t} =  useTranslation();
    const router = useRouter();
  return (
    <SafeScreen>
        <View className='flex-1 items-center'>
            <HeaderBack title={t('notification')} onPressBack={()=>router.back()}/>
            <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] mt-5 items-center pb-[80px]'>
                <View className='mt-5 w-10/12'>
                    <TouchableOpacity className='border-b-[1px] border-b-primary pb-2 pt-5'>
                        <View className='flex-row items-center'>
                            <View className='w-[37px] h-[37px] items-center justify-center rounded-2xl bg-primary'>
                                <ReminderIcon/>
                            </View>
                            <View className='w-9/12 ml-3'>
                                <Text className='text-[15px] font-semibold'>Reminder!</Text>
                                <Text className='text-[13px]'>Set up your automatic savings to meet your savings goal...</Text>
                            </View>
                        </View>
                        <View className='items-end'>
                            <Text className='text-[13px] color-oceanBlue'>17:00 - April 24</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className='border-b-[1px] border-b-primary pb-2 pt-5'>
                        <View className='flex-row items-center'>
                            <View className='w-[37px] h-[37px] items-center justify-center rounded-2xl bg-primary'>
                                <StarIcon/>
                            </View>
                            <View className='w-9/12 ml-3'>
                                <Text className='text-[15px] font-semibold'>New update!</Text>
                                <Text className='text-[13px]'>Set up your automatic savings to meet your savings goal...</Text>
                            </View>
                        </View>
                        <View className='items-end'>
                            <Text className='text-[13px] color-oceanBlue'>17:00 - April 24</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className='border-b-[1px] border-b-primary pb-2 pt-5'>
                        <View className='flex-row items-center'>
                            <View className='w-[37px] h-[37px] items-center justify-center rounded-2xl bg-primary'>
                                <DollarIcon/>
                            </View>
                            <View className='w-9/12 ml-3'>
                                <Text className='text-[15px] font-semibold'>Transactions</Text>
                                <Text className='text-[13px]'>A new transaction has been registered</Text>
                            </View>
                        </View>
                        <View className='items-end'>
                            <Text className='text-[13px] color-oceanBlue'>17:00 - April 24</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeScreen>
  )
}

export default NotificationScreen