import { Adapter } from "next-auth/adapters";
import prisma from "../prisma";

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {
      const prismaUser = await prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          avatar_url: user.avatar_url,
          features: ["create:user", "create:content"],
        },
      });

      return {
        id: prismaUser.id,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        features: prismaUser.features!,
        emailVerified: null,
      };
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        features: user.features!,
        emailVerified: null,
      };
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        features: user.features!,
        emailVerified: null,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      });

      if (!account) {
        return null;
      }

      const { user } = account;

      return {
        id: user.id,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        features: user.features!,
        emailVerified: null,
      };
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      return {
        id: prismaUser.id,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        features: prismaUser.features!,
        emailVerified: null,
      };
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      });

      return {
        userId,
        sessionToken,
        expires,
      };
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

      if (!prismaSession) {
        return null;
      }

      const { user, ...session } = prismaSession;

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          username: user.username,
          email: user.email!,
          avatar_url: user.avatar_url!,
          features: user.features!,
          emailVerified: null,
        },
      };
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      });

      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      });
    },
  };
}
