/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "images/logos/BetterSaveLogo.svg";
import { Link } from "react-router-dom";
import useWindowSize from "@/hooks/useWindowSizeHook";
import LinkElement from "@/elements/linkElements/linkElement";
import HamburgerButton from "@/elements/animatedHamburger/hamburger";
import { AppDispatch, RootState } from "../../store/store";
import { AppState, setHamburgerState } from "../../store/slices/authSlice";

function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const appState = useSelector<RootState, AppState>((state) => state.auth);
  const [isDropdownOpen, setIsOpen] = useState(false);

  const { isMobile, height } = useWindowSize();

  const setIsOpenHamburger = () => {
    dispatch(setHamburgerState());
  };

  return (
    <div className=" relative flex items-center justify-between gap-3 border-b border-indigo-600 py-3 px-7">
      <div>
        <Link to="/" className="">
          <div className="relative flex h-8 w-52 cursor-pointer items-center text-sm">
            <img src={Logo} alt="Better Save" />
          </div>
        </Link>

        <div />
      </div>
      {!isMobile && (
        <div className="flex gap-3">
          <LinkElement link="/login" label="Войти" />
          <LinkElement link="/register" label="Зарегистрироваться" />
        </div>
      )}
      {isMobile && (
        <div className="flex  justify-end">
          <HamburgerButton setIsOpen={setIsOpenHamburger} />
        </div>
      )}
      {/* <div className="flex gap-3">
        {AppState.authStatus === "authenticated" ? (
          <>
            <LinkElement link="/profile" label="Profile" />
            <button
              className="rounded border border-indigo-800 pr-3 pl-3 transition hover:bg-indigo-800 hover:text-indigo-100"
              type="button"
              onClick={() => handleLogout()}
            >
              Выход
            </button>
          </>
        ) : (
          <>
            <LinkElement link="/login" label="Войти" />
            <LinkElement link="/register" label="Зарегистрироваться" />
          </>
        )}
      </div> */}
    </div>
  );
}

export default Navbar;
