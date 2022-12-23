import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "src/service/auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          username: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes(
          "https://www.googleapis.com/auth/userinfo.email"
        )
      ) {
        return "/login?error=permissions";
      }
      return true;
    },
    async session({ session, user }) {
      return {
        ...session,
        user,
      };
    },
  },
};
export default NextAuth(authOptions);
