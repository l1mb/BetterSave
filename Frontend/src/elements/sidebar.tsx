import React from "react";

interface SidebarProps {
  isOpened: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpened }) => (
  <div
    className={`flex w-full  flex-col transition-all ${
      isOpened ? "max-w-[112px]" : "max-w-0"
    } overflow-hidden`}
  >
    <span className="w-full">Some text here</span>
  </div>
);

export default Sidebar;
