import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Sidebar from "../elements/sidebar";
import fullHeightLinks from "../utils/links/fullHeightLinks";
import useKeyDown from "../hooks/useKeyDown";
import Navbar from "./navbar";
import Footer from "./footer";

import sidebarIcon from "../../public/icons/sidebarIcon.svg";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const fullHeightLayout =
    fullHeightLinks.filter((path) => router.pathname.includes(path)).length > 0;
  const [isOpened, setIsOpened] = useState(!router.pathname.includes("/login"));
  const { data, status } = useSession();

  useKeyDown(
    (e) => {
      console.log(e);
      console.log(router.pathname);
      if (e.key === "s" && !fullHeightLayout) {
        setIsOpened((prevState) => !prevState);
      }
    },
    [router]
  );

  return (
    <>
      {status === "unauthenticated" && <Navbar />}
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
      {(fullHeightLayout || status === "unauthenticated") && <Footer />}
    </>
  );
};

export default Layout;
