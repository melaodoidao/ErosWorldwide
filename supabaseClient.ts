import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// You need to create a project at https://supabase.com and get these values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
    return supabaseUrl !== '' && supabaseAnonKey !== '';
};

// Database types matching our existing types
export interface DbLadyProfile {
    id: string;
    name: string;
    age: number;
    city: string;
    country: string;
    bio: string;
    image_url: string;
    verified: boolean;
    height: string;
    hair_color: string;
    eye_color?: string;
    weight?: string;
    education?: string;
    occupation?: string;
    religion?: string;
    children?: string;
    wants_children?: string;
    languages?: string[];
    smoking?: string;
    drinking?: string;
    about_me?: string;
    looking_for?: string;
    video_intro?: boolean;
    created_at?: string;
    last_active?: string;
    profile_views?: number;
}

export interface DbGentlemanProfile {
    id: string;
    name: string;
    email: string;
    age: number;
    profession: string;
    location: string;
    bio: string;
    registration_date: string;
    verified: boolean;
    user_id?: string; // Supabase auth user ID
}

export interface DbTour {
    id: string;
    city: string;
    countries: string[];
    start_date: string;
    end_date: string;
    check_in_time: string;
    price: string;
    status: 'Open' | 'Filling Fast' | 'Waitlist' | 'Closed';
    image: string;
    max_participants: number;
    current_participants: number;
    description?: string;
}

export interface DbContactSubmission {
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at?: string;
    status?: 'new' | 'read' | 'replied';
}

export interface DbInterestExpression {
    id?: string;
    gentleman_id: string;
    lady_id: string;
    message?: string;
    created_at?: string;
    status?: 'pending' | 'viewed' | 'responded';
}

// Supabase API functions
export const supabaseApi = {
    // Ladies
    ladies: {
        getAll: async () => {
            const { data, error } = await supabase
                .from('ladies')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data as DbLadyProfile[];
        },

        getById: async (id: string) => {
            const { data, error } = await supabase
                .from('ladies')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data as DbLadyProfile;
        },

        incrementViews: async (id: string) => {
            const { error } = await supabase.rpc('increment_profile_views', { lady_id: id });
            if (error) console.error('Error incrementing views:', error);
        },

        search: async (filters: {
            ageMin?: number;
            ageMax?: number;
            country?: string;
            hairColor?: string;
            city?: string;
        }) => {
            let query = supabase.from('ladies').select('*');

            if (filters.ageMin) query = query.gte('age', filters.ageMin);
            if (filters.ageMax) query = query.lte('age', filters.ageMax);
            if (filters.country) query = query.eq('country', filters.country);
            if (filters.hairColor) query = query.eq('hair_color', filters.hairColor);
            if (filters.city) query = query.ilike('city', `%${filters.city}%`);

            const { data, error } = await query.order('created_at', { ascending: false });
            if (error) throw error;
            return data as DbLadyProfile[];
        }
    },

    // Gentlemen (Registration)
    gentlemen: {
        register: async (profile: Omit<DbGentlemanProfile, 'id' | 'registration_date' | 'verified'>) => {
            const { data, error } = await supabase
                .from('gentlemen')
                .insert({
                    ...profile,
                    registration_date: new Date().toISOString(),
                    verified: false
                })
                .select()
                .single();
            if (error) throw error;
            return data as DbGentlemanProfile;
        },

        getByEmail: async (email: string) => {
            const { data, error } = await supabase
                .from('gentlemen')
                .select('*')
                .eq('email', email)
                .single();
            if (error && error.code !== 'PGRST116') throw error;
            return data as DbGentlemanProfile | null;
        }
    },

    // Tours
    tours: {
        getAll: async () => {
            const { data, error } = await supabase
                .from('tours')
                .select('*')
                .order('start_date', { ascending: true });
            if (error) throw error;
            return data as DbTour[];
        },

        getUpcoming: async () => {
            const { data, error } = await supabase
                .from('tours')
                .select('*')
                .gte('start_date', new Date().toISOString().split('T')[0])
                .order('start_date', { ascending: true });
            if (error) throw error;
            return data as DbTour[];
        }
    },

    // Contact form
    contact: {
        submit: async (submission: DbContactSubmission) => {
            const { data, error } = await supabase
                .from('contact_submissions')
                .insert({
                    ...submission,
                    status: 'new'
                })
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    },

    // Interest expressions
    interests: {
        express: async (gentlemanId: string, ladyId: string, message?: string) => {
            const { data, error } = await supabase
                .from('interest_expressions')
                .insert({
                    gentleman_id: gentlemanId,
                    lady_id: ladyId,
                    message,
                    status: 'pending'
                })
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    },

    // Authentication
    auth: {
        signUp: async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });
            if (error) throw error;
            return data;
        },

        signIn: async (email: string, password: string) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
            return data;
        },

        signOut: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },

        getUser: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            return user;
        },

        onAuthStateChange: (callback: (event: string, session: any) => void) => {
            return supabase.auth.onAuthStateChange(callback);
        }
    }
};

export default supabase;
