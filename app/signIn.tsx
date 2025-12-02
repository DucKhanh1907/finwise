import { View, Text, ScrollView, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SafeScreen from '@/components/SafeScreen';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import AppTextInput from '@/components/AppTextInput';
import AppButton from '@/components/AppButton';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FacebookIcon from '@/assets/icons/FacebookIcon';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';


const SignIn = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const {login} = useAuth();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if(!emailRef.current || !passwordRef.current) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if(!response.success) {
      Alert.alert(response.message);
    } else {
      router.push('/home');
    }
  };
  return (
    <SafeScreen>
        <CustomKeyboardView>
            <View className='flex-1 items-center'>
                <View className='py-[50px]'>
                    <Text className='font-semibold text-[30px] text-center color-letterAndIcon'>{t('welcome_finwise')}</Text>
                </View>
                <View className='flex-1 bg-bgGreen w-full rounded-t-[40px]'>
                    <ScrollView className='flex-1'>
                        <View className='flex-1 pt-[50px] px-[30px] items-center'>
                            <AppTextInput label={t('email')} placeholder='example@example.com' icon="mail" type='email' onChangeText={(value) => emailRef.current=value}/>
                            <AppTextInput label={t('password')} placeholder={t('password')} icon="key" type='password' onChangeText={(value) => passwordRef.current=value}/>
                            <Pressable  className='items-end w-full'>
                                    <Text className='text-center text-[13px] font-semibold'>{t('forgot_password_link')}</Text>
                            </Pressable>
                            <View className='mt-10 items-center' style={{width:wp('50%')}}>
                                <AppButton primary title={t('signin')} onPress={handleLogin} loading={loading}/>
                                <AppButton title={t('signup')} className='mt-3' onPress={()=>router.push('/signUp')}/>
                                <Pressable >
                                    <Text className='text-[14px] text-center font-semibold my-6' >{t('use_fingerprint_access')}</Text>
                                </Pressable>
                                <Text className='text-center text-[13px]'>{t('or_sign_up_with')}</Text>
                                <View className='flex-row mt-5'>
                                    <TouchableOpacity className='mr-4'>
                                        <FacebookIcon/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <GoogleIcon/>
                                    </TouchableOpacity>
                                </View>
                                <View className='flex-row w-full justify-center mt-5'>
                                    <Text className='text-center text-[13px] mr-1'>{t('dont_have_account')}</Text>
                                    <Pressable onPress={()=>router.push('/signUp')}>
                                        <Text className='text-center text-[13px] color-blueButton'>{t('signup')}</Text>
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

export default SignIn;