/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";
import sidebarLinks from "../utils/links/sidebar";

interface SidebarProps {
  isOpened: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpened }) => {
  const dispatch: AppDispatch = useDispatch();
  function logoutHandler() {
    dispatch(logout());
  }

  return (
    <div
      className={`flex w-full  flex-col gap-2 border-violet-800 shadow-2xl transition-all ${
        isOpened ? "max-w-[164px]" : "max-w-0"
      } overflow-hidden`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="mt-12 flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <Link href={link.link} key={link.link}>
              <a className="decoration-none mx-auto flex w-3/4 rounded-t-md border-b border-violet-800 px-2 py-2 text-center text-base transition hover:bg-violet-600 hover:text-violet-50 ">
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        <div>
          <button type="button" onClick={() => logoutHandler()}>
            Logout
          </button>
          <Link href="/settings">
            <a className="mx-auto flex w-3/4 border-b border-violet-800 px-2 py-2 text-center">
              Settings
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
