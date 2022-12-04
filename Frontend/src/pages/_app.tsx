import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Layout from "./layout";
import store from "../store/store";
import "rsuite/dist/rsuite.min.css";
import "../styles/overrides.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
