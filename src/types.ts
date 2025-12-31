
export interface LadyProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  bio: string;
  imageUrl: string;
  verified: boolean;
  height: string;
  hairColor: string;
  eyeColor: string;
  occupation: string;
  education: string;
  religion: string;
  children: string;
  languages: string;
  smoking: string;
  drinking?: string;
  lookingFor?: string;
  gallery: string[];
  idPhotoUrl?: string;
  created_at?: string;
}

export interface GentlemanProfile {
  id: string;
  name: string;
  email?: string;
  age: number;
  profession: string;
  location: string;
  bio: string;
  registrationDate: string;
}

export interface Tour {
  id: string;
  city: string;
  countries: string[];
  startDate: string;
  endDate: string;
  checkInTime: string;
  price: string;
  status: 'Open' | 'Filling Fast' | 'Waitlist' | 'Closed';
  image: string;
}

export interface SuccessStory {
  id: number;
  name: string;
  location: string;
  story: string;
  img: string;
  video: boolean;
}

export interface Office {
  city: string;
  country: string;
  address: string;
  staff: string;
  img: string;
}

export type AppTab =
  | 'home'
  | 'tours'
  | 'ladies'
  | 'gentlemen'
  | 'admin'
  | 'testimonials'
  | 'philosophy'
  | 'reviews'
  | 'offices'
  | 'faq'
  | 'legal'
  | 'contact';
