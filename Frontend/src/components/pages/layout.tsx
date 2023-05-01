import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sidebarIcon from "images/icons/sidebarIcon.svg";
import { useNavigate } from "react-router-dom";
import { AppState, logout, setHamburgerState } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import getUserInfoThunk from "@/store/thunks/user/userThunks";
import LinkElement from "@/elements/linkElements/linkElement";
import sidebarLinks from "@/utils/links/sidebar";
import useWindowSize from "@/hooks/useWindowSizeHook";
import { Button } from "rsuite";
import Sidebar from "../../elements/sidebar";
import fullHeightLinks from "../../utils/links/fullHeightLinks";
import useKeyDown from "../../hooks/useKeyDown";
import Navbar from "./navbar";

interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const fullHeightLayout = fullHeightLinks.filter((path) => window.location.pathname.includes(path)).length > 0;
  const [isOpened, setIsOpened] = useState(false);
  const appState = useSelector<RootState, AppState>((state) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const itemHeight = 30;

  const onTokenInvalid = () => {
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUserInfoThunk({ onTokenInvalid }));
  }, []);

  const handleNavigate = () => {
    dispatch(setHamburgerState());
  };

  useKeyDown(
    (e) => {
      if (
        !isMobile &&
        e.key &&
        e.key.toLowerCase() === "s" &&
        !fullHeightLayout &&
        appState.authStatus === "authenticated" &&
        !(e.target instanceof HTMLInputElement)
      ) {
        setIsOpened((prevState) => !prevState);
      }
    },
    [window.location.pathname, appState.authStatus]
  );

  useEffect(() => {
    if (appState.authStatus === "notauthenticated") {
      setIsOpened(false);
    }
  }, [appState.authStatus]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {(appState.authStatus === "notauthenticated" || isMobile) && <Navbar />}
      <div
        className={` bg-indigo-50 ${
          // eslint-disable-next-line no-nested-ternary
          appState.isHamburgerMenuOpen
            ? appState.authStatus === "notauthenticated"
              ? "h-[60px]"
              : "h-[250px]"
            : "h-0 "
        } left-0 z-10 max-h-max w-full overflow-hidden bg-blend-saturation transition-all`}
      >
        {appState.authStatus === "notauthenticated" ? (
          <div className="flex flex-col items-end gap-2 p-1 pr-5 ">
            <LinkElement link="/login" label="Войти" className="text-indigo-600" />
            <LinkElement link="/register" label="Зарегистрироваться" className="text-indigo-600" />
          </div>
        ) : (
          <div className="flex flex-col items-end gap-2 p-1 pr-5 ">
            {sidebarLinks.map((x) => (
              <LinkElement link={x.link} label={x.label} className=" text-indigo-600" />
            ))}
            <LinkElement link="/" label="Домой" className="text-indigo-600" />
            <LinkElement link="/settings" label="Настройки" className="text-indigo-600" />
            <Button style={{ padding: " 4px 16px" }} appearance="subtle" onClick={handleLogout}>
              Выход
            </Button>
          </div>
        )}
      </div>

      <div className="flex w-full">
        <Sidebar isOpened={isOpened} />

        <div className="relative w-full flex-auto">
          {children}
          {!isMobile && isOpened === false && appState.authStatus === "authenticated" && !fullHeightLayout && (
            <button
              className="fixed  bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition-all hover:rotate-90  hover:bg-indigo-500 "
              type="button"
              onClick={() => setIsOpened((prevState) => !prevState)}
            >
              <img src={sidebarIcon} alt="Toggle sidebar" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Layout;
