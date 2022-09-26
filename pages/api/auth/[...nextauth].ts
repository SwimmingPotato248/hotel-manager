import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import * as argon2 from "argon2";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials?.username,
            },
          });
          if (!user) return null;
          const pwMatch = await argon2.verify(
            user.password,
            credentials?.password
          );
          if (!pwMatch) return null;
          return { name: user.username };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
