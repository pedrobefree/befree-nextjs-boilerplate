/**
 * Validates required environment variables on startup.
 * Throws an error if any required variable is missing or invalid.
 */
export function validateEnvironment() {
    const reqVars = [
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "SUPABASE_SERVICE_ROLE_KEY",
        "ENCRYPTION_KEY",
    ];

    const missing = reqVars.filter((v) => !process.env[v]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}\n` +
            "Please check your .env.local file. Refer to .env.local.example for details."
        );
    }

    // Validate ENCRYPTION_KEY format (base64 and length)
    const encryptionKey = process.env.ENCRYPTION_KEY!;
    try {
        const buffer = Buffer.from(encryptionKey, "base64");
        if (buffer.length !== 32) {
            throw new Error("ENCRYPTION_KEY must be exactly 32 bytes when base64 decoded.");
        }
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Invalid format";
        throw new Error(
            `ENCRYPTION_KEY validation failed: ${msg}\n` +
            "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\""
        );
    }

    // Validate Supabase URL format
    try {
        new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
    } catch {
        throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a valid URL.");
    }

    console.log("✅ Environment configuration validated successfully.");
}

// In Next.js App Router, we can trigger this check at the module level
// or within the root layout/middleware.
if (process.env.NODE_ENV !== "test" && typeof window === "undefined") {
    // Only run on server-side during initialization
    validateEnvironment();
}
