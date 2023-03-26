/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";
import sidebarLinks from "../utils/links/sidebar";

interface SidebarProps {
  isOpened: boolean;
}

function Sidebar({ isOpened }: SidebarProps) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  function logoutHandler() {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
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
            <Link to={link.link} key={link.link}>
              <span className="decoration-none mx-auto flex w-3/4 rounded-t-md border-b border-violet-800 px-2 py-2 text-center text-base transition hover:bg-violet-600 hover:text-violet-50 ">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div>
          <button
            type="button"
            className="mx-5 rounded px-2 py-1 transition hover:bg-violet-200"
            onClick={() => logoutHandler()}
          >
            Logout
          </button>
          <Link to="/settings">
            <a className="mx-auto flex w-3/4 border-b border-violet-800 px-2 py-2 text-center">Settings</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
