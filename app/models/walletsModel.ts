import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const COLLECTION = "wallets";

export const addWallet = async (userId: string, wallet: any) => {
  await addDoc(collection(db, COLLECTION), {
    ...wallet,
    userId,
    createdAt: new Date(),
  });
};

export const getUserWallets = async (userId: string) => {
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateWallet = async (id: string, data: any) => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteWallet = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
