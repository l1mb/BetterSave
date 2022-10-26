import { useSession } from "next-auth/react";
import Image from "next/image";
import mountain from "../../public/backgrounds/mountain-04.jpg";
import InputElement from "../elements/inputElements/inputElement";
import styles from "../styles/login.module.scss";
import BetterSaveLogo from "../../public/logos/BetterSaveLogo.svg";
import CoolLine from "../elements/coolLine/coolLine";

const Login = () => {
  const { data } = useSession();
  return (
    <div className={`${styles.login_wrapper} flex w-full`}>
      <div className="h-vh flex w-4/12 items-center justify-center">
        <div className="w-full">
          <div className="m-auto flex w-8/12 flex-col gap-2 pr-8 text-2xl font-bold text-blueberry-600">
            <Image src={BetterSaveLogo} alt="Logo" objectFit="fill" />
            <CoolLine />
          </div>

          <form
            action="/api/sign-up"
            className={`${styles.form} m-auto flex  w-8/12 flex-col gap-12 rounded pr-8 pt-12 pb-8`}
          >
            <div className="flex flex-col">
              <InputElement
                required
                placeholder="John.Dun@gmail.com"
                type="email"
                htmlFor="email"
                label="Email"
              />

              <InputElement
                required
                placeholder="•••••••••"
                type="password"
                htmlFor="password"
                label="Password"
              />
            </div>

            <button
              type="submit"
              className=" border-purple-200 hover:border-blue-700 rounded-md border py-2 font-semibold transition duration-150 ease-in-out hover:bg-blueberry-800 hover:text-blueberry-100"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="h-vh relative w-8/12">
        <Image
          src={mountain}
          alt="Mountain background"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Login;
