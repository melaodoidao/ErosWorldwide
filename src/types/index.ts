// ========================================
// EROS WORLDWIDE - Type Definitions
// ========================================

// ===== LADY PROFILE =====
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
    eyeColor?: string;
    weight?: string;
    education?: string;
    occupation?: string;
    religion?: string;
    children?: string;
    wantsChildren?: string;
    languages?: string[];
    smoking?: string;
    drinking?: string;
    aboutMe?: string;
    lookingFor?: string;
    videoIntro?: boolean;
    profileViews?: number;
    galleryImages?: string[];
    createdAt?: string;
    lastActive?: string;
}

// ===== GENTLEMAN PROFILE =====
export interface GentlemanProfile {
    id: string;
    email: string;
    name: string;
    age: number;
    profession: string;
    location: string;
    bio: string;
    verified: boolean;
    registrationDate: string;
    passwordHash?: string;
}

// ===== TOUR =====
export interface Tour {
    id: string;
    city: string;
    countries: string[];
    startDate: string;
    endDate: string;
    checkInTime: string;
    price: string;
    status: TourStatus;
    image: string;
    maxParticipants?: number;
    currentParticipants?: number;
    description?: string;
    highlights?: string[];
}

export type TourStatus = 'Open' | 'Filling Fast' | 'Waitlist' | 'Closed';

// ===== SUCCESS STORY =====
export interface SuccessStory {
    id: string | number;
    name: string;
    location: string;
    story: string;
    img: string;
    video: boolean;
    videoUrl?: string;
    year?: number;
}

// ===== OFFICE =====
export interface Office {
    city: string;
    country: string;
    address: string;
    staff: string;
    img: string;
    phone?: string;
    email?: string;
}

// ===== FAQ =====
export interface FAQItem {
    question: string;
    answer: string;
    category?: string;
}

// ===== CONTACT SUBMISSION =====
export interface ContactSubmission {
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: string;
    status?: 'new' | 'read' | 'replied';
}

// ===== INTEREST EXPRESSION =====
export interface InterestExpression {
    id?: string;
    gentlemanId: string;
    ladyId: string;
    message?: string;
    createdAt?: string;
    status?: 'pending' | 'viewed' | 'responded';
}

// ===== TOUR REGISTRATION =====
export interface TourRegistration {
    id?: string;
    tourId: string;
    gentlemanId: string;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    stripePaymentId?: string;
    notes?: string;
    createdAt?: string;
}

// ===== USER SESSION =====
export interface UserSession {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    token: string;
    expiresAt: number;
}

// ===== APP STATE =====
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
    | 'contact'
    | 'login';

// ===== FILTER STATE =====
export interface LadyFilters {
    search: string;
    ageRange: 'all' | '18-25' | '26-33' | '34-40' | '40+';
    hairColor: 'all' | 'Blonde' | 'Brunette' | 'Black' | 'Red';
    country: 'all' | string;
    height: 'all' | string;
}

// ===== API RESPONSES =====
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// ===== NAVIGATION =====
export interface NavItem {
    id: AppTab;
    label: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
}
