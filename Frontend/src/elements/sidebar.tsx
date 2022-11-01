/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";
import sidebarLinks from "../utils/links/sidebar";

interface SidebarProps {
  isOpened: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpened }) => (
  <div
    className={`flex w-full  flex-col gap-2 transition-all ${
      isOpened ? "max-w-[164px]" : "max-w-0"
    } overflow-hidden`}
  >
    {sidebarLinks.map((link) => (
      <Link href={link.link}>
        <a className="mx-auto flex w-3/4 border-b border-blueberry-800 px-2 py-2 text-center">
          {link.label}
        </a>
      </Link>
    ))}
  </div>
);

export default Sidebar;
