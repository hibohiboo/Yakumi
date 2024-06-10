import { NeonQueryFunction, neon } from '@neondatabase/serverless';

let sql: NeonQueryFunction<false, false> | null = null;
const getClient = () => {
  if (sql) return sql;
  if (!process.env.DATABASE_URL) {
    throw new Error('environment variable:DATABASE_URL is not defined');
  }
  sql = neon(process.env.DATABASE_URL);
  return sql;
};

export const execQuery = async (query: string) => {
  const client = getClient();
  const result = await client(query);
  return result;
};
