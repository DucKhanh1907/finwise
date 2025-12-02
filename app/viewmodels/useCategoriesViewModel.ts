import { addCategory, getCategoryByCategoryId, getUserCategories } from "@/app/models/categoriesModel";
import { useEffect, useState } from "react";

export const useCategoriesViewModel = (userId?: string) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    if (!userId) return; // tránh lỗi khi chưa có userId
    setLoading(true);
    const data = await getUserCategories(userId);
    setCategories(data);
    setLoading(false);
  };

  const createCategory = async (catgory: any) => {
    if (!userId) return;
    await addCategory(userId, catgory);
    fetchCategories();
  };
  
  const getCategory = async (categoryId:string)=>{
    const data = await getCategoryByCategoryId(categoryId);
    return data;
  }

  useEffect(() => {
    fetchCategories();
  }, [userId]);

  return { categories, loading, createCategory, getCategory };
};
