import IconCheckbox from '@/assets/icons/IconCheckbox'
import TotalBalance from '@/assets/icons/TotalBalance'
import TotalExpense from '@/assets/icons/TotalExpense'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

type FinanceOverviewProps = {
    totalBalance: number,
    totalExpense: number,
    persenExpense: number
}

const FinanceOverview: React.FC<FinanceOverviewProps> = ({ totalBalance, totalExpense, persenExpense }) => {
    const { t } = useTranslation();
    function getEvaluate(){
        if( persenExpense < 50){
            return t('expense_summary_good');
        }
        return t('expense_summary_not_good');
    }
    return (
        <View>
            <View className='flex-row w-10/12 justify-between mt-6'>
                <View className='w-5/12 items-center'>
                    <View className='flex-row items-center'>
                        <TotalBalance />
                        <Text className='ml-2'>{t('total_balance')}</Text>
                    </View>
                    <Text className='text-[18px] font-semibold color-bgGreen'>{totalBalance.toLocaleString('vi-VN')} <Text className='text-[12px]'>VNĐ</Text></Text>
                </View>
                <View className='bg-lightGreen w-[1px]'></View>
                <View className='w-5/12 items-center'>
                    <View className='flex-row items-center'>
                        <TotalExpense />
                        <Text className='ml-2'>{t('total_expense')}</Text>
                    </View>
                    <Text className='text-[18px] font-semibold color-oceanBlue'>-{totalExpense.toLocaleString('vi-VN')} <Text className='text-[12px]'>VNĐ</Text></Text>
                </View>
            </View>
            <View className='flex-row w-10/12 justify-between mt-3 bg-bgGreen h-8 rounded-full items-center'>
                <View style={{ width: `${persenExpense}%` }} className='bg-black rounded-full justify-center items-center h-full'>
                    <Text className='color-white text-[12px]'>{persenExpense}%</Text>
                </View>
                <Text className='text-[12px] mr-2'>{(totalBalance + totalExpense).toLocaleString('vi-VM')}VNĐ</Text>
            </View>
            <View className='flex-row mt-3 items-center justify-center'>
                <IconCheckbox/>
                <Text className='ml-2 text-[15px]'>{persenExpense}% {getEvaluate()}</Text>
            </View>
        </View>
    )
}

export default FinanceOverview