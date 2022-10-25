/* eslint-disable require-await */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // CredentialsProvider({
    //   name: "...",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "text",
    //       placeholder: "email@provider.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     try {
    //       const { data } = await axios.post(
    //         "https://localhost:1337/authurl",
    //         credentials
    //       );
    //       if (data) {
    //         console.log("data: ", data);
    //         return data;
    //       }
    //       return null;
    //     } catch (e) {
    //       return null;
    //     }
    //   },
    // }),
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
  // callbacks: {
  //   jwt: async (params: {
  //     token: JWT;
  //     user?: User | undefined;
  //     account?: Account | null | undefined;
  //     profile?: Profile | undefined;
  //     isNewUser?: boolean | undefined;
  //   }): Promise<JWT> => {
  //     console.log("### JWT CALLBACK ###");
  //     console.log("token: ", params.token);
  //     console.log("account: ", params.user);
  //     const t = new Promise<JWT>(() => {
  //       console.log();
  //     });
  //     const q: JWT = params.token;
  //     return q;
  //   },

  //   session: async (params: {
  //     session: Session;
  //     user: User;
  //     token: JWT;
  //   }): Promise<Session> => {
  //     console.log("### SESSION CALLBACK ###");
  //     console.log("session: ", params.session);
  //     console.log("user: ", params.token);
  //     console.log("user: ", params.user);

  //     return params.session;
  //   },
  // },
});
