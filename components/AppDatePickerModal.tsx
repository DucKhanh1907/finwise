import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

type AppDatePickerProps = {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  value?: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
};

const AppDatePicker: React.FC<AppDatePickerProps> = ({
  label,
  icon = 'calendar-outline',
  value,
  onChange,
  placeholder = 'Chọn ngày',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setIsFocused(true);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setIsFocused(false);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View className="w-full mb-4">
      {/* Label */}
      {label && (
        <Text className="font-semibold text-[15px] mb-1 text-gray-700">
          {label}
        </Text>
      )}

      {/* Ô input mô phỏng */}
      <TouchableOpacity
        onPress={showDatePicker}
        activeOpacity={0.8}
        className={`flex-row bg-lightGreen items-center border rounded-xl px-3 py-3 ${
          isFocused ? 'border-primary' : 'border-lightGreen'
        }`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? '#00D09E' : '#999'}
            style={{ marginRight: 8 }}
          />
        )}

        <Text
          className={`flex-1 text-[15px] ${
            value ? 'text-gray-800' : 'text-gray-400'
          }`}
        >
          {value ? dayjs(value).format('DD/MM/YYYY') : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal chọn ngày */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        accentColor='#00D09E'
        date={value || new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()} // nếu cần giới hạn
      />
    </View>
  );
};

export default AppDatePicker;
