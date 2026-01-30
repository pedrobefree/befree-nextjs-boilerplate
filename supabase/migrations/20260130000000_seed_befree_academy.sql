-- Migration: Seed Befree Academy and Auto-Join
-- Date: 2026-01-30

-- 1. Ensure "Befree Academy" organization exists
DO $$
DECLARE
  org_id UUID;
BEGIN
  -- Create the organization if it doesn't exist
  INSERT INTO public.organizations (name, slug)
  VALUES ('Befree Academy', 'befree-academy')
  ON CONFLICT (slug) DO NOTHING;

  -- Get the ID (whether newly created or existing)
  SELECT id INTO org_id FROM public.organizations WHERE slug = 'befree-academy';

  -- 2. Add ALL existing users to this organization as 'member'
  -- We select from auth.users (Supabase managed table)
  INSERT INTO public.organization_members (organization_id, user_id, role)
  SELECT org_id, id, 'member'
  FROM auth.users
  ON CONFLICT (organization_id, user_id) DO NOTHING;
END $$;

-- 3. Update the handle_new_user function trigger
-- This ensures ANY future user is automatically added to Befree Academy
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  org_id UUID;
BEGIN
  -- 1. Create the user profile (Standard logic from previous migration)
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  -- 2. Get Befree Academy ID
  SELECT id INTO org_id FROM public.organizations WHERE slug = 'befree-academy';

  -- 3. Add to Organization
  -- We check for NULL just in case the org was deleted or doesn't exist (though it should)
  IF org_id IS NOT NULL THEN
    INSERT INTO public.organization_members (organization_id, user_id, role)
    VALUES (org_id, new.id, 'member');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
