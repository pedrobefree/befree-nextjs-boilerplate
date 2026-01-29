import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Client Components (browser-side only).
 * Shared across the client-side session to ensure single instance per page load.
 * 
 * @returns {ReturnType<typeof createBrowserClient>}
 */
export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
