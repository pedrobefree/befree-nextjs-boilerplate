"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { withErrorHandling } from "@/lib/supabase/errors";

/**
 * Creates a new organization and adds the creator as the 'owner'.
 * 
 * @param {string} name - Name of the organization.
 * @param {string} slug - Unique URL-friendly identifier.
 * @returns {Promise<ApiResponse<any>>}
 */
export async function createOrganization(name: string, slug: string) {
    return withErrorHandling(async () => {
        const supabase = await createClient();

        // Auth Validation
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("Unauthorized");

        // Input Validation
        if (!name.trim() || !slug.trim()) throw new Error("Name and slug are required.");

        // 1. Create the organization row
        // Note: RLS will allow this if the user is authenticated.
        const { data: org, error: orgError } = await supabase
            .from("organizations")
            .insert({
                name,
                slug: slug.toLowerCase(),
                owner_id: user.id
            })
            .select()
            .single();

        if (orgError) throw orgError;

        // 2. Add the user as the 'owner' in the membership table
        const { error: memberError } = await supabase
            .from("organization_members")
            .insert({
                organization_id: org.id,
                user_id: user.id,
                role: "owner"
            });

        if (memberError) {
            // Manual cleanup (since we don't have true transactions across tables easily in Supabase JS without RPC)
            await supabase.from("organizations").delete().eq("id", org.id);
            throw memberError;
        }

        revalidatePath("/dashboard/organizations");
        return org;
    }, { action: "createOrganization", name });
}

/**
 * Fetches all organizations the current user is a member of.
 * RLS handles the filtering automatically.
 */
export async function getMyOrganizations() {
    return withErrorHandling(async () => {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("organizations")
            .select(`
        *,
        organization_members!inner(role)
      `);

        if (error) throw error;
        return data;
    }, { action: "getMyOrganizations" });
}

/**
 * Creates a project within a specific organization.
 * Validates that the user has access to that organization.
 * 
 * @param {string} organizationId
 * @param {string} name
 */
export async function createProject(organizationId: string, name: string) {
    return withErrorHandling(async () => {
        const supabase = await createClient();

        // Auth Check
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Unauthorized");

        // Insert Project
        // RLS will fail this if the user is not a member of the organizationId.
        const { data, error } = await supabase
            .from("projects")
            .insert({
                organization_id: organizationId,
                name,
                created_by: user.id
            })
            .select()
            .single();

        if (error) throw error;

        revalidatePath(`/dashboard/org/${organizationId}`);
        return data;
    }, { action: "createProject", organizationId, name });
}
