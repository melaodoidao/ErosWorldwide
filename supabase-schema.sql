-- Aura & Eros - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- LADIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS ladies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 99),
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  bio TEXT,
  image_url TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  height VARCHAR(20),
  hair_color VARCHAR(50),
  eye_color VARCHAR(50),
  weight VARCHAR(20),
  education VARCHAR(100),
  occupation VARCHAR(100),
  religion VARCHAR(50),
  children VARCHAR(50),
  wants_children VARCHAR(20),
  languages TEXT[],
  smoking VARCHAR(20),
  drinking VARCHAR(20),
  about_me TEXT,
  looking_for TEXT,
  video_intro BOOLEAN DEFAULT false,
  profile_views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to increment profile views
CREATE OR REPLACE FUNCTION increment_profile_views(lady_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE ladies 
  SET profile_views = profile_views + 1,
      last_active = NOW()
  WHERE id = lady_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- GENTLEMEN TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS gentlemen (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INTEGER CHECK (age >= 25 AND age <= 99),
  profession VARCHAR(100),
  location VARCHAR(200),
  bio TEXT,
  verified BOOLEAN DEFAULT false,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- TOURS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city VARCHAR(200) NOT NULL,
  countries TEXT[] NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  check_in_time VARCHAR(20),
  price VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'Filling Fast', 'Waitlist', 'Closed')),
  image TEXT,
  max_participants INTEGER DEFAULT 20,
  current_participants INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CONTACT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INTEREST EXPRESSIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS interest_expressions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gentleman_id UUID REFERENCES gentlemen(id) ON DELETE CASCADE,
  lady_id UUID REFERENCES ladies(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(gentleman_id, lady_id)
);

-- =============================================
-- TOUR REGISTRATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS tour_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  gentleman_id UUID REFERENCES gentlemen(id) ON DELETE CASCADE,
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  stripe_payment_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tour_id, gentleman_id)
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE ladies ENABLE ROW LEVEL SECURITY;
ALTER TABLE gentlemen ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_expressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_registrations ENABLE ROW LEVEL SECURITY;

-- Ladies: Public read access
CREATE POLICY "Ladies are viewable by everyone" ON ladies
  FOR SELECT USING (true);

-- Gentlemen: Users can only read/update their own profile
CREATE POLICY "Gentlemen can view own profile" ON gentlemen
  FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Gentlemen can update own profile" ON gentlemen
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can register" ON gentlemen
  FOR INSERT WITH CHECK (true);

-- Tours: Public read access
CREATE POLICY "Tours are viewable by everyone" ON tours
  FOR SELECT USING (true);

-- Contact submissions: Anyone can submit
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Interest expressions: Users manage their own
CREATE POLICY "Users can manage their interests" ON interest_expressions
  FOR ALL USING (
    gentleman_id IN (SELECT id FROM gentlemen WHERE user_id = auth.uid())
  );

-- Tour registrations: Users manage their own
CREATE POLICY "Users can manage their registrations" ON tour_registrations
  FOR ALL USING (
    gentleman_id IN (SELECT id FROM gentlemen WHERE user_id = auth.uid())
  );

