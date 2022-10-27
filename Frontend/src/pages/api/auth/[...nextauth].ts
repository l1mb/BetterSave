/* eslint-disable require-await */
import NextAuth, { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "...",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@provider.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          console.log(1);
          console.clear();
          const res = await fetch("https://localhost:44317/api/auth/sign-in", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const user = await res.json();

          if (!res.ok) {
            throw new Error(user.exception);
          }
          // If no error and we have user data, return it
          if (res.ok && user) {
            return user.user;
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // secret: "C++gvR/H9sV3JC/v2/zPpT6das8kREhBdVMRpG3L3QM=",
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  //   // encryption: true,
  // },
  callbacks: {
    jwt: async (params: {
      token: JWT;
      user?: User | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }): Promise<JWT> => {
      console.log("### JWT CALLBACK ###");
      console.log("token: ", params.token);
      console.log("account: ", params.user);
      const t = new Promise<JWT>(() => {
        console.log();
      });
      const q: JWT = params.token;
      return q;
    },

    session: async (params: {
      session: Session;
      user: User;
      token: JWT;
    }): Promise<Session> => {
      console.log("### SESSION CALLBACK ###");
      console.log("session: ", params.session);
      console.log("user: ", params.token);
      console.log("user: ", params.user);
      return params.session;
    },

    signIn: async (params: {
      user: User;
      account: Account | null;
      profile?: Profile | undefined;
      email?: { verificationRequest?: boolean | undefined } | undefined;
      credentials?: unknown;
    }) => {
      console.clear();
      console.log("sign in");
      console.log(params);
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});
