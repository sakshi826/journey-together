// Fail-safe Neon database client wrapper
import { neon as realNeon } from '../../node_modules/@neondatabase/serverless/index.mjs';

// Simple client-side LocalStorage DB Engine
function localStorageQuery(query: string, params: any[]): any[] {
  try {
    const normalizedQuery = query.replace(/\s+/g, ' ').trim();
    const upperQuery = normalizedQuery.toUpperCase();

    // 1. Handle CREATE TABLE / ALTER TABLE
    if (upperQuery.startsWith("CREATE TABLE") || upperQuery.startsWith("ALTER TABLE")) {
      return [];
    }

    // 2. Handle INSERT
    if (upperQuery.startsWith("INSERT INTO")) {
      // Extract table name: INSERT INTO table_name (col1, col2) VALUES ($1, $2)
      const insertMatch = normalizedQuery.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
      if (insertMatch) {
        const tableName = insertMatch[1].toLowerCase();
        const columns = insertMatch[2].split(',').map(c => c.trim().toLowerCase());
        
        const row: any = {
          id: crypto.randomUUID?.() || Math.random().toString(36).substring(2),
          created_at: new Date().toISOString()
        };

        columns.forEach((col, index) => {
          row[col] = params[index];
        });

        const storageKey = `db_table_${tableName}`;
        let existingData = JSON.parse(localStorage.getItem(storageKey) || "[]");
        
        let conflictIdx = -1;
        if (tableName === "users") {
          conflictIdx = existingData.findIndex((r: any) => String(r.id) === String(row.id));
        } else if (tableName === "selfcare_entries" || tableName === "energy_logs") {
          conflictIdx = existingData.findIndex((r: any) => String(r.user_id) === String(row.user_id) && String(r.date) === String(row.date));
        }

        if (conflictIdx !== -1) {
          existingData[conflictIdx] = { ...existingData[conflictIdx], ...row, id: existingData[conflictIdx].id };
          row.id = existingData[conflictIdx].id;
        } else {
          existingData.push(row);
        }
        
        localStorage.setItem(storageKey, JSON.stringify(existingData));
        return [row];
      }
    }

    // 3. Handle SELECT
    if (upperQuery.startsWith("SELECT")) {
      // Extract table name
      const selectMatch = normalizedQuery.match(/FROM\s+(\w+)/i);
      if (selectMatch) {
        const tableName = selectMatch[1].toLowerCase();
        const storageKey = `db_table_${tableName}`;
        let data = JSON.parse(localStorage.getItem(storageKey) || "[]");

        // Filter by user_id
        if (normalizedQuery.includes("user_id")) {
          const userParamMatch = normalizedQuery.match(/user_id\s*=\s*\$(\d+)/i);
          if (userParamMatch) {
            const paramIdx = parseInt(userParamMatch[1], 10) - 1;
            const targetUserId = params[paramIdx];
            if (targetUserId) {
              data = data.filter((row: any) => String(row.user_id) === String(targetUserId));
            }
          }
        }

        // Filter by id
        if (normalizedQuery.includes("id = $")) {
          const idParamMatch = normalizedQuery.match(/id\s*=\s*\$(\d+)/i);
          if (idParamMatch) {
            const paramIdx = parseInt(idParamMatch[1], 10) - 1;
            const targetId = params[paramIdx];
            if (targetId) {
              data = data.filter((row: any) => String(row.id) === String(targetId));
            }
          }
        }

        // Sort by created_at DESC / date DESC
        if (upperQuery.includes("ORDER BY")) {
          const orderByMatch = normalizedQuery.match(/ORDER\s+BY\s+(\w+)\s+(ASC|DESC)/i);
          if (orderByMatch) {
            const col = orderByMatch[1].toLowerCase();
            const desc = orderByMatch[2].toUpperCase() === "DESC";
            data.sort((a: any, b: any) => {
              const valA = a[col] || "";
              const valB = b[col] || "";
              if (valA < valB) return desc ? 1 : -1;
              if (valA > valB) return desc ? -1 : 1;
              return 0;
            });
          }
        }

        // Limit results
        if (upperQuery.includes("LIMIT")) {
          const limitMatch = normalizedQuery.match(/LIMIT\s+(\d+)/i);
          if (limitMatch) {
            const limitVal = parseInt(limitMatch[1], 10);
            data = data.slice(0, limitVal);
          }
        }

        return data;
      }
    }

    // 4. Handle DELETE
    if (upperQuery.startsWith("DELETE")) {
      const deleteMatch = normalizedQuery.match(/DELETE\s+FROM\s+(\w+)/i);
      if (deleteMatch) {
        const tableName = deleteMatch[1].toLowerCase();
        const storageKey = `db_table_${tableName}`;
        let data = JSON.parse(localStorage.getItem(storageKey) || "[]");

        if (normalizedQuery.includes("id = $")) {
          const idParamMatch = normalizedQuery.match(/id\s*=\s*\$(\d+)/i);
          if (idParamMatch) {
            const paramIdx = parseInt(idParamMatch[1], 10) - 1;
            const targetId = params[paramIdx];
            if (targetId) {
              data = data.filter((row: any) => String(row.id) !== String(targetId));
            }
          }
        }

        localStorage.setItem(storageKey, JSON.stringify(data));
        return [];
      }
    }
  } catch (error) {
    console.error("Local storage DB emulation failed:", error);
  }
  return [];
}

export function neon(connectionString: string, options?: any): any {
  if (!connectionString) {
    console.warn("Neon connection string missing, using fail-safe LocalStorage fallback.");
    return function mockQuery(strings: any, ...values: any[]) {
      let queryString = "";
      let params: any[] = [];
      if (typeof strings === "string") {
        queryString = strings;
        params = values[0] || [];
      } else if (Array.isArray(strings)) {
        params = values;
        for (let i = 0; i < strings.length; i++) {
          queryString += strings[i];
          if (i < values.length) {
            queryString += `$${i + 1}`;
          }
        }
      }
      return Promise.resolve(localStorageQuery(queryString, params));
    };
  }

  // Real client wrapped in a try-catch proxy
  try {
    const realClient = realNeon(connectionString, options);
    return async function wrappedQuery(strings: any, ...values: any[]) {
      let queryString = "";
      let params: any[] = [];
      if (typeof strings === "string") {
        queryString = strings;
        params = values[0] || [];
      } else if (Array.isArray(strings)) {
        params = values;
        for (let i = 0; i < strings.length; i++) {
          queryString += strings[i];
          if (i < values.length) {
            queryString += `$${i + 1}`;
          }
        }
      }

      try {
        const result = await realClient(strings, ...values);
        return Array.isArray(result) ? result : (result.rows || []);
      } catch (dbError) {
        console.error("Real DB failed, transparently falling back to LocalStorage:", dbError);
        return localStorageQuery(queryString, params);
      }
    };
  } catch (initError) {
    console.error("Failed to initialize real Neon database client:", initError);
    return function fallbackQuery(strings: any, ...values: any[]) {
      let queryString = "";
      let params: any[] = [];
      if (typeof strings === "string") {
        queryString = strings;
        params = values[0] || [];
      } else if (Array.isArray(strings)) {
        params = values;
        for (let i = 0; i < strings.length; i++) {
          queryString += strings[i];
          if (i < values.length) {
            queryString += `$${i + 1}`;
          }
        }
      }
      return Promise.resolve(localStorageQuery(queryString, params));
    };
  }
}

export default neon;
