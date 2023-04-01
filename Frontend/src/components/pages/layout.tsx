import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sidebarIcon from "images/icons/sidebarIcon.svg";
import { useNavigate } from "react-router-dom";
import { AuthState } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import getUserInfoThunk from "@/store/thunks/user/userThunks";
import Sidebar from "../../elements/sidebar";
import fullHeightLinks from "../../utils/links/fullHeightLinks";
import useKeyDown from "../../hooks/useKeyDown";
import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const fullHeightLayout = fullHeightLinks.filter((path) => window.location.pathname.includes(path)).length > 0;
  const [isOpened, setIsOpened] = useState(false);
  const authState = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const onTokenInvalid = () => {
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUserInfoThunk({ onTokenInvalid }));
  }, []);

  useKeyDown(
    (e) => {
      if (
        e.key &&
        e.key.toLowerCase() === "s" &&
        !fullHeightLayout &&
        authState.authStatus === "authenticated" &&
        !(e.target instanceof HTMLInputElement)
      ) {
        setIsOpened((prevState) => !prevState);
      }
    },
    [window.location.pathname, authState.authStatus]
  );

  useEffect(() => {
    if (authState.authStatus === "notauthenticated") {
      setIsOpened(false);
    }
  }, [authState.authStatus]);

  return (
    <>
      {authState.authStatus === "notauthenticated" && <Navbar />}
      <div className="flex w-full">
        <Sidebar isOpened={isOpened} />

        <div className="relative w-full flex-auto">
          {children}
          {isOpened === false && authState.authStatus === "authenticated" && !fullHeightLayout && (
            <button
              className="fixed  bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition-all hover:rotate-90  hover:bg-violet-500 "
              type="button"
              onClick={() => setIsOpened((prevState) => !prevState)}
            >
              <img src={sidebarIcon} alt="Toggle sidebar" />
            </button>
          )}
        </div>
      </div>
      {fullHeightLayout && authState.authStatus === "notauthenticated" && <Footer />}
    </>
  );
}

export default Layout;
