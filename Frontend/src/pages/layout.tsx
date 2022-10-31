import { useRouter } from "next/router";
import { useState } from "react";
import Sidebar from "../elements/sidebar";
import fullHeightLinks from "../utils/links/fullHeightLinks";
import useKeyDown from "../hooks/useKeyDown";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const fullHeightLayout =
    fullHeightLinks.filter((path) => router.pathname.includes(path)).length ===
    0;
  const [isOpened, setIsOpened] = useState(true);

  const onKeyDown = (event: KeyboardEvent) => {
    console.log(event);
  };

  useKeyDown((e) => {
    if (e.key === "s") {
      setIsOpened((prevState) => !prevState);
    }
  }, []);

  return (
    <>
      {/* {fullHeightLayout && <Navbar />} */}
      <div className="flex w-full" onKeyDown={(key) => onKeyDown(key)}>
        <Sidebar isOpened={isOpened} />
        <button onClick={() => setIsOpened((prevState) => !prevState)}>
          click
        </button>
        {children}
      </div>
      {/* {fullHeightLayout && <Footer />} */}
    </>
  );
};

export default Layout;
