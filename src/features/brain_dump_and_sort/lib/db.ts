import { dbRequest, sql } from '@/lib/db';

export const query = async (t: string, p?: any[]) => {
  const rows = await dbRequest(t, p || []);
  return { rows, rowCount: rows.length };
};

export { sql };

export const dbQuery = async (text: string, params?: any[]) => {
  return await dbRequest(text, params || []);
};
