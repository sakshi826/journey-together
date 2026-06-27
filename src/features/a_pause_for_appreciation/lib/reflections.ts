// @ts-nocheck
import { dbRequest } from '@/lib/db';

export interface ReflectionEntry {
  id: string;
  timestamp: string;
  responses: string[];
  intention: string;
  checkIn: string;
}

export async function getReflections(): Promise<ReflectionEntry[]> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return [];

  try {
    const rows = await dbRequest(
      `SELECT id, entry_data, created_at 
       FROM guided_series_logs 
       WHERE user_id = $1 AND activity_name = 'a_pause_for_appreciation' 
       ORDER BY created_at DESC`,
      [userId]
    );
    if (!rows || !Array.isArray(rows)) return [];
    return rows.map(r => {
      const data = r.entry_data as any;
      return {
        id: r.id || data.id,
        timestamp: r.created_at || data.timestamp,
        responses: data.responses,
        intention: data.intention,
        checkIn: data.checkIn,
      };
    });
  } catch (err) {
    console.error('Failed to get reflections:', err);
    return [];
  }
}

export async function saveReflection(entry: ReflectionEntry): Promise<void> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) throw new Error("User not authenticated");

  try {
    await dbRequest(
      `INSERT INTO guided_series_logs (user_id, concern, activity_name, entry_data)
       VALUES ($1, 'appreciation_habit', 'a_pause_for_appreciation', $2)`,
      [userId, JSON.stringify(entry)]
    );
  } catch (err) {
    console.error('Failed to save reflection:', err);
    throw err;
  }
}

export async function deleteReflection(id: string): Promise<void> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return;

  try {
    await dbRequest(
      `DELETE FROM guided_series_logs WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
  } catch (err) {
    console.error('Failed to delete reflection:', err);
    throw err;
  }
}
