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
      className={`flex flex-col gap-2 border-indigo-800 shadow-2xl transition-all ${
        isOpened ? "w-[164px] scale-x-100" : "w-0 scale-x-0"
      } overflow-hidden`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="mt-12 flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <Link to={link.link} key={link.link}>
              <span className="decoration-none mx-auto flex w-3/4 rounded-t-md border-b border-indigo-800 px-2 py-2 text-center text-base transition hover:bg-indigo-600 hover:text-indigo-50 ">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="my-10 flex flex-col justify-start gap-1 rounded align-baseline">
          <button
            type="button"
            className="mx-5 rounded  border border-indigo-700 bg-gray-50 px-2 py-2 text-start text-indigo-700 transition-colors hover:bg-white hover:text-gray-900 "
            onClick={() => logoutHandler()}
          >
            Выход
          </button>
          <Link to="/settings">
            <span className="mx-auto flex w-3/4 rounded border border-indigo-800 px-2 py-2 text-center">Настройки</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
