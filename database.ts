
import { LadyProfile, GentlemanProfile, Tour } from './types';

const STORAGE_KEYS = {
  LADIES: 'eros_worldwide_db_ladies',
  GENTLEMEN: 'eros_worldwide_db_men',
  TOURS: 'eros_worldwide_db_tours',
};

const INITIAL_LADIES: LadyProfile[] = [
  { id: '1', name: 'Elena', age: 24, city: 'Kyiv', country: 'Ukraine', bio: 'Architect with a passion for classical music and travel. Looking for a man who values sincerity.', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'7\"", hairColor: 'Blonde' },
  { id: '2', name: 'Sofia', age: 29, city: 'Bogota', country: 'Colombia', bio: 'Pediatrician who loves salsa and outdoor adventures. Family is everything to me.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'5\"", hairColor: 'Brunette' },
  { id: '3', name: 'Mariya', age: 36, city: 'Odesa', country: 'Ukraine', bio: 'Professional chef seeking someone to share life with. I believe in traditional values.', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'8\"", hairColor: 'Brunette' },
  { id: '4', name: 'Viktoria', age: 22, city: 'Cebu City', country: 'Philippines', bio: 'University student majoring in communications. I am cheerful and optimistic.', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'3\"", hairColor: 'Black' },
  { id: '5', name: 'Natali', age: 31, city: 'Medellin', country: 'Colombia', bio: 'Fitness coach who loves healthy living and deep conversations.', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'6\"", hairColor: 'Brunette' },
  { id: '6', name: 'Irina', age: 39, city: 'Kyiv', country: 'Ukraine', bio: 'Fashion designer with a sophisticated soul. Seeking a reliable partner.', imageUrl: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'9\"", hairColor: 'Red' },
  { id: '7', name: 'Anastasia', age: 27, city: 'Lviv', country: 'Ukraine', bio: 'English teacher who dreams of a loving family. I enjoy reading and painting.', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'6\"", hairColor: 'Blonde' },
  { id: '8', name: 'Camila', age: 25, city: 'Cartagena', country: 'Colombia', bio: 'Dance instructor passionate about Latin rhythms and Caribbean culture.', imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'4\"", hairColor: 'Black' },
  { id: '9', name: 'Maria', age: 33, city: 'Manila', country: 'Philippines', bio: 'Nurse with a caring heart. Looking for a serious relationship leading to marriage.', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'2\"", hairColor: 'Black' },
  { id: '10', name: 'Kateryna', age: 28, city: 'Kharkiv', country: 'Ukraine', bio: 'Software developer who loves technology and nature equally. Seeking my soulmate.', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'7\"", hairColor: 'Brunette' },
  { id: '11', name: 'Valentina', age: 26, city: 'Cali', country: 'Colombia', bio: 'Marketing executive who loves beach life and good coffee. Very family oriented.', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'5\"", hairColor: 'Brunette' },
  { id: '12', name: 'Olga', age: 35, city: 'Dnipro', country: 'Ukraine', bio: 'Economist who values stability and honesty. I want to build a strong family.', imageUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=600', verified: true, height: "5'8\"", hairColor: 'Blonde' },
];

const INITIAL_TOURS: Tour[] = [
  { id: 't1', city: 'Kyiv & Odesa', countries: ['Ukraine'], startDate: '2025-05-15', endDate: '2025-05-25', checkInTime: '2:00 PM', price: '$3,495', status: 'Open', image: 'https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=1200' },
  { id: 't2', city: 'Medellin & Bogota', countries: ['Colombia'], startDate: '2025-06-10', endDate: '2025-06-20', checkInTime: '3:00 PM', price: '$2,995', status: 'Filling Fast', image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=1200' },
  { id: 't3', city: 'Manila & Cebu', countries: ['Philippines'], startDate: '2025-07-05', endDate: '2025-07-15', checkInTime: '1:00 PM', price: '$3,195', status: 'Open', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=1200' },
  { id: 't4', city: 'Lviv & Kharkiv', countries: ['Ukraine'], startDate: '2025-08-01', endDate: '2025-08-12', checkInTime: '2:00 PM', price: '$3,295', status: 'Open', image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=1200' },
  { id: 't5', city: 'Cartagena & Cali', countries: ['Colombia'], startDate: '2025-09-05', endDate: '2025-09-15', checkInTime: '4:00 PM', price: '$3,195', status: 'Waitlist', image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&q=80&w=1200' },
  { id: 't6', city: 'Multi-City Ukraine', countries: ['Ukraine'], startDate: '2025-10-10', endDate: '2025-10-25', checkInTime: '12:00 PM', price: '$4,495', status: 'Open', image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=1200' },
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
