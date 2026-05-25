import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
};

export type SymptomLog = {
  id: string;
  user_id: string;
  logged_at: string;
  fatigue_level: number;
  pain_level: number;
  mood_score: number;
  flare_occurred: boolean;
  notes?: string;
};

export type LifestyleLog = {
  id: string;
  user_id: string;
  logged_at: string;
  sleep_hours: number;
  stress_level: number;
  diet_quality: number;
  activity_minutes: number;
  notes?: string;
};

export type Appointment = {
  id: string;
  user_id: string;
  practitioner_name: string;
  appointment_at: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  appointment_type: 'consultation' | 'coaching';
  notes?: string;
};

export type HealthRecord = {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  record_type: 'prescription' | 'report' | 'notes' | 'other';
  uploaded_at: string;
};
