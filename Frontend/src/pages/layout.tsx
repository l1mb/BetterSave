import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useSelector } from "react-redux";
import Sidebar from "../elements/sidebar";
import fullHeightLinks from "../utils/links/fullHeightLinks";
import useKeyDown from "../hooks/useKeyDown";
import Navbar from "./navbar";
import Footer from "./footer";

import sidebarIcon from "../../public/icons/sidebarIcon.svg";
import { RootState } from "../store/store";
import { AuthState } from "../store/slices/authSlice";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const fullHeightLayout =
    fullHeightLinks.filter((path) => router.pathname.includes(path)).length > 0;
  const [isOpened, setIsOpened] = useState(!router.pathname.includes("/login"));
  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  useKeyDown(
    (e) => {
      if (
        e.key === "s" &&
        !fullHeightLayout &&
        authState.authStatus === "authenticated"
      ) {
        console.log("yas");
        console.log(authState);
        setIsOpened((prevState) => !prevState);
      }
    },
    [router.pathname, authState.authStatus]
  );

  useEffect(() => {
    if (authState.authStatus === "notauthenticated") {
      setIsOpened(false);
    }
  }, [authState.authStatus]);

  return (
    <>
      <Head>
        <title>Better save</title>
        <meta name="description" content="Save money for great goals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authState.authStatus === "notauthenticated" && <Navbar />}
      <div className="flex w-full">
        <Sidebar isOpened={isOpened} />

        <div className="relative w-full flex-auto">
          {children}
          {isOpened === false && !fullHeightLayout && (
            <button
              className="fixed  bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-blueberry-200 transition-all hover:rotate-90  hover:bg-blueberry-500 "
              type="button"
              onClick={() => setIsOpened((prevState) => !prevState)}
            >
              <Image src={sidebarIcon} alt="Toggle sidebar" />
            </button>
          )}
        </div>
      </div>
      {fullHeightLayout && authState.authStatus === "notauthenticated" && (
        <Footer />
      )}
    </>
  );
};

export default Layout;
