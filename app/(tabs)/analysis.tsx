import FinanceOverview from '@/components/FinanceOverview';
import HeaderBack from '@/components/HeaderBack';
import IncomeExpensesChart from '@/components/IncomeExpensesChart';
import SafeScreen from '@/components/SafeScreen';
import { useAuth } from '@/context/authContext';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTransactionsViewModel } from '../viewmodels/useTransactionsViewModel';
import { useWalletsViewModel } from '../viewmodels/useWalletsViewModel';

const analysis = () => {
  const {t} =  useTranslation();
  const {user} = useAuth();
  const router = useRouter();
  const {wallet, fetchWallet} = useWalletsViewModel(user?.uid);
  const {transactions, loadDailyData} = useTransactionsViewModel(user?.uid);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpenseBalance, setExpenseBalance] = useState(0);
  const [weeklyData, setWeeklyData] = useState<{ income: any; expense: any; }[] | undefined>();
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
    useEffect(()=>{
      if(wallet !== null){
        setTotalBalance(wallet.total_balance);
        setExpenseBalance(wallet.total_expense)
      }
    },[wallet])
    useFocusEffect(
      useCallback(() => {
        fetchWallet(); // Reload ví khi Home được focus lại
      }, [fetchWallet])
  );
    const percent_expense = Math.floor((totalExpenseBalance/(totalBalance + totalExpenseBalance)) * 100);
  return (
    <SafeScreen>
      <View className='flex-1 items-center'>
        <HeaderBack title={t('analysis')} onPressBack={()=>router.back()}/>
        <FinanceOverview totalBalance={totalBalance} totalExpense={totalExpenseBalance} persenExpense={percent_expense}/>
        <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] mt-5 items-center pb-[80px]'>
          <View className='mt-5 w-10/12 items-center'>
            <View className='flex-row mt-5 bg-lightGreen p-2 rounded-2xl mb-5'>
              <TouchableOpacity className={`w-1/3 items-center justify-center py-2 rounded-2xl ${selectedTab === 'daily' ? 'bg-primary' : ''}`} onPress={()=>setSelectedTab('daily')}>
                <Text className='text-[15px]'>{t('daily')}</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`w-1/3 items-center ustify-center py-2 rounded-2xl ${selectedTab === 'weekly' ? 'bg-primary' : ''}`} onPress={()=>setSelectedTab('weekly')}>
                <Text className='text-[15px]'>{t('weekly')}</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`w-1/3 items-center ustify-center py-2 rounded-2xl ${selectedTab === 'monthly' ? 'bg-primary' : ''}`} onPress={()=>setSelectedTab('monthly')}>
                <Text className='text-[15px]'>{t('monthly')}</Text>
              </TouchableOpacity>
            </View>
            <IncomeExpensesChart/>
          </View>
        </View>
      </View>
    </SafeScreen>
  )
}

export default analysis