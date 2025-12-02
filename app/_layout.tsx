import { Stack } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";
import "../locales/i18n";

// Navigation cho màn hình đăng nhập / đăng ký
const AuthNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index'/>
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
    </Stack>
  );
};

// Navigation chính trong app
const MainLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens/AddExpensesScreen" options={{headerShown: false}}/>
      <Stack.Screen name="screens/CategoryDetailScreen" options={{headerShown: false}}/>
      <Stack.Screen name="screens/EditProfileScreen" options={{headerShown: false}}/>
      <Stack.Screen name="screens/ChangePasswordScreen" options={{headerShown: false}}/>
      <Stack.Screen name="screens/SettingScreen" options={{headerShown: false}}/>
      <Stack.Screen name="screens/HelpScreen" options={{headerShown: false}}/>
      <Stack.Screen name="screens/NotificationScreen" options={{headerShown: false}}/>
    </Stack>
  );
};

// Root layout bọc context và điều hướng
function RootNavigator() {
  const { isAuthenticated, user } = useAuth();

  // Debug: theo dõi thay đổi auth state
  useEffect(() => {
    console.log('Auth State Changed:', { 
      isAuthenticated, 
      user: user?.email,
      userId: user?.uid 
    });
  }, [isAuthenticated, user]);

  // Khi đang loading
  // if (loading) {
  //   return <LoadingScreen />; // Tạo component loading nếu cần
  // }

  return isAuthenticated ? <MainLayout /> : <AuthNavigation />;
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
}
