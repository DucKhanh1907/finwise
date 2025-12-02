import AppButton from '@/components/AppButton';
import BudgetsOverview from '@/components/categories/BudgetsOverview';
import HeaderBack from '@/components/HeaderBack';
import ListTransaction from '@/components/ListTransaction';
import SafeScreen from '@/components/SafeScreen';
import { useAuth } from '@/context/authContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useTransactionsViewModel } from '../viewmodels/useTransactionsViewModel';

interface Category {
  id: string;
  name: string;
  type: string;
  isDefault: boolean;
  createdAt: {
    nanoseconds: number;
    seconds: number;
    type: string;
  };
}

const CategoryDetailScreen = () => {
    const { category: categoryParam } = useLocalSearchParams();
    const { t } = useTranslation();
    const router = useRouter();
    const { user } = useAuth();
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);
    
    const {transactions, getCurrentMonthTransactionTotalByCategory, getTransactionsOfCategory } = useTransactionsViewModel(user?.uid);

    useEffect(() => {
        if (categoryParam) {
            try {
                const categoryData = JSON.parse(categoryParam as string);
                setCategory(categoryData);
            } catch (error) {
                console.error('Lỗi parse category:', error);
            }
        }
    }, [categoryParam]);

    useEffect(() => {
        const fetchExpense = async () => {
            if (category?.id && user?.uid) {
                setLoading(true);
                try {
                    const [expense, categoryTransactions] = await Promise.all([
                        getCurrentMonthTransactionTotalByCategory(category.id),
                        getTransactionsOfCategory(category.id)
                    ]);
                    const expenseNumber = Number(expense) || 0;
                    setMonthlyExpense(expenseNumber);
                } catch (error) {
                    console.error('Lỗi khi lấy tổng chi tiêu:', error);
                    setMonthlyExpense(0);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchExpense();
    }, [category?.id, user?.uid, getCurrentMonthTransactionTotalByCategory]);

    if (!category) {
        return (
            <SafeScreen>
                <View className="flex-1 justify-center items-center">   
                    <Text>Đang tải thông tin...</Text>
                </View>
            </SafeScreen>
        );
    }

    return (
        <SafeScreen>
            <View className='flex-1 items-center'>
                <HeaderBack title={category.name} onPressBack={() => router.back()}/>
                <BudgetsOverview expense={monthlyExpense}/>
                <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] mt-5 items-center pb-5'>
                    <View className='flex-1 bg-bgGreen w-10/12 rounded-t-[40px] mt-5 pt-5'>
                        <ListTransaction transactions={transactions}/>
                    </View>
                    <View>
                        <AppButton primary title= {t('add_expenses')} onPress={()=>router.push('/screens/AddExpensesScreen')}/>
                    </View>
                </View>
            </View>
        </SafeScreen>
    );
}

export default CategoryDetailScreen;