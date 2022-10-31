import React from "react";

interface SidebarProps {
  isOpened: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpened }) => {
  const applyedClassName = "";

  return (
    <div
      className={`flex  flex-col transition-all ${
        isOpened ? "min-w-[112px]" : "min-w-0"
      } overflow-hidden`}
    >
      <span className="w-full">Some text here</span>
    </div>
  );
};

export default Sidebar;
