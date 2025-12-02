import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface MoneyInputProps{
    label?: string,
    placeholder? : string,
    value ?: string,
    onChangeText? : (text: string)=> void, 
}

 const MoneyInput : React.FC<MoneyInputProps> = ({ label, placeholder, value, onChangeText}) => {
  const [amount, setAmount] = useState('');
  const [rawValue, setRawValue] = useState(0); // Giá trị số thực
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');
  const formatNumber = (value: string) => {
    // Xóa ký tự không phải số
    const numericValue = value.replace(/\D/g, "");
    // Chuyển thành dạng có dấu chấm (VN)
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (text: string) => {
    onChangeText && onChangeText(text.replace(/\D/g, ""));
    const numericValue = text.replace(/\D/g, ""); // chỉ lấy số
    setRawValue(Number(numericValue)); // lưu giá trị gốc
    setAmount(formatNumber(text)); // hiển thị dạng 50.000

};
  useEffect(()=>{
    if(value !== undefined){
      const numericValue = value.replace(/\D/g, ""); // chỉ lấy số
      setRawValue(Number(numericValue)); // lưu giá trị gốc
      setAmount(formatNumber(value));
    }
  }, [value])
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

        {/* Input */}
        <TextInput
          value={amount}
          onChangeText={handleChange}
          className="flex-1 text-[15px] text-gray-800"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType= 'numeric'
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            // if(error){
            //     setShowError(true);
            // }
          }}
          autoCapitalize="none"
        />

      {/* Thông báo lỗi */}
      {/* {showError ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null} */}
        </View>
    </View>
);
}
export default MoneyInput;