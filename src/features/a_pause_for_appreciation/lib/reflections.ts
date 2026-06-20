// @ts-nocheck
import { sql } from '@/lib/db';

export interface ReflectionEntry {
  id: string;
  timestamp: string;
  responses: string[];
  intention: string;
  checkIn: string;
}

export async function getReflections(): Promise<ReflectionEntry[]> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId || !sql) return [];

  try {
    const rows = await sql`
      SELECT id, entry_data, created_at 
      FROM guided_series_logs 
      WHERE user_id = ${userId} AND activity_name = 'a_pause_for_appreciation' 
      ORDER BY created_at DESC
    `;
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
  if (!sql) throw new Error("Database not connected");

  try {
    await sql`
      INSERT INTO guided_series_logs (user_id, concern, activity_name, entry_data)
      VALUES (${userId}, 'appreciation_habit', 'a_pause_for_appreciation', ${JSON.stringify(entry)})
    `;
  } catch (err) {
    console.error('Failed to save reflection:', err);
    throw err;
  }
}

export async function deleteReflection(id: string): Promise<void> {
  const userId = sessionStorage.getItem("user_id");
  if (!userId || !sql) return;

  try {
    await sql`
      DELETE FROM guided_series_logs 
      WHERE id = ${id} AND user_id = ${userId}
    `;
  } catch (err) {
    console.error('Failed to delete reflection:', err);
    throw err;
  }
}
