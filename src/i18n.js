import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      Number: 'Number',
      Name: 'Name',
      Readers: 'Readers',
      'Add book': 'Add book',
      Author: 'Author',
      add: 'add',
      close: 'close',
      'Create challenge': 'Create challenge',
      'Join challenge': 'Join challenge',
      Code: 'Code'
    }
  },
  fi: {
    translation: {
      Number: 'Numero',
      Name: 'Nimi',
      Readers: 'Lukijat',
      'Add book': 'Lisää kirja',
      Author: 'Kirjailija',
      add: 'lisää',
      close: 'sulje',
      'Create challenge': 'Luo haaste',
      'Join challenge': 'Liity haasteeseen',
      Code: 'Koodi'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fi',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
