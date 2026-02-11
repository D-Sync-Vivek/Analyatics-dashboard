# 📊 SaaS Analytics Dashboard

A full-stack, real-time analytics platform built to demonstrate modern web architecture. This project features a high-performance dashboard with server-side data fetching, interactive data visualization, and secure authentication.

## 🚀 Features

- **Real-Time Overview:** Server-side calculation of total revenue, active users, and sales metrics.

- **Interactive Data Grid:** A headless, sortable transaction table built with TanStack Table and TypeScript Generics.

- **Data Visualization:** Responsive Area Charts for revenue trends using Recharts.

- **Full-Stack Mutations:** "Add Transaction" feature using Server Actions to write to Supabase and instantly revalidate the cache.

- **Secure Authentication:** User management (Login/Signup/Profile) powered by Clerk with Middleware protection.

- **Robust Form Handling:** Type-safe forms with **React Hook Form** and **Zod** validation.

- **Optimized UX:** Skeleton loading states and route groups (dashboard) to prevent layout shift.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)

- **Language:** TypeScript

- **Styling:** Tailwind CSS + Lucide Icons

- **Database:** Supabase (PostgreSQL)

- **Auth:** Clerk

- **State/Table:** TanStack Table v8

- **Charts:** Recharts

- **Forms:** React Hook Form + Zod

## ⚙️ Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/D-Sync-Vivek/saas-dashboard.git
cd saas-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**  
   Create a .env.local file in the root directory and add the following keys:

```
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Initialization**  
   Go to your Supabase SQL Editor and run the following command to set up the transactions table:

```sql
create table transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  amount numeric not null,
  status text check (status in ('pending', 'processing', 'success', 'failed')) not null,
  customer_name text not null,
  customer_email text not null
);

-- Enable RLS (Optional for dev, recommended for prod)
alter table transactions enable row level security;
create policy "Public Access" on transactions for all using (true) with check (true);
```

5. **Run the application**

```bash
npm run dev
```

Open http://localhost:3000 to view the dashboard.

## 📂 Project Structure

```bash
app/
├── (auth)/             # Authentication routes (Login/Signup)
├── dashboard/          # Protected dashboard routes
│   ├── analytics/      # Chart visualizations
│   ├── settings/       # User profile form
│   ├── column.tsx      # Table Column
│   ├── layout.tsx      # Sidebar & Header shell
│   ├── loading.tsx     # Skeleton Shell
│   └── page.tsx        # Main overview (Server Component)
└── layout.tsx          # Root layout with Providers
components/             # Reusable UI components (Charts, Tables, Cards)
lib/                    # Utility functions & Supabase client
types/
```
## 🧠 Key Architectural Decisions
1. **Route Groups:** Used (dashboard) to isolate the dashboard layout (Sidebar/Header) from the landing page and auth pages, ensuring the shell is persistent and preventing layout shift.

2. **Server Components:** The main dashboard fetches data directly from Supabase inside page.tsx. This reduces the client-side bundle and eliminates the need for useEffect data fetching chains.

3. **Headless UI:** Adopted TanStack Table instead of a pre-built table component. This allows complete control over the markup and styling while leveraging battle-tested logic for sorting and pagination.

4. **Server Actions:** Data mutations (adding transactions) are handled via Server Actions, allowing the app to run without a separate API layer for simple CRUD operations.

---
Built by **Vivek Kumar** as a Full Stack Portfolio Project.
