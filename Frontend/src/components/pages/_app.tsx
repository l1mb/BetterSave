import "../../styles/globals.scss";
import { Provider } from "react-redux";

import Layout from "./layout";
import store from "../../store/store";
import "rsuite/dist/rsuite.min.css";
import "../../styles/overrides.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
