# Remuno - Autoimmune Care Intelligence Platform

Reimagining daily autoimmune care through continuous lifestyle and symptom intelligence.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ 
- A Supabase Project ([supabase.com](https://supabase.com))

### 2. Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Database Setup
1. Go to your Supabase Dashboard.
2. Open the **SQL Editor**.
3. Copy and run the contents of `supabase/migrations/20240525000000_initial_schema.sql`.
4. This will create the necessary tables (Profiles, Symptoms, Lifestyle, Appointments, Records) and enable Row Level Security (RLS).

### 4. Development
Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 🛠 Features Implemented (MVP)
- **Symptom Intelligence**: Daily tracking of fatigue, pain, and mood.
- **Exposome Monitoring**: Lifestyle tracking for sleep, stress, and activity.
- **Dynamic Dashboard**: Longitudinal charts correlating lifestyle patterns with symptoms.
- **Care Coordination**: Appointment booking interface for specialists.
- **Health Records**: Centralized vault for prescriptions and medical reports.

## 📦 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase
- **Visuals**: Recharts
- **Icons**: Lucide React
