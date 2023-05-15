import store from "@/store/store";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import AppRouter from "./appRouter";

import "rsuite/dist/rsuite.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { CustomProvider } from "rsuite";
import { ruRU } from "rsuite/esm/locales";

function AppRoot() {
  return (
    <CustomProvider locale={ruRU}>
      <Provider store={store}>
        <AppRouter />
        <ToastContainer />
      </Provider>
    </CustomProvider>
  );
}

export default AppRoot;
