import { dbRequest } from '@/lib/db';

export const pool = {
  query: async (t: string, p?: any[]) => {
    const rows = await dbRequest(t, p || []);
    return { rows, rowCount: rows.length };
  }
};

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log("executed query", { text, duration, rows: res.rowCount });
        return res;
    } catch (err) {
        console.error("query error", err);
        throw err;
    }
};
