# Befree Boilerplate (Next.js + Supabase)

A premium, AI-friendly SaaS boilerplate using **Next.js 15 (App Router)**, **Supabase**, **Tailwind CSS v4**, and **Untitled UI** design tokens. This boilerplate is optimized for industrial-grade SaaS development and AI-assisted coding.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/pedrobefree/befree-nextjs-boilerplate.git
cd befree-nextjs-boilerplate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase Locally (Docker)
This boilerplate is designed to work with Supabase CLI for local development.

1. **Install Supabase CLI**:
   - **macOS**: `brew install supabase/tap/supabase`
   - **Windows**: `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git` then `scoop install supabase`
   - **Linux**: `brew install supabase/tap/supabase` or use the [direct binary](https://github.com/supabase/cli/releases)
   - **Alternative (All OS)**: `npm install supabase --save-dev`
2. **Start Supabase Services**:
   Ensure Docker Desktop is running, then execute:
   ```bash
   supabase start
   ```
3. **Apply Migrations**:
   The database schema will automatically apply, but you can force it with:
   ```bash
   supabase db reset
   ```
4. **Get your local keys**:
   After `supabase start` finishes, it will print your `API URL`, `anon key`, and `service_role key`.

### 4. Configure Environment Variables
1. **Create .env.local**:
   ```bash
   cp .env.local.example .env.local
   ```
2. **Update keys**:
   Open `.env.local` and paste the keys provided by the Supabase CLI in the previous step.
3. **Encryption Key**:
   Generate a random 32-character string for `ENCRYPTION_KEY` to secure sensitive data.

### 5. Initialize Branding & Theme
This boilerplate features an automated branding system. To generate the CSS palette based on your settings in `lib/constants.ts`:
```bash
npm run theme
```

### 6. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see your app in action!

---

## 🎨 Customizing Branding

To change the app name, logo, or primary color:
1.  Open **`lib/constants.ts`**.
2.  Update `BRAND_CONFIG` with your values.
3.  Run **`npm run theme`** to sync the Tailwind colors.

---

## 🏗️ Project Architecture

Internal structure optimized for security and scalability:

- **`/app`**: Next.js App Router (Pages, Layouts, API Routes).
- **`/components/ui/`**: Generic primitive components powered by Untitled UI.
- **`/components/features/`**: Domain-specific components (Auth, Dashboard, Projects).
- **`/lib/supabase/`**: Specialized clients (Server, Client, Middleware).
- **`/lib/encryption.ts`**: AES-256-GCM service for data protection.
- **`/supabase/migrations/`**: Version-controlled database schema.

---

## 🔒 Security Best Practices

### Rule 0: Security Isolation (CRITICAL)
- **NEVER** use `SUPABASE_SERVICE_ROLE_KEY` in client-side code.
- **ALL** mutations must go through Server Actions or API routes that validate sessions.
- **RLS** (Row Level Security) is mandatory on every table.
- **Sensitive Data** must be encrypted before storage using the `EncryptionService`.

---

## 🤖 AI-Friendly Features

- **Named Exports**: Better discoverability for LLMs.
- **JSDoc Documentation**: High coverage for props and logic.
- **Pattern Fragments**: Easy-to-clone established patterns for forms and data fetching.

---

## 📝 License

Internal Use - Befree Academy
