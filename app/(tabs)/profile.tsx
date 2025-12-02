import EditProfile from '@/assets/icons/EditProfile'
import HelpsProfile from '@/assets/icons/HelpsProfile'
import LogoutProfile from '@/assets/icons/LogoutProfile'
import SecurityProfile from '@/assets/icons/SecurityProfile'
import SettingProfile from '@/assets/icons/SettingProfile'
import HeaderBack from '@/components/HeaderBack'
import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/context/authContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'

const profile = () => {
  const {t} =  useTranslation();
  const router = useRouter();
  const {user, logout} = useAuth();
  const handleLogout = async () => {
  try {
    console.log("Bắt đầu đăng xuất...");
    await logout(); // Gọi hàm logout từ context
    router.replace('/signIn'); // Chuyển hướng
    console.log("Đăng xuất thành công - đã chuyển sang màn hình đăng nhập");
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
  }
};
  return (
    <SafeScreen>
      <View className='flex-1 items-center'>
          <HeaderBack title={t('profile')} onPressBack={()=> router.back()}/>
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
              <TouchableOpacity className='w-full' onPress={()=> router.push('/screens/EditProfileScreen')}>
                <View className='flex-row'>
                  <View className='bg-oceanBlue w-[57px] h-[53px] rounded-3xl items-center justify-center'>
                    <EditProfile/>
                  </View>
                  <View className='justify-center ml-3'>
                    <Text className='text-[15px] font-semibold'>{t('edit_profile')}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className='w-full mt-5' onPress={()=>router.push('/screens/ChangePasswordScreen')}>
                <View className='flex-row'>
                  <View className='bg-oceanBlue w-[57px] h-[53px] rounded-3xl items-center justify-center'>
                    <SecurityProfile/>
                  </View>
                  <View className='justify-center ml-3'>
                    <Text className='text-[15px] font-semibold'>{t('security')}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className='w-full mt-5' onPress={()=>router.push('/screens/SettingScreen')}>
                <View className='flex-row'>
                  <View className='bg-oceanBlue w-[57px] h-[53px] rounded-3xl items-center justify-center'>
                    <SettingProfile/>
                  </View>
                  <View className='justify-center ml-3'>
                    <Text className='text-[15px] font-semibold'>{t('setting')}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className='w-full mt-5' onPress={()=>router.push('/screens/HelpScreen')}>
                <View className='flex-row'>
                  <View className='bg-oceanBlue w-[57px] h-[53px] rounded-3xl items-center justify-center'>
                    <HelpsProfile/>
                  </View>
                  <View className='justify-center ml-3'>
                    <Text className='text-[15px] font-semibold'>{t('help')}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className='w-full mt-5' onPress={handleLogout}>
                <View className='flex-row'>
                  <View className='bg-oceanBlue w-[57px] h-[53px] rounded-3xl items-center justify-center'>
                    <LogoutProfile/>
                  </View>
                  <View className='justify-center ml-3'>
                    <Text className='text-[15px] font-semibold'>{t('logout')}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </SafeScreen>
  )
}

export default profile