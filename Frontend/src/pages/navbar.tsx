/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import LinkElement from "../elements/linkElements/linkElement";
import navLinks from "../utils/links/links";
import Logo from "../../public/logos/BetterSaveLogo.svg";
import { AppDispatch, RootState } from "../store/store";
import { AuthState, login, logout } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const loginHandle = () => {
    dispatch(login({ email: "kok", firstName: "kok", lastName: "" }));
  };

  return (
    <div className=" flex items-center justify-between gap-3 border-b border-violet-600 py-3 px-7">
      <div>
        <Link href="/" className="">
          <div className="relative flex h-8 w-52 cursor-pointer items-center text-sm">
            <Image src={Logo} alt="Better Save" objectFit="fill" />
          </div>
        </Link>
        {navLinks
          .filter((el) => el.align === "left")
          .map((linkObject) => (
            <LinkElement
              link={linkObject.link}
              key={linkObject.link}
              label={linkObject.label}
            />
          ))}
      </div>
      <div className="flex gap-3">
        {authState.authStatus === "authenticated" ? (
          <>
            <LinkElement link="/profile" label="Profile" />
            <button
              className="rounded border border-violet-800 pr-3 pl-3 transition hover:bg-violet-800 hover:text-violet-100"
              type="button"
              onClick={() => handleLogout()}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <LinkElement link="/login" label="Login" />
            <LinkElement link="/register" label="Register" />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
