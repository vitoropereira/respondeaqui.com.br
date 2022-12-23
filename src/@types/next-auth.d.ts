import NextAuth from "next-auth";

declare module "next-auth" {
  export interface User {
    id: string;
    username: string;
    email: string;
    features?: string[];
    avatar_url?: string;
  }

  export interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      features?: string[];
      avatar_url?: string;
    };
  }
}
