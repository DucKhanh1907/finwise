import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

// 🔹 Các hàm kiểm tra định dạng
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isValidPhone = (phone: string) =>
  /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone);

const isValidPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

type AppTextInputProps = TextInputProps & {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'phone' | 'amount';
  multiline?:boolean;
};

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  icon,
  placeholder,
  secureTextEntry,
  type = 'text',
  value,
  multiline = false,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // 🔹 Hàm kiểm tra format
  const validateInput = (text: string) => {
    if (type === 'email' && text && !isValidEmail(text)) {
      setError('Email không hợp lệ');
    } else if (type === 'password' && text && !isValidPassword(text)) {
      setError('Mật khẩu yếu (ít nhất 8 ký tự, có chữ hoa, số, ký tự đặc biệt)');
    } else if (type === 'phone' && text && !isValidPhone(text)) {
      setError('Số điện thoại không hợp lệ');
    } else if (type === 'amount'){

    } else {
      setError('');
    }

    onChangeText && onChangeText(text);
  };

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="font-semibold text-[15px] mb-1 text-gray-700">
          {label}
        </Text>
      )}

      <View
        className={`flex-row bg-lightGreen items-center border rounded-xl px-3 py-1 ${
          isFocused ? 'border-primary' : error ? 'border-red-500' : 'border-lightGreen'
        }`}
      >
        {/* Icon bên trái (nếu có) */}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? '#00D09E' : '#999'}
            style={{ marginRight: 8 }}
          />
        )}

        {/* Input */}
        <TextInput
          {...props}
          value={value}
          onChangeText={validateInput}
          secureTextEntry={type === 'password' && !isPasswordVisible}
          className="flex-1 text-[15px] text-gray-800"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline = {multiline}
          keyboardType={type === 'amount' ? 'numeric' : 'default'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if(error){
                setShowError(true);
            }
          }}
          autoCapitalize="none"
        />

        {/* Icon con mắt nếu là password */}
        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Thông báo lỗi */}
      {showError ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default AppTextInput;
