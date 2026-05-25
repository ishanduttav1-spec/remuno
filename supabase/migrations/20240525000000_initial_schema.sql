-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create symptom logs table
CREATE TABLE symptom_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  logged_at DATE DEFAULT CURRENT_DATE NOT NULL,
  fatigue_level INTEGER CHECK (fatigue_level >= 0 AND fatigue_level <= 10),
  pain_level INTEGER CHECK (pain_level >= 0 AND pain_level <= 10),
  mood_score INTEGER CHECK (mood_score >= 0 AND mood_score <= 10),
  flare_occurred BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create lifestyle logs table
CREATE TABLE lifestyle_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  logged_at DATE DEFAULT CURRENT_DATE NOT NULL,
  sleep_hours NUMERIC CHECK (sleep_hours >= 0 AND sleep_hours <= 24),
  stress_level INTEGER CHECK (stress_level >= 0 AND stress_level <= 10),
  diet_quality INTEGER CHECK (diet_quality >= 0 AND diet_quality <= 10),
  activity_minutes INTEGER CHECK (activity_minutes >= 0),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  practitioner_name TEXT NOT NULL,
  appointment_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  appointment_type TEXT CHECK (appointment_type IN ('consultation', 'coaching')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create health records table
CREATE TABLE health_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  record_type TEXT CHECK (record_type IN ('prescription', 'report', 'notes', 'other')),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifestyle_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage their own symptom logs" ON symptom_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own lifestyle logs" ON lifestyle_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own appointments" ON appointments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own health records" ON health_records FOR ALL USING (auth.uid() = user_id);
