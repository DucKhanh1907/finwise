import ExpenseTransaction from '@/assets/icons/ExpenseTransaction'
import IncomeTransaction from '@/assets/icons/IncomeTransaction'
import HeaderBack from '@/components/HeaderBack'
import ListTransaction from '@/components/ListTransaction'
import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTransactionsViewModel } from '../viewmodels/useTransactionsViewModel'
import { useWalletsViewModel } from '../viewmodels/useWalletsViewModel'

const transactions = () => {
  const {t} =  useTranslation();
  const router = useRouter();
  const {user} = useAuth();
  const {wallet, fetchWallet} = useWalletsViewModel(user?.uid);
  const {transactions} = useTransactionsViewModel(user?.uid);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpense, setExpenseBalance] = useState(0);
  useEffect(()=>{
      if(wallet !== null){
        setTotalBalance(wallet.total_balance);
        setExpenseBalance(wallet.total_expense)
      }
    },[wallet])
  return (
    <SafeScreen>
      <View className='flex-1 items-center'>
        <HeaderBack title={t('transaction')} onPressBack={()=>{router.back()}}/>
        <View className='w-10/12 mt-4'>
          <View className='bg-bgGreen items-center py-3 rounded-2xl'>
            <Text className='text-[15px]'>{t('total_balance')}</Text>
            <Text className='text-[22px] font-bold'>{totalBalance.toLocaleString('vi-VN')} VNĐ</Text>
          </View>
          <View className='flex-row w-full'>
            <TouchableOpacity className='w-6/12 mr-2'>
              <View className='bg-bgGreen items-center py-3 mt-4 rounded-2xl'>
                <IncomeTransaction/>
                <Text className='text-[15px]'>{t('income')}</Text>
                <Text className='text-[18px] font-bold'>{(totalBalance + totalExpense).toLocaleString('vi-VN')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className='w-6/12'>
              <View className='bg-bgGreen items-center py-3 mt-4 rounded-2xl'>
                <ExpenseTransaction/>
                <Text className='text-[15px]'>{t('expense')}</Text>
                <Text className='text-[18px] font-bold'>{(totalExpense).toLocaleString('vi-VN')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] items-center pb-[80px] mt-5'>
           <View className='flex-1 bg-bgGreen w-10/12 rounded-t-[40px] mt-5 pt-5'>
              <ListTransaction transactions={transactions}/>
          </View>
        </View>
      </View>
    </SafeScreen>
  )
}

export default transactions