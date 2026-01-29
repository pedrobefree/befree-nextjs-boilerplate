# Supabase Setup and Best Practices

This guide covers how to manage and extend the Supabase backend for this boilerplate.

## Local Development Setup

1. **Install Supabase CLI**:
   ```bash
   brew install supabase/tap/supabase
   ```

2. **Initialize & Start**:
   ```bash
   supabase init
   supabase start
   ```

3. **Login to Supabase**:
   ```bash
   supabase login
   ```

4. **Link to Cloud Project**:
   ```bash
   supabase link --project-ref qafmmhdrlygjwivkhmoc
   ```

## Database Migrations

All schema changes are tracked in `/supabase/migrations`.

- **Create a new migration**:
  ```bash
  supabase migration new name_of_migration
  ```
- **Apply changes locally**:
  ```bash
  supabase db reset
  ```
- **Sync changes with cloud**:
  ```bash
  supabase db push
  ```

## Security & RLS (Row Level Security)

### Rule 0: Security Isolation
- **Client Components**: Only use the client from `@/lib/supabase/client`. Never use service role keys.
- **Server Actions**: Always validate the user session using `supabase.auth.getUser()` before performing DB operations.
- **RLS**: Every table MUST have RLS enabled. Policy logic should rely on `auth.uid()` or session context.

### Testing RLS Policies

Use the Supabase SQL Editor to test as different users:

```sql
-- Simulate being a specific user
SET request.jwt.claims = '{"sub": "USER_UUID_HERE"}';
SELECT * FROM projects; -- Should only return projects for that user's organizations
```

## Multi-Tenant Isolation

Data is isolated using the `organization_members` join table. Most RLS policies use a sub-query like:

```sql
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  )
)
```

## Encryption at Rest

Sensitive fields (like API keys) must be encrypted before being stored. Use the `EncryptionService` in your Server Actions:

```typescript
import { encryption } from "@/lib/encryption";

// Encrypt
const encrypted = encryption.encrypt(rawKey);

// Decrypt
const raw = encryption.decrypt(storedValue);
```

## Supabase MCP (Model Context Protocol)

The Supabase MCP server allows AI agents (like Claude Desktop, Cursor, or Windsurf) to securely interact with your database, manage tables, and understand your schema.

### Installation & Setup

1. **Personal Access Token (PAT)**:
   - Go to [Supabase Dashboard > Access Tokens](https://supabase.com/dashboard/account/tokens).
   - Generate a new token with a descriptive name (e.g., "MCP Agent").

2. **Add to AI Agent Config**:
   Add the following server configuration to your agent's `config.json` (e.g., `~/Library/Application Support/Claude/claude_desktop_config.json`):

   ```json
   {
     "mcpServers": {
       "supabase": {
         "command": "npx",
         "args": [
           "-y",
           "@supabase/mcp-server-supabase@latest",
           "--access-token",
           "YOUR_SUPABASE_PAT"
         ]
       }
     }
   }
   ```

3. **Helper Script**:
   You can also run it directly via npm for testing:
   ```bash
   npm run mcp -- --access-token YOUR_TOKEN
   ```

> [!IMPORTANT]
> Keep your Personal Access Token secure. Never commit it to version control.
