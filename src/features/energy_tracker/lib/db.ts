import { dbRequest } from '@/lib/db';

export const pool = {
  query: async (t: string, p?: any[]) => {
    const rows = await dbRequest(t, p || []);
    return { rows };
  }
};

export const initSchema = async () => {
    console.log('Energy Tracker: initSchema skipped (browsersafe).');
};
