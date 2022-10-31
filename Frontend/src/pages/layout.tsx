import { useRouter } from "next/router";
import { useState } from "react";
import Sidebar from "../elements/sidebar";
import fullHeightLinks from "../utils/links/fullHeightLinks";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const fullHeightLayout =
    fullHeightLinks.filter((path) => router.pathname.includes(path)).length ===
    0;
  const [isOpened, setIsOpened] = useState(true);

  return (
    <>
      {/* {fullHeightLayout && <Navbar />} */}
      <main className="flex w-full ">
        <Sidebar isOpened={isOpened} />
        <button onClick={() => setIsOpened((prevState) => !prevState)}>
          click
        </button>
        {children}
      </main>
      {/* {fullHeightLayout && <Footer />} */}
    </>
  );
};

export default Layout;
