import { links, users } from "./schema";
import { db } from "./db";
import { InferModel, eq } from "drizzle-orm";
export const getUserSession = async (
  user: InferModel<typeof users, "insert">
) => {
  const check = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));
  if (check.length > 0) return check;
  return await db.insert(users).values(user).returning();
};

export const getUsers = async () => {
  return await db.select().from(users);
};

export const getLinkData = async (user_id: number) => {
  return await db.select().from(links).where(eq(links.user_id, user_id));
};
export const getUrl = async (uid: string) => {
  return await db
    .select({ url: links.url })
    .from(links)
    .where(eq(links.uid, uid));
};

export const createLink = async (link: InferModel<typeof links, "insert">) => {
  return await db.insert(links).values(link).returning();
};

export const updateLink = async (link: InferModel<typeof links, "insert">) => {
  return await db.update(links).set(link).returning();
};

export const deleteLink = async (id: number) => {
  return await db.delete(links).where(eq(links.id, id)).returning();
};
