import ChartIcon from "@/assets/icons/ChartIcon";
import AppButton from "@/components/AppButton";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const {t} = useTranslation();
  return (
    <View className="flex-1 bg-bgGreen items-center justify-center">
      <ChartIcon/>
      <View className="items-center justify-center">
        <Text className="font-semibold text-[52px] color-primary">FinWise</Text>
        <Text>{t('slogan')}</Text>
      </View>
      <View className="mt-12">
        <AppButton primary title={t('signin')} onPress={()=> router.push('/signIn')}/>
        <View className="mt-4">
          <AppButton title={t('signup')} onPress={()=>router.push('/signUp')}/>
        </View>
        <TouchableOpacity className="items-center mt-2">
          <Text className="font-semibold text-[14px]">{t('forgot_password_link')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
