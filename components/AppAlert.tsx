import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'

interface Props{
    visible : boolean,
    onPressOk : ()=>void,
    title ?: string,
    content : string
}

const AppAlert: React.FC<Props> = ({visible, onPressOk, title, content}) => {
  return (
    <Modal
        animationType='fade'
        transparent = {true}
        statusBarTranslucent = {true}
        visible={visible}
    >
        <View className='flex-1 bg-black/40 justify-center items-center' 
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <View className="bg-white w-10/12 px-5 py-7 rounded-xl items-center ">
                {
                    title &&
                    <View className='w-full items-center'>
                        <Text className='text-[15px]'>{title}</Text>
                        <View className='bg-slate-300 h-[1px] w-full my-2'/>
                    </View>
                }
                <Text className='text-[18px]'>{content}</Text>
                <View className='flex-row  w-full justify-end'>
                    <TouchableOpacity className='bg-primary px-8 py-2 rounded-full mt-5' onPress={onPressOk}>
                        <Text>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default AppAlert