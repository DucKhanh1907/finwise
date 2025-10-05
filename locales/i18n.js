import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import vi from './vi.json';

// Lấy locale an toàn, nếu không có thì fallback về 'en'
const locale = Localization?.locale ?? 'en';
const language = locale.startsWith('vi') ? 'vi' : 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: language, // ✅ sử dụng biến đã kiểm tra
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
