import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, or, query, updateDoc, where } from "firebase/firestore";

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

export const getCategoryByCategoryId = async (categoryId: string) => {
  try {
    const docRef = doc(db, COLLECTION, categoryId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log("Không tìm thấy category với ID:", categoryId);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy category:", error);
    return null;
  }
};