import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import ContactFacebookIcon from '@/assets/icons/ContactFacebookIcon';
import ContactInstagramIcon from '@/assets/icons/ContactInstagramIcon';
import { CustomerServiceIcon } from '@/assets/icons/CustomerServiceIcon';
import WebsiteIcon from '@/assets/icons/WebsiteIcon';
import HeaderBack from '@/components/HeaderBack';
import SafeScreen from '@/components/SafeScreen';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

const HelpScreen = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'faq' | 'contact_us'>('faq');
  return (
    <SafeScreen>
      <View className='flex-1 items-center'>
        <HeaderBack title={t('help_faqs')} onPressBack={()=> router.back()}/>
          <View className='flex-1 bg-bgGreen w-full rounded-t-[40px] items-center pb-[80px] mt-[60px]'>
              <Text className='mt-5 text-[16px] font-semibold'>{t('how_can_we_help')}</Text>
              <View className='w-10/12 flex-1'>
                  <View className='flex-row mt-5 bg-lightGreen p-2 rounded-2xl'>
                    <TouchableOpacity className={`w-1/2 items-center justify-center py-2 rounded-2xl ${selectedTab === 'faq' ? 'bg-primary' : ''}`} onPress={()=>setSelectedTab('faq')}>
                      <Text className='text-[15px]'>{t('faq')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`w-1/2 items-center ustify-center py-2 rounded-2xl ${selectedTab === 'contact_us' ? 'bg-primary' : ''}`} onPress={()=>setSelectedTab('contact_us')}>
                      <Text className='text-[15px]'>{t('contact_us')}</Text>
                    </TouchableOpacity>
                  </View>
                  {selectedTab === 'faq' 
                  ?
                    <View className='mt-5'>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between'>
                          <Text className='text-[14px] w-10/12'>{t('question_how_to_use')}</Text>
                          <ArrowDownIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between'>
                          <Text className='text-[14px] v'>{t('question_cost')}</Text>
                          <ArrowDownIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between'>
                          <Text className='text-[14px] w-10/12'>{t('question_contact_support')}</Text>
                          <ArrowDownIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between'>
                          <Text className='text-[14px] w-10/12'>{t('question_delete_account')}</Text>
                          <ArrowDownIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between'>
                          <Text className='text-[14px] w-10/12'>{t('question_reset_password')}</Text>
                          <ArrowDownIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between'>
                          <Text className='text-[14px] w-10/12'>{t('question_privacy')}</Text>
                          <ArrowDownIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between'>
                          <Text className='text-[14px] w-10/12'>{t('question_offline_use')}</Text>
                          <ArrowDownIcon/>
                        </View>
                      </TouchableOpacity>
                    </View>
                  :
                    <View className='mt-5'>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between '>
                          <View className='flex-row items-center'>
                            <View className='p-2 bg-primary rounded-2xl mr-2'>
                              <CustomerServiceIcon/>
                            </View>
                            <Text className='text-[14px] w-10/12'>{t('customer_service')}</Text>
                          </View>
                          <ArrowRightIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between '>
                          <View className='flex-row items-center'>
                            <View className='p-2 bg-primary rounded-2xl mr-2'>
                              <WebsiteIcon/>
                            </View>
                            <Text className='text-[14px] w-10/12'>{t('website')}</Text>
                          </View>
                          <ArrowRightIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between '>
                          <View className='flex-row items-center'>
                            <View className='p-2 bg-primary rounded-2xl mr-2'>
                              <ContactFacebookIcon/>
                            </View>
                            <Text className='text-[14px] w-10/12'>{t('facebook')}</Text>
                          </View>
                          <ArrowRightIcon/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity className='mt-3'>
                        <View className='flex-row items-center justify-between '>
                          <View className='flex-row items-center'>
                            <View className='p-2 bg-primary rounded-2xl mr-2'>
                              <ContactInstagramIcon/>
                            </View>
                            <Text className='text-[14px] w-10/12'>{t('instagram')}</Text>
                          </View>
                          <ArrowRightIcon/>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
              </View>
          </View>
      </View>
    </SafeScreen>
  )
}

export default HelpScreen