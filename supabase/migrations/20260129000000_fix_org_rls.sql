-- Add missing RLS policies for organization creation
-- Following multi-tenant best practices

-- 1. Allow authenticated users to create organizations
DO $$ BEGIN
  DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;
  CREATE POLICY "Authenticated users can create organizations"
    ON public.organizations FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = owner_id);
END $$;

-- 2. Allow authenticated users to update their own organizations (as owners)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Owners can update their organizations" ON public.organizations;
  CREATE POLICY "Owners can update their organizations"
    ON public.organizations FOR UPDATE
    TO authenticated
    USING (auth.uid() = owner_id);
END $$;

-- 3. Allow authenticated users to insert their own memberships
DO $$ BEGIN
  DROP POLICY IF EXISTS "Authenticated users can insert memberships" ON public.organization_members;
  CREATE POLICY "Authenticated users can insert memberships"
    ON public.organization_members FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);
END $$;
