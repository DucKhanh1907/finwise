import { db } from "@/firebase/firebaseConfig";
import { getCurrentWeekRange } from "@/utils/getWeekRange";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";

const COLLECTION = "transactions";

export const addTransaction = async (userId: string, data: any) => {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    userId,
    createdAt: new Date(),
  });
};

export const getUserTransactions = async (userId: string) => {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateTransaction = async (id: string, data: any) => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteTransaction = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};

export const getMonthlyTransactionTotalByCategory = async (
  userId: string, 
  month: Date, 
  categoryId: string
) => {
  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59);

  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    where("categoryId", "==", categoryId),
    where("date", ">=", startOfMonth),
    where("date", "<=", endOfMonth)
  );
  
  const snap = await getDocs(q);
  const total = snap.docs.reduce((sum, docSnap) => {
    const data = docSnap.data();
    return sum + (data.amount || 0);
  }, 0);
  
  return total;
};

export const getTransactionsByCategory = async (userId: string, categoryId: string) => {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    where("categoryId", "==", categoryId),
    orderBy("date", "desc")
  );
  
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ 
    id: doc.id, 
    ...doc.data() 
  }));
};


export const getTransactionsOfCurrentWeek = async (userId:string) => {
  const { start, end } = getCurrentWeekRange();

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    where("date", ">=", start),
    where("date", "<=", end)
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getTransactionsOfCurrentMonth = async (userId: string) => {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    where("date", ">=", monthStart),
    where("date", "<=", monthEnd)
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getTransactionsOfCurrentYear = async (userId: string) => {
  const today = new Date();
  const year = today.getFullYear();

  const yearStart = new Date(year, 0, 1, 0, 0, 0, 0);
  const yearEnd = new Date(year, 11, 31, 23, 59, 59, 999);

  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId),
    where("date", ">=", yearStart),
    where("date", "<=", yearEnd)
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
