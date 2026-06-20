// @ts-nocheck
import { dbRequest } from '@/lib/db';

/**
 * Executes a parameterized query against Neon.
 */
export async function query<T = any>(queryString: string, params: any[] = []): Promise<T[]> {
    try {
        return await dbRequest<T>(queryString, params);
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
}
