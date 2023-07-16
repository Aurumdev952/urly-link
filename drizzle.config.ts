import type { Config } from "drizzle-kit";
export default {
  schema: "server/schema.ts",
  driver: "pg",
  out: "drizzle",
  dbCredentials: {
    //@ts-ignore
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
