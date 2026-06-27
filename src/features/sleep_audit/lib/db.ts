import { dbRequest } from "@/lib/db";

export const initializeSleepTable = async () => {
  try {
    await dbRequest(`
      CREATE TABLE IF NOT EXISTS sleep_audit_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        audit_data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (e) {
    console.error("Failed to initialize sleep table:", e);
  }
};

export const fetchSleepHistory = async (userId: string) => {
  try {
    const rows = await dbRequest(
      'SELECT id, audit_data, created_at FROM sleep_audit_entries WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
      [userId]
    );
    return rows || [];
  } catch (e) {
    console.error("Fetch sleep history error:", e);
    return [];
  }
};

export const saveSleepAudit = async (userId: string, auditData: any) => {
  await dbRequest(
    'INSERT INTO sleep_audit_entries (user_id, audit_data) VALUES ($1, $2)',
    [userId, JSON.stringify(auditData)]
  );
};
