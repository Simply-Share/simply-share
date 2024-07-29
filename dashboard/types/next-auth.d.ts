import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    name?: string;
    email?: string;
    accessToken?: string;
    image?: string;
  }

  interface Session {
    user: {
        accessToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    email?: string;
    accessToken?: string;
    image?: string;
  }
}