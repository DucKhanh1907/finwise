import IconNotification from '@/assets/icons/IconNotification'
import AppButton from '@/components/AppButton'
import FinanceOverview from '@/components/FinanceOverview'
import QuickAnalysis from '@/components/home/QuickAnalysis'
import ItemHistory from '@/components/ItemHistory'
import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/context/authContext'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useWalletsViewModel } from '../viewmodels/useWalletsViewModel'

const Home = () => {
  const {user} = useAuth();
  const router = useRouter();
  const {t} = useTranslation();

  const {wallet, fetchWallet} = useWalletsViewModel(user?.uid);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpense, setExpenseBalance] = useState(0);
  
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
  const percent_expense = Math.floor((totalExpense/(totalBalance + totalExpense)) * 100);
  const [selected, setSelected] = useState('daily');
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return t('good_morning');
    } else if (hour >= 12 && hour < 18) {
      return t('good_afternoon');
    } else {
      return t('good_evening');
    }
  };
  const transactions = [
  {
    id: "1",
    category: "Salary",
    time: "18:27 - April 30",
    name: "Monthly",
    amount: "$4.000,00",
    positive: true,
  },
  {
    id: "2",
    category: "Groceries",
    time: "17:00 - April 24",
    name: "Pantry",
    amount: "-$100,00",
  },
  {
    id: "3",
    category: "Rent",
    time: "8:30 - April 15",
    name: "Rent",
    amount: "-$674,40",
  },
];
  return (
    <SafeScreen>
      <View className='flex-1 items-center'>
        <View className='flex-row w-10/12 justify-between'>
          <View>
            <Text className='text-[22px] font-semibold'>{t('hi')}, {user?.fullName}</Text>
            <Text className='text-[14px]'>{getGreeting()}</Text>
          </View>
          <TouchableOpacity className='bg-lightGreen items-center justify-center rounded-full px-3 w-[40px] h-[40px]'>
            <IconNotification/>
          </TouchableOpacity>
        </View>
        <FinanceOverview totalBalance={totalBalance} totalExpense={totalExpense} persenExpense={percent_expense}/>
        <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] mt-5 pb-[80px]'>
          <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <View className='flex-1 items-center pt-8'>
              <QuickAnalysis/>
              <View className='w-10/12 mt-3 bg-lightGreen rounded-[20px] px-4 py-2'>
                <View className='flex-row justify-between'>
                  
                  <TouchableOpacity onPress={()=>{setSelected('daily')}} className={`${selected == 'daily' ? 'bg-primary' : ''} py-3 px-4 rounded-[15px] w-1/3 items-center`}>
                    <Text className='text-[15px]'>{t('daily')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{setSelected('weekly')}} className={`${selected == 'weekly' ? 'bg-primary' : ''} py-3 px-4 rounded-[15px] w-1/3 items-center`}>
                    <Text className='text-[15px]'>{t('weekly')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{setSelected('monthly')}} className={`${selected == 'monthly' ? 'bg-primary' : ''} py-3 px-4 rounded-[15px] w-1/3 items-center`}> 
                    <Text className='text-[15px]'>{t('monthly')}</Text>
                  </TouchableOpacity>
                </View>
              </View>  
              <View className='flex-1 w-10/12'>
                <FlatList
                  data={transactions}
                  keyExtractor={(item)=>item.id}
                  style={{flex:1, marginTop: 12}}
                  scrollEnabled={false}
                  renderItem={({item})=>
                    <ItemHistory item={item}/>
                }
                />
              </View>
              <AppButton primary title= {t('add_expenses')} onPress={()=>router.push('/screens/AddExpensesScreen')}/>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeScreen>
  )
}

export default Home