import TabAnalysis from '@/assets/icons/TabAnalysis'
import TabCategories from '@/assets/icons/TabCategories'
import TabHome from '@/assets/icons/TabHome'
import TabProfile from '@/assets/icons/TabProfile'
import TabTransactions from '@/assets/icons/TabTransactions'
import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'


const _layout = () => {
  return (
    <Tabs initialRouteName='home' screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarItemStyle:{
        marginTop: 20,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarStyle:{
        backgroundColor: "#DFF7E2",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 80,
        position: 'absolute',
      }
    }}>
        <Tabs.Screen name='home'
          options={{
            tabBarIcon: ({ focused })=>(
              <View className=' py-3 px-4 rounded-3xl' style={{backgroundColor: focused ? '#00D09E': ''}}>
                <TabHome/>
              </View>
            )
          }}
        />
        <Tabs.Screen name='analysis'
          options={{
            tabBarIcon: ({ focused })=>(
              <View className=' py-3 px-4 rounded-3xl' style={{backgroundColor: focused ? '#00D09E': ''}}>
                <TabAnalysis/>
              </View>
            )
          }}
        />
        <Tabs.Screen name='transactions'
          options={{
            tabBarIcon: ({ focused })=>(
              <View className=' py-3 px-4 rounded-3xl' style={{backgroundColor: focused ? '#00D09E': ''}}>
                <TabTransactions/>
              </View>
            )
          }}
        />
        <Tabs.Screen name='categories'
          options={{
            tabBarIcon: ({ focused })=>(
              <View className=' py-3 px-4 rounded-3xl' style={{backgroundColor: focused ? '#00D09E': ''}}>
                <TabCategories/>
              </View>
            )
          }}
        />
        <Tabs.Screen name='profile'
          options={{
            tabBarIcon: ({ focused })=>(
              <View className=' py-3 px-4 rounded-3xl' style={{backgroundColor: focused ? '#00D09E': ''}}>
                <TabProfile/>
              </View>
            )
          }}
        />
    </Tabs>
  )
}

export default _layout