import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { credentialsOptions } from "./credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      // If the user registers an account already and tries to login with Google,
      // it will fail unless this is set to true
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider(credentialsOptions),
  ],
  callbacks: {
    jwt({ token, user }) {
      // Pass mongoDB user.role to the token
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      // Pass JWT information to sessions for client and server components
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.sub
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // Override default UI paths
    signIn: "/login",
    error: "/authError"
  }
}
