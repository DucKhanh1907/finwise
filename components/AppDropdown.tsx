import IconChevronDown from "@/assets/icons/IconChevronDown";
import IconChevronUp from "@/assets/icons/IconChevronUp";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";


type Props = {
  data: any;
  placeholder?: string;
  onSelect?: (item: any) => void;
};

const AppDropdown: React.FC<Props> = ({
  data,
  placeholder = "Chọn giá trị...",
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  const handleSelect = (item: any) => {
    setSelected(item);
    setVisible(false);
    onSelect && onSelect(item);
  };
  return (
    <View className="w-full mb-4">
      {/* Nút mở dropdown */}
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        activeOpacity={0.8}
        className={`flex-row justify-between items-center bg-lightGreen border rounded-xl px-4 py-4 ${visible ? 'border-primary': 'border-lightGreen'}`}
      >
        <Text className="text-gray-700 text-base text-[15px]">
          {selected ? selected.name : placeholder}
        </Text>
        {visible ? (
          <IconChevronUp/>
        ) : (
          <IconChevronDown/>
        )}
      </TouchableOpacity>

      {/* Danh sách lựa chọn */}
      {visible && (
        <View className="mt-2  rounded-xl bg-lightGreen max-h-56 shadow-md items-center">
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            className="max-h-56 w-10/12"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className={`px-4 py-3 border-b border-primary`}
              >
                <Text
                  className={`text-base`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default AppDropdown;
