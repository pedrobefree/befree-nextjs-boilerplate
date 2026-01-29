"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { withErrorHandling } from "@/lib/supabase/errors";

/**
 * Interface for Profile Updates
 */
export interface ProfileUpdateParams {
    full_name?: string;
    avatar_url?: string;
}

/**
 * Fetches the current user's profile from the database.
 * Uses the authenticated session to identify the user.
 * 
 * @returns {Promise<ApiResponse<any>>}
 */
export async function getMyProfile() {
    return withErrorHandling(async () => {
        const supabase = await createClient();

        // Get user from session (Security: never accept user_id from client)
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) throw new Error("Unauthorized");

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error) throw error;
        return data;
    }, { action: "getMyProfile" });
}

/**
 * Updates the current user's profile.
 * Validates inputs and uses RLS to ensure security.
 * 
 * @param {ProfileUpdateParams} updates - The fields to update.
 * @returns {Promise<ApiResponse<any>>}
 */
export async function updateMyProfile(updates: ProfileUpdateParams) {
    return withErrorHandling(async () => {
        const supabase = await createClient();

        // 1. Auth Validation
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("Unauthorized");

        // 2. Input Validation (Fail Fast)
        if (updates.full_name && updates.full_name.trim().length < 2) {
            throw new Error("Full name must be at least 2 characters.");
        }

        // 3. Database Update
        const { data, error } = await supabase
            .from("profiles")
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id)
            .select()
            .single();

        if (error) throw error;

        // 4. Cache Revalidation
        revalidatePath("/dashboard/settings");
        revalidatePath("/dashboard/profile");

        return data;
    }, { action: "updateMyProfile", updates });
}
