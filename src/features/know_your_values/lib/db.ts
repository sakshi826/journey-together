import { dbRequest } from '@/lib/db';

export const pool = {
  query: async (t: string, p?: any[]) => {
    const rows = await dbRequest(t, p || []);
    return { rows };
  }
};

export const dbQuery = async (text: string, params?: any[]) => {
    console.log("SQL Exec:", text, params);
    try {
        const res = await pool.query(text, params || []);
        return res;
    } catch (error) {
        console.error("SQL Error:", error);
        throw error;
    }
};

export const query = dbQuery;
