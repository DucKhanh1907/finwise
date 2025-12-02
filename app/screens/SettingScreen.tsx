import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import HeaderBack from '@/components/HeaderBack';
import SafeScreen from '@/components/SafeScreen';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

const SettingScreen = () => {
    const {t} = useTranslation();
    const router = useRouter();
  return (
    <SafeScreen>
        <View className='flex-1 items-center'>
            <HeaderBack title={t('settings')} onPressBack={()=> router.back()}/>
            <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] items-center pb-[80px] mt-[60px]'>
                <View className='w-10/12 mt-10'>
                <TouchableOpacity>
                    <View className='flex-row items-center justify-between py-4 border-b border-primary'>
                        <Text className='text-[16px]'>{t('language')}</Text>
                        <ArrowRightIcon/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className='flex-row items-center justify-between py-4'>
                        <Text className='text-[16px]'>{t('delete_account')}</Text>
                        <ArrowRightIcon/>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeScreen>
  )
}

export default SettingScreen