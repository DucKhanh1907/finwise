// components/VoiceButton.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

type VoiceButtonProps = {
  isListening: boolean;
  onPressStart: () => void;
  onPressStop: () => void;

};

const VoiceButton: React.FC<VoiceButtonProps> = ({ isListening, onPressStart, onPressStop }) => {
  return (
    <View className="items-center mt-3">
      {!isListening ?
        <TouchableOpacity
        onPress={onPressStart}
        className="bg-primary p-4 rounded-full"
      >
        <Ionicons name="mic" size={28} color="white" />
      </TouchableOpacity>
      :
        <TouchableOpacity
          onPress={onPressStop}
          className="bg-primary p-4 rounded-full"
        >
            <ActivityIndicator color="white" />
        
        </TouchableOpacity>
      }
      <Text className="mt-2 text-gray-600">
        {isListening ? 'Đang nghe...' : 'Nhấn để nói'}
      </Text>
    </View>
  );
};

export default VoiceButton;
