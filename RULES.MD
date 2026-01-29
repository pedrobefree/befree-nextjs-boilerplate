# Development Rules & Patterns

> **Purpose**: This document defines the coding standards, patterns, and conventions for this Next.js + Supabase boilerplate. All new features and components MUST follow these rules to maintain consistency, security, and quality.

-----

## CRITICAL SECURITY RULES (Must Read First)

### Rule 0: Security Isolation

**NEVER expose sensitive keys or allow client-side security bypasses.**

**Triggers**: Creating/modifying files in `/app`, `/components`, or any client-side code.

**NON-NEGOTIABLE RESTRICTIONS**:

- **NO Service Role in Frontend**: NEVER use `SUPABASE_SERVICE_ROLE_KEY` in `/app` or `/components`
- **NO Direct Database Writes from Client**: Client-side code MUST NOT perform `insert`, `update`, or `delete` operations directly
- **ALL Mutations Through API Routes**: Every state change must go through `/app/api/*` routes that validate sessions
- **Use RLS Policies**: Every table must have Row Level Security enabled with proper policies

**Example - WRONG**:

```typescript
// app/components/AdminPanel.tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // PRIVILEGE LEAK!
)

export function AdminPanel() {
  const deleteUser = async (id: string) => {
    await supabase.from('users').delete().eq('id', id) // Direct write!
  }
}
```

**Example - CORRECT**:

```typescript
// app/components/AdminPanel.tsx
export function AdminPanel() {
  const deleteUser = async (id: string) => {
    await fetch('/api/admin/users', {
      method: 'DELETE',
      body: JSON.stringify({ userId: id }),
      credentials: 'include'
    })
  }
}

// app/api/admin/users/route.ts
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function DELETE(req: Request) {
  const supabase = createServerClient(cookies())
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user?.user_metadata?.is_admin) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Now safe to use service role if needed
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  // ... delete logic
}
```

-----

## 1. Project Structure Rules

### Folder Organization

```
/app                        → Next.js App Router pages and API routes
  /api                      → API routes (server-side only)
  /(auth)                   → Auth pages (login, signup, etc.)
  /dashboard                → Protected pages
/components
  /ui                       → Untitled UI primitives (Button, Input, Card)
  /features                 → Feature-specific composed components
  /layout                   → Layout components (Header, Footer, Nav)
/lib
  /supabase                 → Supabase client utilities
  /utils                    → Utility functions
  /constants.js             → Shared constants
/public                     → Static assets only
/supabase
  /migrations               → Database migrations
```

**Rule**: Never create components outside designated folders. API routes belong only in `/app/api/*`.

-----

## 2. File Naming Conventions

### Components

- **Format**: PascalCase with descriptive names
- **Examples**:
  - `UserProfileCard.jsx`
  - `ProductListingGrid.jsx`
  - `card.jsx`
  - `UPC.jsx`

### Utilities and Helpers

- **Format**: camelCase, descriptive
- **Examples**:
  - `formatDate.js`
  - `calculateDiscount.js`
  - `utils.js` (too generic)
  - `helper.js` (too vague)

### API Routes

- **Format**: Lowercase with hyphens, RESTful
- **Examples**:
  - `/app/api/users/route.ts`
  - `/app/api/organizations/[id]/route.ts`
  - `/app/api/getUsers.ts`

**Rule**: Names must be self-documenting. Avoid abbreviations.

-----

## 3. Component Structure Pattern

All components MUST follow this structure:

```jsx
// 1. Imports - grouped by type
import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/formatDate'

// 2. Component definition with JSDoc
/**
 * UserProfileCard displays user information in a card layout
 * @param {Object} props
 * @param {string} props.name - User's full name
 * @param {string} props.email - User's email address
 * @param {string} [props.avatarUrl] - Optional avatar image URL
 * @param {Function} [props.onEdit] - Optional callback when edit is clicked
 */
export function UserProfileCard({ name, email, avatarUrl, onEdit }) {
  // 3. Hooks (if any)
  const [isEditing, setIsEditing] = useState(false)
  
  // 4. Event handlers
  const handleEdit = () => {
    setIsEditing(true)
    onEdit?.()
  }
  
  // 5. Input validation / early returns
  if (!name) {
    console.error('UserProfileCard: name is required')
    return null
  }
  
  // 6. Render
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      {/* Component JSX */}
    </div>
  )
}
```

**Rules**:

- Always add JSDoc comments describing props
- Group imports logically (React, Next.js, components, utilities)
- Use named exports for components (not default exports)
- Validate inputs early (fail fast principle)
- Keep component files focused - one main component per file
- Extract complex logic into custom hooks or utility functions

