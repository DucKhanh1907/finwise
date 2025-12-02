import AppButton from '@/components/AppButton';
import AppDatePicker from '@/components/AppDatePickerModal';
import AppTextInput from '@/components/AppTextInput';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import SafeScreen from '@/components/SafeScreen';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

const signUp = () => {
    const router = useRouter();
    const {t} = useTranslation();
    const { register, login } = useAuth();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);;
    const [loading, setLoading] = useState(false);
    const emailRef = useRef('');
    const fullNameRef = useRef('');
    const phoneNumberRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const handleRegester = async () => {
        if(!emailRef.current || !passwordRef.current || !fullNameRef.current || !phoneNumberRef.current || !confirmPasswordRef.current) {
            Alert.alert("Đăng ký","Vui lòng nhập đầy đủ thông tin");
            return;
        }
        setLoading(true);
        const response = await register(emailRef.current, passwordRef.current, fullNameRef.current, phoneNumberRef.current, selectedDate);
        setLoading(false);
        console.log('got result:', response.message);
        if(!response.success) {
            Alert.alert('Đăng ký', response.message);
        }else {
            Alert.alert('Đăng ký', t('signup_success'));
            router.replace('/signIn');
        }

    }
  return (
    <SafeScreen>
        <CustomKeyboardView>
            <View className='flex-1 items-center'>
                <View className='py-[20px]'>
                    <Text className='font-semibold text-[30px] text-center color-letterAndIcon'>{t('signup')}</Text>
                </View>
                <View className='flex-1 bg-bgGreen w-full rounded-t-[40px]'>
                    <ScrollView className='flex-1'>
                        <View className='flex-1 pt-[20px] px-[30px] items-center'>
                            <AppTextInput label={t('full_name')} placeholder='Nguyen Van A' icon="person" type='text' onChangeText={(value)=> fullNameRef.current = value}/>
                            <AppTextInput label={t('email')} placeholder='example@example.com' icon="mail" type='email' onChangeText={(value)=> emailRef.current = value}/>
                            <AppTextInput label={t('phone_number')} placeholder='093 123 3332' icon='phone-portrait' type='phone' onChangeText={(value)=> phoneNumberRef.current = value}/>
                            <AppDatePicker label={t('date_of_birth')} value={selectedDate} icon='calendar-outline' onChange={setSelectedDate}/>
                            <AppTextInput label={t('password')} placeholder={t('password')} icon="key" type='password' onChangeText={(value)=> passwordRef.current = value}/>
                            <AppTextInput label={t('confirm_password')} placeholder={t('confirm_password')} icon="key" type='password' onChangeText={(value)=> confirmPasswordRef.current = value}/>
                            <View className='items-center w-full'>
                                <Text className='text-center text-[12px]'>{t('agreement_prefix')}</Text>
                                <Pressable>
                                    <Text className='text-center text-[12px] font-semibold'>{t('terms_links')}</Text>
                                </Pressable>
                                <AppButton primary title={t('signup')} className='mt-3' onPress={handleRegester}/>
                                <View className='flex-row w-full justify-center mt-5'>
                                    <Text className='text-center text-[13px] mr-1'>{t('dont_have_account')}</Text>
                                    <Pressable onPress={()=>router.push('/signIn')}>
                                        <Text className='text-center text-[13px] color-blueButton'>{t('signin')}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </CustomKeyboardView>
    </SafeScreen>
  )
}

export default signUp