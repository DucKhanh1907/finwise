import AppButton from '@/components/AppButton'
import AppTextInput from '@/components/AppTextInput'
import CustomKeyboardView from '@/components/CustomKeyboardView'
import HeaderBack from '@/components/HeaderBack'
import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/context/authContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

const EditProfileScreen = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const {user, updateUser } = useAuth();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            setFullName(user.fullName || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user]);
    const handleSave = async () => {
        const res = await updateUser({
            email,
            fullName,
            phoneNumber
        });

        alert(res.message);
    };
  return (
    <SafeScreen>
        <CustomKeyboardView>

            <View className='flex-1 items-center'>
                <HeaderBack title={t('edit_profile')} onPressBack={()=>router.back()}/>
                    <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] items-center pb-[80px] mt-[60px]'>
                <View className='items-center absolute top-[-50px]'>
                <View className='bg-bgGreen rounded-full'>
                    <Ionicons name="person-circle" size={100} color="gray" />
                </View>
                <View className='mt-1 items-center'>
                    <Text className='text-[20px] font-bold'>{user?.fullName}</Text>
                </View>
                </View>
                <View className='w-10/12 flex-1 items-center mt-[120px]'>
                    <Text className='text-[20px] font-semibold w-full'>{t('account_settings')}</Text>
                    <View className='w-full mt-5'> 
                        <AppTextInput label={t('username')} placeholder='' value={fullName} icon="person" type='text' onChangeText={(value)=> setFullName(value)}/>
                        <AppTextInput label={t('phone_number')} placeholder='' value={phoneNumber}  icon='phone-portrait' type='phone' onChangeText={(value)=>  setPhoneNumber(value)}/>
                        <AppTextInput label={t('email')} placeholder='' value={email} icon="mail" type='email' onChangeText={(value)=> setEmail(value)}/>
                        <View className='ỉtems-center mt-5'>
                            <AppButton primary title={t('update_profile')} onPress={handleSave}/>
                        </View>
                    </View>

                </View>
            </View>
            </View>
        </CustomKeyboardView>
    </SafeScreen>
  )
}

export default EditProfileScreen