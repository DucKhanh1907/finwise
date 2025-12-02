import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconKey, iconsCategories } from "@/assets/icons/IconCategories";
import { useTranslation } from "react-i18next";
import AppButton from "../AppButton";
import { addCategory } from "@/firebase/categories";
import { useAuth } from "@/context/authContext";
import { useCategoriesViewModel } from "@/app/viewmodels/useCategoriesViewModel";

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface Props {
  categories: Category[];
  onPressCategory?: (category: Category) => void;
  onAddCategory?: (newCat: any) => void;
}

export default function CategoryGrid({
  categories,
  onPressCategory,
  onAddCategory,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const {t} = useTranslation();
  const {user} = useAuth();

  const displayCategories = [
    ...categories,
    { id: "add", name: "Add", icon: "add-outline" },
  ];

  const renderItem = ({ item }: { item: Category }) => {
    const categoryKey = item.name as IconKey;
    const IconComponent = iconsCategories[categoryKey] || iconsCategories["Savings"];

    const handlePress = () => {
      if (item.id === "add") {
        setModalVisible(true);
      } else {
        onPressCategory?.(item);
      }
    };

    return (
      <TouchableOpacity onPress={handlePress} className="w-[30%] items-center">
        <View className="bg-lightBlue w-full items-center min-h-[90px] justify-center rounded-3xl">
          {item.id === "add" ? (
            <Ionicons name="add-outline" size={36} color="#fff" />
          ) : (
            IconComponent && <IconComponent />
          )}
        </View>
        <Text className="text-[13px] font-medium mt-2">{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const [saving, setSaving] = useState(false);

const handleSave = async () => {
  //Validate input
  const name = newCategory?.trim();
  if (!name) {
    // báo lỗi cho user (toast, alert, setMessage,...)
    alert("Vui lòng nhập tên danh mục");
    return;
  }

  //Kiểm tra userId
  const userId = user?.uid;
  if (!userId) {
    alert("Không tìm thấy người dùng. Vui lòng đăng nhập lại.");
    return;
  }

  //Thực hiện lưu
  try {
    setSaving(true);
    
    const newCat = {
      name,
      type: "expense",       
      isDefault: false,      
    };

    // Nếu addCategory trả về document id hoặc docRef thì dùng kết quả
    onAddCategory?.(newCat);
    
    //Reset & đóng modal
    setNewCategory("");
    setModalVisible(false);
  } catch (err) {
    console.error("Lỗi khi thêm category:", err);
    alert("Thêm danh mục thất bại. Vui lòng thử lại.");
  } finally {
    setSaving(false);
  }
};

  return (
    <>
      <FlatList
        data={displayCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        className="w-10/12 mt-8"
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      />


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >

        <View
          className="flex-1 bg-black/40 justify-center items-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <View className="bg-white w-10/12 px-5 py-12 rounded-2xl items-center ">
            <Text className="text-xl font-semibold mb-4">{t('new_category')}</Text>
            <TextInput
              placeholder={t('category_name')}
              value={newCategory}
              onChangeText={setNewCategory}
              className="rounded-full px-5 py-4 mb-4 w-full bg-lightGreen"
            />
            <View className="item-center mt-2">
              <AppButton primary title={t('save')} onPress={handleSave}/>
              <View  className="mt-2">
                <AppButton title={t('cancel')} onPress={()=>setModalVisible(false)}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
