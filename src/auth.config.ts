//https://authjs.dev/reference/nextjs  - DOC
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    jwt({ token, user }) {
      //el {user} viene del authorize que viene siendo el  "rest"
      // console.log({ token, user });
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    // OAuth authentication providers
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // console.log("Auth Config.ts", { email, password });

        //Buscar el correo
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        // console.log("Encontro el user", { user });

        if (!user) return null;

        //Verificar la contraseña
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // console.log("paso el Bcrypt validation", { user });

        // Regresar el usuario sin el passwod
        const { password: _, ...rest } = user;
        // console.log("paso el validation con password", { rest });

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
