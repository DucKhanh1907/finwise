import IconNotification from '@/assets/icons/IconNotification'
import CategoryGrid from '@/components/categories/CategoryGrid'
import FinanceOverview from '@/components/FinanceOverview'
import SafeScreen from '@/components/SafeScreen'
import { useAuth } from '@/context/authContext'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useCategoriesViewModel } from '../viewmodels/useCategoriesViewModel'
import { useWalletsViewModel } from '../viewmodels/useWalletsViewModel'

const categories = () => {
  const {t} =  useTranslation();
  const {user} = useAuth();
  const router = useRouter();

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

  if (!user?.uid) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const { categories, loading, createCategory} = useCategoriesViewModel(user.uid);
  
  return (
    <SafeScreen>
      <View className='flex-1 items-center'>
        <View className='flex-row w-10/12 item-center justify-between'>
          <View className='w-[40px] h-[40px]'/>
          <Text className='text-[22px] font-semibold'>{t('categories')}</Text>
          <TouchableOpacity className='bg-lightGreen items-center justify-center rounded-full px-3 w-[40px] h-[40px]'>
            <IconNotification/>
          </TouchableOpacity>
        </View>
        <FinanceOverview totalBalance={totalBalance} totalExpense={totalExpense} persenExpense={percent_expense}/>
        <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] mt-5 items-center pb-[80px]'>
          <CategoryGrid
            categories={categories}
            onPressCategory={(cat) => router.push({
              pathname:'/screens/CategoryDetailScreen',
              params: {
                category : JSON.stringify(cat)
              }
            })}
            onAddCategory={(newCat)=>{createCategory(newCat)}}
          />
        </View>
      </View>
    </SafeScreen>
  )
}

export default categories