import crypto from "crypto";

/**
 * Encryption Service
 * Uses AES-256-GCM to encrypt/decrypt sensitive data.
 * The encryption key must be a 32-byte base64 encoded string.
 */
class EncryptionService {
    private readonly algorithm = "aes-256-gcm";
    private readonly keyLength = 32;

    /**
     * Get the encryption key from environment variables.
     * Internal method only.
     */
    private getKey(): Buffer {
        const key = process.env.ENCRYPTION_KEY;
        if (!key) {
            throw new Error("ENCRYPTION_KEY environment variable is not set.");
        }
        return Buffer.from(key, "base64");
    }

    /**
     * Encrypt a plaintext string.
     * @param {string} plaintext - The data to encrypt.
     * @returns {string} - Combined string of IV:AuthTag:EncryptedContent (all base64).
     */
    encrypt(plaintext: string): string {
        const key = this.getKey();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);

        let encrypted = cipher.update(plaintext, "utf8", "base64");
        encrypted += cipher.final("base64");

        const authTag = cipher.getAuthTag().toString("base64");

        // Format: IV:AuthTag:EncryptedContent
        return `${iv.toString("base64")}:${authTag}:${encrypted}`;
    }

    /**
     * Decrypt a ciphertext string.
     * @param {string} ciphertext - Data in the format IV:AuthTag:EncryptedContent.
     * @returns {string} - The original plaintext.
     */
    decrypt(ciphertext: string): string {
        const key = this.getKey();
        const [ivBase64, authTagBase64, encrypted] = ciphertext.split(":");

        if (!ivBase64 || !authTagBase64 || !encrypted) {
            throw new Error("Invalid encrypted format. Expected IV:AuthTag:Content.");
        }

        const iv = Buffer.from(ivBase64, "base64");
        const authTag = Buffer.from(authTagBase64, "base64");
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);

        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encrypted, "base64", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted;
    }
}

// Export a singleton instance.
export const encryption = new EncryptionService();
