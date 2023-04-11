import store from "@/store/store";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import AppRouter from "./appRouter";

import "rsuite/dist/rsuite.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

function AppRoot() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
}

export default AppRoot;
