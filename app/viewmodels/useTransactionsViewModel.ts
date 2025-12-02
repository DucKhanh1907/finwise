
import { getWeeksOfCurrentMonth } from '@/utils/getWeekRange';
import { useEffect, useState } from 'react';
import { addTransaction, getMonthlyTransactionTotalByCategory, getTransactionsByCategory, getTransactionsOfCurrentMonth, getTransactionsOfCurrentWeek, getTransactionsOfCurrentYear, getUserTransactions } from '../models/transactionsModel';

export const useTransactionsViewModel = (userId ?:string) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () =>{
    if(!userId) return;
    setLoading(true);
    const data = await getUserTransactions(userId);
    setTransactions(data);
    setLoading(false);
  }

  const createTransaction = async (transaction:any) => {
    if(!userId) return;
    await addTransaction(userId, transaction);
    fetchTransactions();
  }

  const getCurrentMonthTransactionTotalByCategory = async (categoryId:string) =>{
    if(!userId || !categoryId) return;
    const currentMonth = new Date();
    const expense = await getMonthlyTransactionTotalByCategory(userId , currentMonth, categoryId);
    return expense;
  }

  const getTransactionsOfCategory = async(categoryId: string) =>{
    if(!userId || !categoryId) return;
    const data = await getTransactionsByCategory( userId,categoryId);
    setTransactions(data);
  }

  const loadDailyData = async () => {
    if(!userId) return;
    const data = await getTransactionsOfCurrentWeek(userId);
    const summarizeByWeekday = () => {
      const result = {
        income: Array(7).fill(0),
        expense: Array(7).fill(0),
      };

      data.forEach(t => {
        const dateObj = (t as any).date?.toDate?.();
        if (!dateObj) return; // skip items without a valid date
        const jsDay = dateObj.getDay(); // 0 = CN

        // Đổi về index: Thứ 2 = 0 → Chủ Nhật = 6
        const index = jsDay === 0 ? 6 : jsDay - 1;

        if ((t as any).type === "income") {
          result.income[index] += (t as any).amount || 0;
        } else {
          result.expense[index] += (t as any).amount || 0;
        }
      });
      const summary = Array(7).fill(0).map((_, i) => ({
        income: result.income[i],
        expense: result.expense[i],
      }));
      return summary;
    };
    const summarizedData = summarizeByWeekday();
    return summarizedData;
  };
  const loadWeeklyData = async () => {
    if (!userId) return;

    const data = await getTransactionsOfCurrentMonth(userId);
    const weeks = getWeeksOfCurrentMonth();

    const summary = weeks.map(week => {
      let income = 0;
      let expense = 0;

      data.forEach(t => {
        const dateObj = (t as any).date?.toDate?.();
        if (!dateObj) return;

        if (dateObj >= week.start && dateObj <= week.end) {
          if ((t as any).type === "income") income += (t as any).amount || 0;
          else expense += (t as any).amount || 0;
        }
      });

      return {
        // start: week.start,
        // end: week.end,
        income,
        expense,
      };
    });

    console.log("Weekly Summary:", summary);
  };

  const loadMonthlyData = async () => {
    if (!userId) return;

    const data = await getTransactionsOfCurrentYear(userId);

    // Mảng 12 tháng
    const monthlySummary = Array(12).fill(0).map((_, i) => {
      let income = 0;
      let expense = 0;

      data.forEach(t => {
        const dateObj = (t as any).date?.toDate?.();
        if (!dateObj) return;

        if (dateObj.getMonth() === i) {
          if ((t as any).type === "income") income += (t as any).amount || 0;
          else expense += (t as any).amount || 0;
        }
      });

      return { income, expense };
    });

    console.log("Monthly Summary:", monthlySummary);
  };

  useEffect(() => {
      fetchTransactions();
  }, [userId]);
  return {transactions,fetchTransactions, createTransaction, getCurrentMonthTransactionTotalByCategory, getTransactionsOfCategory, loadDailyData, loadWeeklyData, loadMonthlyData, loading};
}

