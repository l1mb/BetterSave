import store from "@/store/store";
import { Provider } from "react-redux";
import AppRouter from "./appRouter";

import "rsuite/dist/rsuite.min.css";

function AppRoot() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default AppRoot;
