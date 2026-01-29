# Befree Boilerplate (Nexjs + Supabase)

A premium, AI-friendly SaaS boilerplate using **Next.js 15 (App Router)**, **Supabase**, **Tailwind CSS v4**, and **Untitled UI** design tokens. This boilerplate is optimized for industrial-grade SaaS development and AI-assisted coding.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Add your Supabase keys and generate an ENCRYPTION_KEY

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

## 🏗️ Project Architecture

The project is structured to enforce security and multi-tenant isolation:

- **`/app`**: Next.js App Router (Pages, Layouts, API Routes).
- **`/components/ui/`**: Generic primitive components (Untitled UI).
- **`/components/features/`**: Domain-specific components (Auth, Dashboard, Profile).
- **`/lib/supabase/`**: Specialized clients for different context (Server, Client, Middleware).
- **`/lib/encryption.ts`**: AES-256-GCM service for protecting sensitive data at rest.
- **`/supabase/migrations/`**: Version-controlled database schema.

## 🔒 Security Best Practices

### Rule 0: Security Isolation (CRITICAL)
- **NEVER** use `SUPABASE_SERVICE_ROLE_KEY` in client-side code.
- **ALL** mutations must go through `/app/api/*` routes or Server Actions that validate user sessions.
- **RLS** is mandatory on every table to enforce multi-tenant isolation.
- **Sensitive Data** (API keys, etc.) must be encrypted before storage using the provided `EncryptionService`.

## 🤖 AI-Friendly Features

- **Standardized Conventions**: PascalCase for components, camelCase for utilities, RESTful API routes.
- **Named Exports**: All functions and components use named exports for better AI discoverability.
- **JSDoc Documentation**: High JSDoc coverage for props and logic to provide clear context for LLMs.
- **Pattern Fragments**: Established patterns for forms, error handling, and data fetching that are easy to clone.

## 🛠️ Key Utilities

### Database Operations
Use the `withErrorHandling` wrapper in Server Actions to ensure consistent error reporting.

```typescript
import { withErrorHandling } from "@/lib/supabase/errors";

export async function myAction() {
  return withErrorHandling(async () => {
    // DB logic here
  }, { action: "myAction" });
}
```

## 📝 License

Internal Use - Befree Academy
