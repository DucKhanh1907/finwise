// components/SimpleTransactionList.tsx
import { useCategoriesViewModel } from '@/app/viewmodels/useCategoriesViewModel';
import { IconKey, icons } from '@/assets/icons/IconHistory';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface Transaction {
  id: string;
  amount: number;
  title: string;
  note: string;
  date: any;
  type: 'expense' | 'income';
  categoryId: string;
}

interface Category {
  id?: string;
  name: string;
  type: string;
  isDefault: boolean;
  createdAt?: any;
}

interface CategoryMap {
  [categoryId: string]: Category;
}

const ListTransaction: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const { getCategory } = useCategoriesViewModel();
  const [categories, setCategories] = useState<CategoryMap>({}); // Lưu tất cả categories

  // Load categories cho tất cả transactions
  useEffect(() => {
    const loadCategories = async () => {
      const categoryMap: CategoryMap = {};
      
      // Lấy categoryIds duy nhất
      const uniqueCategoryIds = Array.from(new Set(transactions.map(t => t.categoryId)));
      
      // Load từng category
      for (const categoryId of uniqueCategoryIds) {
        try {
          const category = await getCategory(categoryId) as Category | null;
          if (category) {
            categoryMap[categoryId] = category;
          }
        } catch (error) {
          console.error('Lỗi khi lấy category:', error);
        }
      }
      
      setCategories(categoryMap);
    };

    if (transactions.length > 0) {
      loadCategories();
    }
  }, [transactions, getCategory]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const formatDate = (date: any) => {
    if (!date) return 'No date';
    const d = date?.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Component cho mỗi item - KHÔNG DÙNG HOOK Ở ĐÂY
  const TransactionItem = useCallback(({ item }: { item: Transaction }) => {
    const category = categories[item.categoryId];
    const categoryName = category?.name || 'Unknown';
    const categoryKey = categoryName as IconKey;
    const IconComponent = icons[categoryKey] || icons["Salary"];

    return (
      <TouchableOpacity className='mb-4'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center w-6/12'>
            <View className='bg-oceanBlue w-[50px] h-[45px] items-center justify-center rounded-2xl'>
              <IconComponent />
            </View>
            <View className='ml-2'>
              <Text className='text-[12px] font-semibold'>{categoryName}</Text>
              <Text className='text-[10px] font-semibold color-oceanBlue'>
                {formatDate(item.date)}
              </Text>
            </View>
          </View>
          
          <View className='w-[1px] h-full bg-primary'></View>
          
          <View className='w-2/12 items-center'>
            <Text className='text-[12px] text-center'>{item.title}</Text>
          </View>
          
          <View className='w-[1px] h-full bg-primary'></View>
          
          <View className='w-3/12 items-center'>
            <Text className={`${item.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
              {item.type === 'expense' ? '-' : '+'}{item.amount.toLocaleString('vi-VN')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [categories]); // Dependency vào categories

  const renderItem = useCallback(({ item }: { item: Transaction }) => {
    return <TransactionItem item={item} />;
  }, [TransactionItem]);

  return (
    <FlatList
      data={transactions.slice(0, visibleCount)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center py-10">
          <Text className="text-gray-500">Không có giao dịch nào</Text>
        </View>
      }
      ListFooterComponent={
        visibleCount < transactions.length ? (
          <View className="py-4 items-center">
            <Text className="text-blue-500">Đang tải thêm...</Text>
          </View>
        ) : null
      }
    />
  );
};

export default ListTransaction;