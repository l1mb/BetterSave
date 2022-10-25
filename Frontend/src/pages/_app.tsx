import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Layout from "./layout";

interface ExtSession extends Session {
  expires: string;
}

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: ExtSession;
}>) => (
  <Layout>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  </Layout>
);

export default MyApp;
