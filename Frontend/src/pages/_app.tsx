import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Layout from "./layout";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => (
  <Layout>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  </Layout>
);

export default MyApp;
