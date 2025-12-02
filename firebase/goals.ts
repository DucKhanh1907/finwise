import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

const COLLECTION = "goals";

export const addGoal = async (userId: string, goal: any) => {
  await addDoc(collection(db, COLLECTION), {
    ...goal,
    userId,
    createdAt: new Date(),
  });
};

export const getUserGoals = async (userId: string) => {
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateGoal = async (id: string, data: any) => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteGoal = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
