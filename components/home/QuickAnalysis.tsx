import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProgressCircle from '../ProgressCircle'
import SalaryIcon from '@/assets/icons/SalaryIcon'
import { useTranslation } from 'react-i18next'

type QuickAnalysisProps = {

}

const QuickAnalysis: React.FC<QuickAnalysisProps> = ({}) => {
    const {t} = useTranslation();
  return (
    <TouchableOpacity className='w-10/12 rounded-[40px] h-[150px]'>
        <View className='flex-row bg-primary size-full rounded-[40px] items-center justify-between p-8'>
            <View className='w-1/3'>
                <ProgressCircle
                    progress={50}
                    size={70}
                    strokeWidth={4}
                    color="#0068FF"
                    backgroundColor="#F1FFF3"
                />
                <Text className='text-center text-[12px]'>{t('savings_on_goals')}</Text>
            </View>
            <View className='w-[1px] h-full bg-bgGreen'></View>
            <View className='items-center h-full justify-between'>
                <View className='flex-row'>
                    <SalaryIcon/>
                    <View className='ml-2'>
                        <Text className='text-[12px]'>{t('revenue_last_week')}</Text>
                        <Text className='text-[15px] font-bold'>400.000 VNĐ</Text>
                    </View>
                </View>
                <View className='h-[1px] w-full bg-bgGreen'></View>
                <View className='flex-row'>
                    <SalaryIcon/>
                    <View className='ml-2'>
                        <Text className='text-[12px]'>{t('revenue_last_week')}</Text>
                        <Text className='text-[15px] font-bold'>400.000 VNĐ</Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default QuickAnalysis