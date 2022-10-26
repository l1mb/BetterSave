import { useRouter } from "next/router";
import Navbar from "./navbar";
import Footer from "./footer";
import fullHeightLinks from "../utils/links/fullHeightLinks";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  console.log(router.pathname);
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
