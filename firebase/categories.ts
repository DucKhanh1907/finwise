import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, or } from "firebase/firestore";

const COLLECTION = "categories";

export const addCategory = async (userId: string, category: any) => {
  await addDoc(collection(db, COLLECTION), {
    ...category,
    userId,
    createdAt: new Date(),
  });
};

export const getUserCategories = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION),
      or(
        where("isDefault", "==", true),
        where("userId", "==", userId)
      )
    );

    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (error) {
    console.error("Lỗi khi lấy categories:", error);
    return [];
  }
};

export const updateCategory = async (id: string, data: any) => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deleteCategory = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
