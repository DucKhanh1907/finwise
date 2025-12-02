// hooks/useVoiceInput.ts
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";
import { Alert } from "react-native";

export const useVoiceInput = (onResult?: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Bắt đầu khi speech recognition start
  useSpeechRecognitionEvent("start", () => setIsListening(true));

  // Kết thúc khi speech recognition end
  useSpeechRecognitionEvent("end", () => setIsListening(false));

  // Nhận kết quả
  useSpeechRecognitionEvent("result", (event) => {
    const text = event.results[0]?.transcript ?? "";
    setTranscript(text);
    if (onResult) onResult(text);
  });

  // Xử lý lỗi
  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech recognition error:", event.error, event.message);
    Alert.alert("Lỗi", event.message || "Nhận dạng giọng nói thất bại");
  });

  const startListening = async (lang = "vi-VN") => {
    try {
      // Yêu cầu quyền micro
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        Alert.alert("Cần quyền micro", "Hãy bật quyền microphone trên thiết bị.");
        return;
      }

      // Bắt đầu nhận dạng giọng nói
      await ExpoSpeechRecognitionModule.start({
        lang,
        interimResults: true, // nhận kết quả tạm thời realtime
        continuous: false,    // true nếu muốn nhận nhiều lần liên tục
      });
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      Alert.alert("Lỗi", "Không thể khởi động nhận dạng giọng nói");
    }
  };

  const stopListening = async () => {
    try {
      await ExpoSpeechRecognitionModule.stop();
      setIsListening(false);
    } catch (err) {
      console.error("Failed to stop speech recognition:", err);
    }
  };

  return { isListening, transcript, startListening, stopListening };
};