-----

## 4. Styling Rules (Tailwind CSS)

### Class Organization

Use the `cn()` utility for conditional classes:

```jsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes always-applied",
  condition && "conditional-classes",
  variant === 'primary' && "variant-specific-classes",
  className // Allow prop overrides last
)} />
```

### Design System Adherence

- **Always use Untitled UI design tokens**: colors, spacing, typography from `tailwind.config.js`
- **Never use arbitrary values** like `w-[347px]` - use spacing scale instead
- **Prefer semantic color names**: `bg-primary-500` over `bg-blue-500`

**Examples**:

- `text-gray-900 dark:text-white`
- `px-4 py-2` (using spacing scale)
- `text-[#1a1a1a]` (arbitrary color)
- `px-[23px]` (arbitrary spacing)

-----

## 5. State Management Patterns

### Local State

Use `useState` for component-local state only:

```jsx
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({ name: '', email: '' })
```

### Shared State

For state shared across components, use one of:

- Props drilling (if 1-2 levels deep)
- Context API (for theme, auth, etc.)
- URL state for filters/pagination

**Rule**: Don’t introduce global state management (Redux, Zustand) until there’s clear need across 3+ distant components.

-----

## 6. Data Fetching Pattern

### Client-Side Fetching

```jsx
'use client'

import { useState, useEffect } from 'react'

export function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data')
        if (!response.ok) throw new Error('Failed to fetch')
        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error('Data fetch error:', err)
        setError('Failed to load data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!data) return null

  return <div>{/* Render data */}</div>
}
```

**Rules**:

- Always handle loading, error, and empty states explicitly
- Log technical errors to console
- Show user-friendly error messages
- Never expose raw error details to users

-----

## 7. Form Handling Pattern

### Basic Form Pattern with Validation

```jsx
export function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validate early - fail fast
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email?.includes('@')) {
      newErrors.email = 'Valid email required'
    }
    
    if (!formData.message?.trim()) {
      newErrors.message = 'Message is required'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate before processing
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form on success
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: 'Failed to submit. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

**Rule**: Always validate inputs early, show errors clearly, and disable submit during loading.

-----

## 8. Error Handling Rules

### Principle: Separate Technical Logs from User Messages

**User-Facing Errors** (actionable, friendly):

```jsx
<ErrorMessage 
  title="Something went wrong"
  message="We couldn't load your data. Please try again."
  action={<Button onClick={retry}>Retry</Button>}
/>
```

**Console Errors** (technical details for debugging):

```jsx
catch (error) {
  // Log technical details
  console.error('API Error:', {
    endpoint: '/api/users',
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  })
  
  // Show user-friendly message
  setError('Failed to load data. Please try again.')
}
```

### Never Swallow Errors

```javascript
// WRONG - Silent failure
try {
  await riskyOperation()
} catch (e) {
  // Nothing - error is lost!
}

// CORRECT - Log and handle
try {
  await riskyOperation()
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('Failed to complete operation')
}
```

**Rules**:

- Never expose raw error messages or stack traces to users
- Always log errors with context (function name, parameters, timestamp)
- Provide actionable feedback to users
- Use try-catch around all async operations

-----

## 9. Security & Secrets Management

### API Keys and Sensitive Data

**Encryption at Rest**:

```javascript
// When storing API keys in database
import { encrypt, decrypt } from '@/lib/encryption'

// WRONG
await supabase.from('settings').insert({
  api_key: userProvidedKey // Plain text!
})

// CORRECT
const encryptedKey = encrypt(userProvidedKey)
await supabase.from('settings').insert({
  api_key_encrypted: encryptedKey
})
```

**Sanitized Logging**:

```javascript
// WRONG - Exposing secrets
console.log('User settings:', {
  email: user.email,
  apiKey: user.apiKey // Secret exposed!
})

// CORRECT - Sanitized
console.log('User settings updated:', {
  email: user.email,
  hasApiKey: !!user.apiKey // Boolean only
})
```

**Environment Variable Validation**:

```javascript
// lib/env.js
export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'ENCRYPTION_KEY'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
  
  // Validate encryption key format
  try {
    Buffer.from(process.env.ENCRYPTION_KEY!, 'base64')
  } catch {
    throw new Error('ENCRYPTION_KEY must be valid base64')
  }
}
```

-----

## 10. Multi-Tenant Data Isolation

### Principle: Always Filter by Tenant/User Context

**CRITICAL**: Never accept `user_id` or `organization_id` from request body - always extract from authenticated session.

```typescript
// WRONG - Accepts ID from request
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId') // User can pass ANY ID!
  
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId) // Data leak!
}

