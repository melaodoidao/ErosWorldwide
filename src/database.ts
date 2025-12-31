
import { LadyProfile, GentlemanProfile, Tour } from './types';

// Increment this version whenever INITIAL data changes to force localStorage reset
const DATA_VERSION = '2.1.0';

const STORAGE_KEYS = {
  LADIES: 'eros_worldwide_db_ladies',
  GENTLEMEN: 'eros_worldwide_db_men',
  TOURS: 'eros_worldwide_db_tours',
  DATA_VERSION: 'eros_data_version'
};

// Check if data version changed and reset if needed (browser only)
if (typeof window !== 'undefined') {
  const storedVersion = localStorage.getItem(STORAGE_KEYS.DATA_VERSION);
  if (storedVersion !== DATA_VERSION) {
    localStorage.removeItem(STORAGE_KEYS.LADIES);
    localStorage.removeItem(STORAGE_KEYS.GENTLEMEN);
    localStorage.removeItem(STORAGE_KEYS.TOURS);
    localStorage.setItem(STORAGE_KEYS.DATA_VERSION, DATA_VERSION);
  }
}

const INITIAL_LADIES: LadyProfile[] = [
  { id: '1', name: 'Elena', age: 24, city: 'Kyiv', country: 'Ukraine', bio: 'Architect with a passion for classical music and travel. Looking for a man who values sincerity.', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'7\"", hairColor: 'Blonde' },
  { id: '2', name: 'Sofia', age: 29, city: 'Medellin', country: 'Colombia', bio: 'Pediatrician who loves salsa and outdoor adventures. Family is everything to me.', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'5\"", hairColor: 'Brunette' },
  { id: '3', name: 'Mariya', age: 36, city: 'Odesa', country: 'Ukraine', bio: 'Professional chef seeking someone to share life with. I believe in traditional values.', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'8\"", hairColor: 'Brunette' },
  { id: '4', name: 'Suki', age: 22, city: 'Bangkok', country: 'Thailand', bio: 'University student majoring in communications. I am cheerful and optimistic.', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'3\"", hairColor: 'Black' },
  { id: '5', name: 'Natali', age: 31, city: 'Medellin', country: 'Colombia', bio: 'Fitness coach who loves healthy living and deep conversations.', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'6\"", hairColor: 'Brunette' },
  { id: '6', name: 'Irina', age: 28, city: 'Kyiv', country: 'Ukraine', bio: 'Fashion designer with a sophisticated soul. Seeking a reliable partner.', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'9\"", hairColor: 'Blonde' },
  { id: '7', name: 'Anastasia', age: 27, city: 'Lviv', country: 'Ukraine', bio: 'English teacher who dreams of a loving family. I enjoy reading and painting.', imageUrl: 'https://images.unsplash.com/photo-1506956191951-7a88da4435e5?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'6\"", hairColor: 'Blonde' },
  { id: '8', name: 'Camila', age: 25, city: 'Cartagena', country: 'Colombia', bio: 'Dance instructor passionate about Latin rhythms and Caribbean culture.', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'4\"", hairColor: 'Black' },
  { id: '9', name: 'Ploy', age: 26, city: 'Bangkok', country: 'Thailand', bio: 'Nurse with a caring heart. Looking for a meaningful connection.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'2\"", hairColor: 'Black' },
  { id: '10', name: 'Kateryna', age: 28, city: 'Kharkiv', country: 'Ukraine', bio: 'Software developer who loves technology and nature equally. Seeking my soulmate.', imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'7\"", hairColor: 'Brunette' },
  { id: '11', name: 'Valentina', age: 26, city: 'Cali', country: 'Colombia', bio: 'Marketing executive who loves beach life and good coffee. Very family oriented.', imageUrl: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'5\"", hairColor: 'Brunette' },
  { id: '12', name: 'Olga', age: 30, city: 'Dnipro', country: 'Ukraine', bio: 'Economist who values stability and honesty. I want to build a strong family.', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'8\"", hairColor: 'Blonde' },
];

const INITIAL_TOURS: Tour[] = [
  { id: 't1', city: 'Medellin', countries: ['Colombia'], startDate: '2025-03-05', endDate: '2025-03-14', checkInTime: '2:00 PM', price: '$7,495', status: 'Filling Fast', image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=1200' },
  { id: 't2', city: 'Bangkok', countries: ['Thailand'], startDate: '2025-03-05', endDate: '2025-03-14', checkInTime: '3:00 PM', price: '$7,495', status: 'Open', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=1200' },
  { id: 't3', city: 'Kiev', countries: ['Ukraine'], startDate: '2025-03-05', endDate: '2025-03-14', checkInTime: '1:00 PM', price: '$7,495', status: 'Open', image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=1200' },
];

export const db = {
  ladies: {
    get: (): LadyProfile[] => {
      const data = localStorage.getItem(STORAGE_KEYS.LADIES);
      return data ? JSON.parse(data) : INITIAL_LADIES;
    },
    save: (ladies: LadyProfile[]) => {
      localStorage.setItem(STORAGE_KEYS.LADIES, JSON.stringify(ladies));
    },
    reset: () => {
      localStorage.setItem(STORAGE_KEYS.LADIES, JSON.stringify(INITIAL_LADIES));
      return INITIAL_LADIES;
    }
  },
  gentlemen: {
    get: (): GentlemanProfile[] => {
      const data = localStorage.getItem(STORAGE_KEYS.GENTLEMEN);
      return data ? JSON.parse(data) : [];
    },
    save: (men: GentlemanProfile[]) => {
      localStorage.setItem(STORAGE_KEYS.GENTLEMEN, JSON.stringify(men));
    }
  },
  tours: {
    get: (): Tour[] => {
      const data = localStorage.getItem(STORAGE_KEYS.TOURS);
      return data ? JSON.parse(data) : INITIAL_TOURS;
    },
    save: (tours: Tour[]) => {
      localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(tours));
    },
    reset: () => {
      localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(INITIAL_TOURS));
      return INITIAL_TOURS;
    }
  }
};
