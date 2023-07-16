import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { env } from "../env.mjs";

const client = postgres(env.DATABASE_URL);
const globalForDb = globalThis as unknown as { db: PostgresJsDatabase };
// const db = drizzle(client)
export const db = globalForDb.db || drizzle(client);
// migrate(db, { migrationsFolder: "drizzle" });

if (env.NODE_ENV !== "production") globalForDb.db = db;
