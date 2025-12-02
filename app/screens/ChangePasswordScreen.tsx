import AppButton from '@/components/AppButton'
import AppTextInput from '@/components/AppTextInput'
import CustomKeyboardView from '@/components/CustomKeyboardView'
import HeaderBack from '@/components/HeaderBack'
import SafeScreen from '@/components/SafeScreen'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

const ChangePasswordScreen = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
  return (
    <SafeScreen>
        <CustomKeyboardView>
            <View className='flex-1 items-center'>
                <HeaderBack title={t('change_password')} onPressBack={()=>router.back()}/>
                <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] items-center pb-[80px] mt-[60px]'>
                    <View  className='w-10/12 mt-5'>
                        <AppTextInput label={t('current_password')} type='password' onChangeText={(value)=> {}}/>
                        <AppTextInput label={t('new_password')} type='password' onChangeText={(value)=> {}}/>
                        <AppTextInput label={t('confirm_password')} type='password' onChangeText={(value)=> {}}/>
                        <View className='mt-5'>
                            <AppButton primary title={t('change_password')} onPress={()=>{}}/>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    </SafeScreen>
  )
}

export default ChangePasswordScreen