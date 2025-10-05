import ChartIcon from "@/assets/icons/ChartIcon";
import AppButton from "@/components/AppButton";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {t} = useTranslation();
  return (
    <View className="flex-1 bg-bgGreen items-center justify-center">
      <ChartIcon/>
      <View className="items-center justify-center">
        <Text className="font-semibold text-[52px] color-primary">FinWise</Text>
        <Text>{t('slogan')}</Text>
      </View>
      <View className="mt-12">
        <AppButton primary title={t('signin')}/>
        <View className="mt-4">
          <AppButton title={t('signup')}/>
        </View>
        <TouchableOpacity className="items-center mt-2">
          <Text className="font-semibold text-[14px]">{t('forgot_password_link')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
