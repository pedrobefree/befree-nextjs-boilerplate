/**
 * Standard API response format.
 */
export type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string; code?: string };

/**
 * Maps Supabase Postgres error codes to user-friendly messages.
 * Logs technical details for server-side debugging.
 * 
 * @param {any} error - The error object from Supabase.
 * @param {Record<string, any>} [context] - Optional metadata for logging.
 * @returns {string} - A sanitized error message for the user.
 */
export function handleSupabaseError(
    error: any,
    context?: Record<string, any>
): string {
    // Log technical details with context
    console.error("Supabase Error Caught:", {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        context,
        timestamp: new Date().toISOString(),
    });

    const errorCode = error?.code;

    switch (errorCode) {
        case "23505": // unique_violation
            return "This record already exists.";
        case "23503": // foreign_key_violation
            return "The referenced information could not be found.";
        case "42501": // insufficient_privilege
            return "You do not have permission to perform this action.";
        case "PGRST116": // no rows returned
            return "The requested record was not found.";
        case "23502": // not_null_violation
            return "Required field is missing.";
        default:
            return error?.message || "An unexpected error occurred. Please try again.";
    }
}

/**
 * Higher-order function to wrap database operations with standard error handling.
 * 
 * @param {Function} operation - The async operation to wrap.
 * @param {Record<string, any>} [context] - Optional metadata for logging.
 * @returns {Promise<ApiResponse<T>>}
 */
export async function withErrorHandling<T>(
    operation: () => Promise<T>,
    context?: Record<string, any>
): Promise<ApiResponse<T>> {
    try {
        const data = await operation();
        return { success: true, data };
    } catch (error) {
        const message = handleSupabaseError(error, context);
        return { success: false, error: message };
    }
}
