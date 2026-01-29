-- Multi-Tenant Schema Setup
-- Following Section 0 and 10 of RULES.md

-- 1. Profiles Table (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Organizations Table (Tenants)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Organization Members (RBAC / Join Table)
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- 4. Projects Table (Tenant-scoped Data)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'completed')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES --

-- Profiles: Users can view and update their own profile
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
  CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);
END $$;

-- Organizations: Users can view organizations they belong to
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view belonging organizations" ON public.organizations;
  CREATE POLICY "Users can view belonging organizations"
    ON public.organizations FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM public.organization_members 
        WHERE organization_id = public.organizations.id 
        AND user_id = auth.uid()
      )
    );
END $$;

-- Organization Members: Users can see memberships of their organizations
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view org memberships" ON public.organization_members;
  CREATE POLICY "Users can view org memberships"
    ON public.organization_members FOR SELECT
    USING (
      user_id = auth.uid() OR
      organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
      )
    );
END $$;

-- Projects: Multi-tenant isolation
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view org projects" ON public.projects;
  CREATE POLICY "Users can view org projects"
    ON public.projects FOR SELECT
    USING (
      organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
      )
    );
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can insert org projects" ON public.projects;
  CREATE POLICY "Users can insert org projects"
    ON public.projects FOR INSERT
    WITH CHECK (
      organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
      )
    );
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can update org projects" ON public.projects;
  CREATE POLICY "Users can update org projects"
    ON public.projects FOR UPDATE
    USING (
      organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
      )
    );
END $$;

-- Function to handle new user signup
-- Automatically creates a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
