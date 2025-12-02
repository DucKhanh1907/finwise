import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

const COLLECTION = "budgets";

export const addBudget = async (userId: string, budget: any) => {
  await addDoc(collection(db, COLLECTION), {
    ...budget,
    userId,
    createdAt: new Date(),
  });
};

export const getUserBudgets = async (userId: string) => {
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateBudget = async (id: string, data: any) => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteBudget = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
