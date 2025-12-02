import IconChevronDown from '@/assets/icons/IconChevronDown';
import IconChevronUp from '@/assets/icons/IconChevronUp';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps{
    data: any;
    placeholder?: string;
    onSelect?: (item: any) => void;
    title: string
}

const ModalSelectCategory: React.FC<ModalProps> = ({data,  placeholder = "Chọn giá trị...",  onSelect, title}) => {
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
      {/* {visible && (
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
      )} */}
        <Modal
            animationType='fade'
            transparent = {true}
            visible={visible}
            statusBarTranslucent = {true}
            onRequestClose={()=> setVisible(false)}
        >
            <View className='flex-1 bg-black/40 justify-center items-center' style={{position:'absolute', top:0, bottom:0, right:0, left:0}}>
                <View className='bg-lightGreen w-10/12 rounded-2xl px-5 py-5 items-center'>
                    <Text className='text-[20px] font-semibold'>{title}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        className=" max-h-56 w-10/12 mt-5"
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
            </View>
        </Modal>
    </View>
  )
}

export default ModalSelectCategory