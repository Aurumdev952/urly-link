import { links, users } from "./schema"
import { db } from "./db"
import { InferModel, eq } from "drizzle-orm"
export const getUserSession = async (user: InferModel<typeof users, "insert">) => {
    const check = await db.select().from(users).where(eq(users.email, user.email))
    if (check.length > 0) return check
    return await db.insert(users).values(user).returning()
}

export const getUsers = async () => {
    return await db.select().from(users)
}

export const getLinkData = async (user_id: number) => {
    return await db.select().from(links).where(eq(links.user_id, user_id))
}