-- =============================================
-- SEED DATA - Initial Ladies
-- =============================================
INSERT INTO ladies (name, age, city, country, bio, image_url, verified, height, hair_color, eye_color, education, occupation, religion) VALUES
('Elena', 24, 'Kyiv', 'Ukraine', 'Architect with a passion for classical music and travel. Looking for a man who values sincerity.', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600', true, '5''7"', 'Blonde', 'Blue', 'Master''s Degree', 'Architect', 'Christian'),
('Sofia', 29, 'Bogota', 'Colombia', 'Pediatrician who loves salsa and outdoor adventures. Family is everything to me.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600', true, '5''5"', 'Brunette', 'Brown', 'Medical Degree', 'Pediatrician', 'Catholic'),
('Mariya', 36, 'Odesa', 'Ukraine', 'Professional chef seeking someone to share life with. I believe in traditional values.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600', true, '5''8"', 'Brunette', 'Green', 'Culinary School', 'Chef', 'Orthodox'),
('Viktoria', 22, 'Cebu City', 'Philippines', 'University student majoring in communications. I am cheerful and optimistic.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600', true, '5''3"', 'Black', 'Brown', 'University Student', 'Student', 'Catholic'),
('Natali', 31, 'Medellin', 'Colombia', 'Fitness coach who loves healthy living and deep conversations.', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600', true, '5''6"', 'Brunette', 'Brown', 'Sports Science', 'Fitness Coach', 'Catholic'),
('Irina', 39, 'Kyiv', 'Ukraine', 'Fashion designer with a sophisticated soul. Seeking a reliable partner.', 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&q=80&w=600', true, '5''9"', 'Red', 'Green', 'Design School', 'Fashion Designer', 'Orthodox'),
('Anastasia', 27, 'Lviv', 'Ukraine', 'English teacher who dreams of a loving family. I enjoy reading and painting.', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600', true, '5''6"', 'Blonde', 'Blue', 'University Degree', 'Teacher', 'Orthodox'),
('Camila', 25, 'Cartagena', 'Colombia', 'Dance instructor passionate about Latin rhythms and Caribbean culture.', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600', true, '5''4"', 'Black', 'Brown', 'Dance Academy', 'Dance Instructor', 'Catholic'),
('Maria', 33, 'Manila', 'Philippines', 'Nurse with a caring heart. Looking for a serious relationship leading to marriage.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600', true, '5''2"', 'Black', 'Brown', 'Nursing Degree', 'Nurse', 'Catholic'),
('Kateryna', 28, 'Kharkiv', 'Ukraine', 'Software developer who loves technology and nature equally. Seeking my soulmate.', 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=600', true, '5''7"', 'Brunette', 'Brown', 'Computer Science', 'Software Developer', 'Orthodox');

-- =============================================
-- SEED DATA - Initial Tours
-- =============================================
INSERT INTO tours (city, countries, start_date, end_date, check_in_time, price, status, image, description) VALUES
('Kyiv & Odesa', ARRAY['Ukraine'], '2025-05-15', '2025-05-25', '2:00 PM', '$3,495', 'Open', 'https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=1200', 'Experience the beauty and culture of Ukraine while meeting verified, marriage-minded women.'),
('Medellin & Bogota', ARRAY['Colombia'], '2025-06-10', '2025-06-20', '3:00 PM', '$2,995', 'Filling Fast', 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?auto=format&fit=crop&q=80&w=1200', 'Discover the warmth of Colombian women in the city of eternal spring.'),
('Manila & Cebu', ARRAY['Philippines'], '2025-07-05', '2025-07-15', '1:00 PM', '$3,195', 'Open', 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=1200', 'Meet beautiful Filipina women known for their family values and caring nature.'),
('Lviv & Kharkiv', ARRAY['Ukraine'], '2025-08-01', '2025-08-12', '2:00 PM', '$3,295', 'Open', 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=1200', 'Explore Western Ukraine and meet educated, cultured women.'),
('Cartagena & Cali', ARRAY['Colombia'], '2025-09-05', '2025-09-15', '4:00 PM', '$3,195', 'Waitlist', 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&q=80&w=1200', 'Caribbean beauty meets Colombian passion in this exciting tour.'),
('Multi-City Ukraine', ARRAY['Ukraine'], '2025-10-10', '2025-10-25', '12:00 PM', '$4,495', 'Open', 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=1200', 'Our premium 15-day tour covering 4 major Ukrainian cities.');

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_ladies_country ON ladies(country);
CREATE INDEX IF NOT EXISTS idx_ladies_age ON ladies(age);
CREATE INDEX IF NOT EXISTS idx_ladies_verified ON ladies(verified);
CREATE INDEX IF NOT EXISTS idx_gentlemen_email ON gentlemen(email);
CREATE INDEX IF NOT EXISTS idx_tours_start_date ON tours(start_date);
CREATE INDEX IF NOT EXISTS idx_tours_status ON tours(status);
