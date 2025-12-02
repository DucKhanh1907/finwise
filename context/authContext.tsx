import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";

// 🧠 Kiểu dữ liệu người dùng
export interface UserData {
  uid: string;
  email: string | null;
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: Date | null;
  createdAt?: Date;
}

// 🧠 Kiểu dữ liệu context
interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    dateOfBirth: Date | null
  ) => Promise<{ success: boolean; message: string }>;
  updateUser: (
    data: {
      email?: string;
      fullName?: string;
      phoneNumber?: string;
    }
  ) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧩 Lấy dữ liệu người dùng từ Firestore
  const getUserData = async (uid: string): Promise<UserData | null> => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          uid,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth.seconds * 1000) : null,
          createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : undefined,
        };
      }
      return null;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu Firestore:", error);
      return null;
    }
  };

  // 🧩 Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);
      if (firebaseUser) {
        const userData = await getUserData(firebaseUser.uid);
        if (userData) {
          setUser(userData);
        } else {
          // Nếu người dùng chưa có trong Firestore
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        }
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // 🧩 Đăng nhập
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "Đăng nhập thành công" };
    } catch (e: any) {
      if (e.message.includes("(auth/invalid-email)")) {
        return { success: false, message: "Hãy nhập địa chỉ email hợp lệ" };
      } else if (e.message.includes("(auth/invalid-credential)")) {
        return { success: false, message: "Email hoặc mật khẩu không đúng" };
      }
      return { success: false, message: e.message };
    }
  };

  // 🧩 Đăng ký
  const register = async (
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    dateOfBirth: Date | null
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", response.user.uid), {
        email,
        fullName,
        phoneNumber,
        dateOfBirth,
        userId: response.user.uid,
        createdAt: new Date(),
      });
      //Khởi tạo ví của người dùng
      await addDoc(collection(db, 'wallets'), {
          total_balance: 0,
          total_expense: 0,
          userId: response.user.uid,
          createdAt: new Date(),
        });

      // Lưu ngay user vào state
      setUser({
        uid: response.user.uid,
        email,
        fullName,
        phoneNumber,
        dateOfBirth,
        createdAt: new Date(),
      });

      setIsAuthenticated(true);
      return { success: true, message: "Đăng ký thành công" };
    } catch (e: any) {
      if (e.message.includes("(auth/invalid-email)")) {
        return { success: false, message: "Hãy nhập địa chỉ email hợp lệ" };
      } else if (e.message.includes("(auth/email-already-in-use)")) {
        return { success: false, message: "Email này đã được sử dụng" };
      }
      return { success: false, message: e.message };
    }
  };

  // 🧩 Đăng xuất
  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      await signOut(auth);
    } catch (e: any) {
      console.error("Lỗi khi đăng xuất:", e.message);
    }
  };

//  Cập nhật thông tin người dùng
  const updateUser = async (data: {
    email?: string;
    fullName?: string;
    phoneNumber?: string;
  }) => {
    try {
      if (!user) {
        return { success: false, message: "Không tìm thấy người dùng" };
      }

      const userRef = doc(db, "users", user.uid);

      // Nếu đổi email → cập nhật Firebase Auth
      if (data.email && data.email !== user.email) {
        await updateEmail(auth.currentUser!, data.email);
      }

      // Cập nhật Firestore
      await setDoc(
        userRef,
        {
          ...data,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      // Cập nhật state user để UI đổi theo
      setUser({
        ...user,
        ...data,
      });

      return { success: true, message: "Cập nhật thông tin thành công" };
    } catch (e: any) {
      let message = e.message;

      if (e.message.includes("auth/invalid-email")) {
        message = "Email không hợp lệ";
      } else if (e.message.includes("auth/email-already-in-use")) {
        message = "Email này đã được sử dụng";
      } else if (e.message.includes("auth/requires-recent-login")) {
        message = "Bạn cần đăng nhập lại để thay đổi email";
      }

      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🧩 Hook sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được sử dụng trong AuthContextProvider");
  return context;
};
