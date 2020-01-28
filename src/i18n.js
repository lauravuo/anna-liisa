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
      'Edit book': 'Edit book',
      Author: 'Author',
      add: 'add',
      close: 'close',
      delete: 'delete',
      save: 'save',
      'Create challenge': 'Create challenge',
      'Join challenge': 'Join challenge',
      Code: 'Code',
      'Share this code to others for joining the challenge':
        'Share this code to others for joining the challenge',
      'search placeholder': 'No matches found'
    }
  },
  fi: {
    translation: {
      Number: '#',
      Name: 'Nimi',
      Readers: 'Lukijat',
      'Add book': 'Lisää kirja',
      'Edit book': 'Muokkaa tietoja',
      Author: 'Kirjailija',
      add: 'lisää',
      close: 'sulje',
      delete: 'poista',
      save: 'tallenna',
      'Create challenge': 'Luo haaste',
      'Join challenge': 'Liity haasteeseen',
      Code: 'Koodi',
      'Share this code to others for joining the challenge':
        'Uudet lukijat voivat liittyä haasteeseen tällä koodilla',
      'search placeholder': 'Ei tuloksia'
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
