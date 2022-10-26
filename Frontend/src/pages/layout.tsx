import { useRouter } from "next/router";
import Navbar from "./navbar";
import Footer from "./footer";
import fullHeightLinks from "../utils/links/fullHeightLinks";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const fullHeightLayout =
    fullHeightLinks.filter((path) => router.pathname.includes(path)).length ===
    0;

  return (
    <>
      {fullHeightLayout && <Navbar />}
      <main>{children}</main>
      {fullHeightLayout && <Footer />}
    </>
  );
};

export default Layout;
