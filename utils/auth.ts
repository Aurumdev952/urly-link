import { env } from "@/env.mjs";
import { getUserSession } from "@/server/controllers";
import NextAuth, { getServerSession } from "next-auth";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      const check = await getUserSession({
        email: session.user?.email ?? "",
        image: session.user?.image ?? "",
        username: session.user?.name ?? "",
      });

      return {
        expires: session.expires,
        user: {
          ...session.user,
          id: check[0].id,
        },
      };
    },
  },
};

export async function getServerSideSession() {
  return await getServerSession(authOptions);
}
