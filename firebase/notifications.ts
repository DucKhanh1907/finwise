import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, orderBy } from "firebase/firestore";

const COLLECTION = "notifications";

export const addNotification = async (userId: string, data: any) => {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    userId,
    isRead: false,
    createdAt: new Date(),
  });
};

export const getUserNotifications = async (userId: string) => {
  const q = query(collection(db, COLLECTION), where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const markNotificationAsRead = async (id: string) => {
  await updateDoc(doc(db, COLLECTION, id), { isRead: true });
};

export const deleteNotification = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
