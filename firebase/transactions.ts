import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from "firebase/firestore";

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