// CORRECT - ID from session
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id) // Safe - from authenticated session
}
```

### Row Level Security (RLS)

Every table MUST have RLS enabled:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  organization_id UUID NOT NULL,
  name TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can only update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);
```

-----

## 11. API Route Consistency

### RESTful Conventions

```
| Action  | Method | Route               | Response Code | Response Body    |
| ------- | ------ | ------------------- | ------------- | ---------------- |
| List    | GET    | /api/resources      | 200           | array of objects |
| Detail  | GET    | /api/resources/[id] | 200           | single object    |
| Create  | POST   | /api/resources      | 201           | created object   |
| Update  | PATCH  | /api/resources/[id] | 200           | updated object   |
| Replace | PUT    | /api/resources/[id] | 200           | replaced object  |
| Delete  | DELETE | /api/resources/[id] | 204           | no content       |
```

### Standard Error Response Format

```typescript
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email address",
    "field": "email"
  }
}
```

**Examples**:

```typescript
// WRONG
app/api/getUsers/route.ts        // Verb in path
app/api/user/create/route.ts     // Verb in path + singular
app/api/deleteUser/[id]/route.ts // Verb in path

// CORRECT
app/api/users/route.ts           // GET /api/users (list)
app/api/users/route.ts           // POST /api/users (create)
app/api/users/[id]/route.ts      // GET /api/users/:id (detail)
app/api/users/[id]/route.ts      // PATCH /api/users/:id (update)
app/api/users/[id]/route.ts      // DELETE /api/users/:id (delete)
```

-----

## 12. Environment Isolation

### Principle: Separate Everything by Environment

**Never share databases between environments**:

```bash
# .env.development
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=dev_key_xxx

# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=prod_key_xxx
```

**Environment Validation**:

```typescript
// lib/env.ts
export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production'
}

export function getCurrentEnvironment(): Environment {
  const env = process.env.NODE_ENV || 'development'
  return env as Environment
}

export function validateEnvironment() {
  const env = getCurrentEnvironment()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  // Prevent production keys in dev
  if (env === Environment.Development) {
    if (supabaseUrl?.includes('prod')) {
      throw new Error('Production URL detected in development!')
    }
  }
}
```

**Destructive Operations Protection**:

```typescript
// scripts/seed.ts
async function seedDatabase() {
  const env = getCurrentEnvironment()
  
  if (env === Environment.Production) {
    throw new Error('SEED BLOCKED IN PRODUCTION!')
  }
  
  // Safe to seed in dev/staging
  await db.execute("DELETE FROM test_users")
}
```

-----

## 13. Dependency Hygiene

### Principle: Minimize Dependencies, Maximize Security

**Before adding ANY dependency**:

1. Check last release date (< 12 months preferred)
1. Check weekly downloads (>1000 for npm)
1. Check GitHub stars (>500)
1. Run security audit
1. Ask: “Can I implement this in 20 lines?”

**Audit Commands**:

```bash
# Check for vulnerabilities
npm audit
npm audit fix

# Check outdated packages
npm outdated
```

**Avoid Trivial Dependencies**:

```javascript
// WRONG - Installing package for trivial function
import isOdd from 'is-odd'
const result = isOdd(5)

// CORRECT - Implement inline
const isOdd = (n) => n % 2 !== 0
const result = isOdd(5)
```

-----

## 14. Documentation as Code

### Principle: Self-Documenting Code > External Docs

**Naming for Clarity**:

```javascript
// WRONG
function calc(a, b, c) { ... }
const ue = user.email

// CORRECT  
function calculateMonthlyRevenue(sales, costs, taxes) { ... }
const userEmail = user.email
```

**JSDoc for All Public Functions**:

```javascript
/**
 * Calculates the total price of an order after discounts
 * 
 * @param {number} unitPrice - Price per item (must be >= 0)
 * @param {number} quantity - Number of items (must be >= 1)
 * @param {number} discountPercent - Discount as percentage (0-100)
 * @returns {number} Final price after discount
 * @throws {Error} If unitPrice < 0 or quantity < 1
 * 
 * @example
 * calculateOrderTotal(10.00, 3, 10) // Returns 27.00
 */
export function calculateOrderTotal(unitPrice, quantity, discountPercent = 0) {
  if (unitPrice < 0) throw new Error('Price cannot be negative')
  if (quantity < 1) throw new Error('Quantity must be at least 1')
  
  const subtotal = unitPrice * quantity
  const discount = subtotal * (discountPercent / 100)
  return subtotal - discount
}
```

**Prohibited**:

- Comments that repeat code (`i++ // increment i`)
- Commented-out code (use git history)
- TODOs without ticket reference

