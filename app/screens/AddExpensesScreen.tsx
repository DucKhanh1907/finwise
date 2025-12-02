import ModalSelectCategory from '@/components/addExpenses/ModalSelectCategory'
import AppAlert from '@/components/AppAlert'
import AppButton from '@/components/AppButton'
import AppDatePicker from '@/components/AppDatePickerModal'
import AppTextInput from '@/components/AppTextInput'
import CustomKeyboardView from '@/components/CustomKeyboardView'
import HeaderBack from '@/components/HeaderBack'
import MoneyInput from '@/components/MoneyInput'
import SafeScreen from '@/components/SafeScreen'
import VoiceButton from '@/components/VoiceButton'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'expo-router'
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { useCategoriesViewModel } from '../viewmodels/useCategoriesViewModel'
import { useTransactionsViewModel } from '../viewmodels/useTransactionsViewModel'
import { useWalletsViewModel } from '../viewmodels/useWalletsViewModel'

const AddExpensesScreen = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const {user} = useAuth();
  const {categories} = useCategoriesViewModel(user?.uid);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState('');

  const {wallet, editWallet} = useWalletsViewModel(user?.uid);
  const {createTransaction} = useTransactionsViewModel(user?.uid);
  const handleSave = ()=>{
    if (
      !selectedDate ||
      !amount.trim() ||
      !title.trim() ||
      !categoryId.trim()
    ) {
      setContentAlert(t('fill_all_info'));
      setVisibleAlert(true);
      return;
    }
    if(wallet.total_balance > Number(amount)){
      createTransaction({
        categoryId: categoryId,
        type: 'expense',
        amount: Number(amount),
        title : title,
        note: note,
        date: selectedDate
      });
      editWallet({
        total_balance: wallet.total_balance - Number(amount),
        total_expense: wallet.total_expense + Number(amount)
      })
      setContentAlert(t('add_expense_success'));
      setVisibleAlert(true);
    }else{
      setContentAlert(t('insufficient_balance'));
      setVisibleAlert(true);
    }
  }

  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });
  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "vi-VN",
      interimResults: true,
      continuous: false,
    });
  };
  const handleStop = async () => {
    ExpoSpeechRecognitionModule.stop();
  }
  useEffect(()=>{
    parseSpeechToExpense(transcript);
  }, [transcript])
  const parseSpeechToExpense = (text: string) => {
    const amountMatch = text.match(/([\d.,]+)\s*(?:nghìn|ngàn|k|đ|đồng)?/i);
    const titleMatch = text.match(/mua\s+(.+?)(?:\s+ngày|$)/i);
    const dateMatch = text.match(/ngày\s*(\d+)/i);
    const monthMatch = text.match(/tháng\s*(\d+)/i);
    const categoryMatch = text.match(/danh mục\s+(.+)/i);

    if (amountMatch) setAmount((parseInt(amountMatch[1]) * 1000).toString());
    if (titleMatch) setTitle(titleMatch[1]);

    if (dateMatch) {
      const day = parseInt(dateMatch[1]);
      const month = monthMatch ? parseInt(monthMatch[1]) - 1 : new Date().getMonth();
      setSelectedDate(new Date(new Date().getFullYear(), month, day));
    }

    setNote(text);
  };
  return (
    <SafeScreen>
      <CustomKeyboardView>
        <View className='flex-1 items-center mt-3'>
          <HeaderBack title={t('add_expenses')} onPressBack={()=>router.back()}/>
          <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] mt-8 justify-between items-center'>
            {/* <ScrollView className='flex-1'> */}
              <View className='flex-1 items-center pt-6 w-full'>
                <View className='w-10/12'>
                  <AppDatePicker label={t('date')} value={selectedDate} icon='calendar-outline' onChange={setSelectedDate}/>
                  <View>
                    <Text className="font-semibold text-[15px] mb-2 text-gray-700">{t('category')}</Text>
                    <ModalSelectCategory
                      title={t('category')}
                      data={categories}
                      placeholder={t('select_category')}
                      onSelect={(item) => setCategoryId(item.id)}
                    />
                  </View>
                  <MoneyInput label={t('amount')} value={amount}  placeholder={t('enter_amount_vnd')} onChangeText={(value) => {setAmount(value)}}/>
                  <AppTextInput label={t('expense_title')} value={title} placeholder={t('enter_expense_title')} onChangeText={(value) => setTitle(value)}/>
                  <AppTextInput label={t('note')} placeholder={t('enter_message')} multiline={true} onChangeText={(value) => setNote(value)}/>
                  
                </View>
                <VoiceButton
                  isListening={recognizing}
                  onPressStart={ handleStart}
                  onPressStop={handleStop}
                  />
                <Text>{transcript}</Text>
              </View>
              <View className='w-10/12 mb-4'>
                <AppButton title={t('save')} primary onPress={handleSave}/>    
              </View>
            {/* </ScrollView> */}
          </View>
          <AppAlert title='Thông báo' content={contentAlert} visible={visibleAlert} onPressOk={()=>{setVisibleAlert(false)}}/>
        </View>
      </CustomKeyboardView>
    </SafeScreen>
  )
}

export default AddExpensesScreen

// import {
//   ExpoSpeechRecognitionModule,
//   useSpeechRecognitionEvent,
// } from "expo-speech-recognition";
// import { useState } from "react";
// import { Button, ScrollView, Text, View } from "react-native";

// function AddExpensesScreen() {
//   const [recognizing, setRecognizing] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   useSpeechRecognitionEvent("start", () => setRecognizing(true));
//   useSpeechRecognitionEvent("end", () => setRecognizing(false));
//   useSpeechRecognitionEvent("result", (event) => {
//     setTranscript(event.results[0]?.transcript);
//   });
//   useSpeechRecognitionEvent("error", (event) => {
//     console.log("error code:", event.error, "error message:", event.message);
//   });

//   const handleStart = async () => {
//     const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
//     if (!result.granted) {
//       console.warn("Permissions not granted", result);
//       return;
//     }
//     // Start speech recognition
//     ExpoSpeechRecognitionModule.start({
//       lang: "vi-VN",
//       interimResults: true,
//       continuous: false,
//     });
//   };

//   return (
//     <View className="flex-1 items-center justify-center mt-10">
//       {!recognizing ? (
//         <Button title="Start" onPress={handleStart} />
//       ) : (
//         <Button
//           title="Stop"
//           onPress={() => ExpoSpeechRecognitionModule.stop()}
//         />
//       )}

//       <ScrollView>
//         <Text>{transcript}</Text>
//       </ScrollView>
//     </View>
//   );
// }
// export default AddExpensesScreen;
