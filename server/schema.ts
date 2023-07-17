import { integer, pgTable, serial, varchar, unique } from "drizzle-orm/pg-core";
import { InferModel} from "drizzle-orm"
import { type } from "os";
export const users = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: varchar("email").notNull(),
    username: varchar("username"),
    image: varchar("image"),
  },
  (users) => ({
    uniqueEmail: unique().on(users.email),
  })
);

export const links = pgTable("link", {
  id: serial("id").primaryKey(),
  alias: varchar("alias"),
  url: varchar("url").notNull(),
  uid: varchar("uid").notNull(),
  user_id: integer("user_id").references(() => users.id),
});

export type linkType = InferModel<typeof links, "select">
export type linkCreateType = InferModel<typeof links, "insert">