-----

## 15. Git Commit Discipline

### Conventional Commits Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting (no logic change)
- `refactor:` Code change without behavior change
- `test:` Adding or fixing tests
- `chore:` Maintenance (deps, configs)

**Rules**:

- Description in lowercase, no period
- Max 72 characters for first line
- Body explains “what” and “why”, not “how”

**Examples**:

```bash
# WRONG
git commit -m "fix"
git commit -m "changes"
git commit -m "wip"

# CORRECT
git commit -m "feat(auth): add Google OAuth login flow"
git commit -m "fix(api): correct tax calculation for EU customers"
git commit -m "docs(readme): add setup instructions for Supabase"
git commit -m "chore(deps): update next to 14.1.0"
```

-----

## 16. Accessibility Rules

### Required Practices

- All interactive elements must be keyboard accessible
- Images must have meaningful `alt` text
- Forms must have associated labels
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Color contrast must meet WCAG AA standards

**Examples**:

```jsx
// Good
<button onClick={handleClick} aria-label="Close menu">
  <XIcon />
</button>

<Image src="/hero.jpg" alt="Team collaborating in modern office" />

<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// Bad
<div onClick={handleClick}>
  <XIcon />
</div>

<Image src="/hero.jpg" alt="image" />

<input type="email" /> {/* No label */}
```

-----

## 17. Performance Rules

### Image Optimization

```jsx
import Image from 'next/image'

// Always use Next.js Image component
<Image 
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={isAboveFold}
/>
```

### Code Splitting

- Use dynamic imports for large components not needed immediately
- Lazy load below-the-fold content

**Rule**: Don’t prematurely optimize. Only add complexity when there’s measured performance impact.

-----

## 18. AI-Assisted Development Rules

### When Working with AI

1. **Always provide context**: Reference this rules file and relevant components
1. **Be specific**: “Create a ProductCard component following RULES.md section 3” vs “make a card”
1. **Request adherence**: “Follow the patterns in RULES.md” in your prompts
1. **Review output**: AI-generated code must be reviewed against these rules
1. **Iterate**: Ask AI to fix violations rather than accepting non-compliant code

### Example AI Prompt Template

```
Create a [component name] that:
- Follows component structure pattern (RULES.md section 3)
- Uses Untitled UI design tokens (no arbitrary values)
- Handles loading, error, and empty states
- Includes JSDoc comments
- Is accessible (keyboard nav, ARIA labels)
- Follows security isolation rules (section 0)

Requirements: [specific functionality]
```

-----

## 19. Code Review Checklist

Before considering any code complete, verify:

**Security** (Most Critical):

- [ ] No sensitive keys in frontend code
- [ ] No direct database writes from client
- [ ] API routes validate user sessions
- [ ] RLS policies are in place
- [ ] Secrets are encrypted at rest
- [ ] No secrets in logs

**Code Quality**:

- [ ] Follows naming conventions
- [ ] Placed in correct folder
- [ ] Has JSDoc comments for props/parameters
- [ ] Uses design system tokens (no arbitrary values)
- [ ] Handles loading, error, and empty states
- [ ] Is keyboard accessible
- [ ] Has meaningful alt text for images
- [ ] Uses semantic HTML
- [ ] Imports are organized
- [ ] No console.logs left in production code
- [ ] Works responsively (mobile, tablet, desktop)

**Architecture**:

- [ ] Single responsibility per component
- [ ] Business logic in utility functions
- [ ] No duplicated code
- [ ] Testable structure

-----

## Quick Reference

### CRITICAL Rules (Never Break)

1. **Security Isolation** - No service role keys in frontend, no direct client writes
1. **Multi-Tenant Isolation** - Always filter by session user/org, never accept IDs from request
1. **Error Handling** - Never swallow errors, separate user/technical messages
1. **Secrets Management** - Encrypt at rest, sanitize logs, validate env vars

### Important Rules (Break with Caution)

1. **Descriptive naming** - No abbreviations, clear intent
1. **JSDoc all public functions** - Document params, returns, throws
1. **Use design tokens** - Never arbitrary Tailwind values
1. **Handle all states** - Loading, error, empty, success
1. **API consistency** - RESTful routes, standard responses
1. **Environment isolation** - Separate databases, validate configs

### Best Practices (Follow When Possible)

- **Clarity > Cleverness**
- **Consistency > Personal preference**
- **Simple > Complex**
- **Documented > Undocumented**
- **Secure by default**

-----

**Last Updated**: January 2026
**Version**: 2.0 (Enhanced with Security & Architecture Rules)
**Based on**: Next.js + Supabase + Untitled UI boilerplate