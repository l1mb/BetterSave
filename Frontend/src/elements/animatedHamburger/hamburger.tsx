import { AppState } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

interface HamburgerMenuProps {
  setIsOpen: () => void;
}

function HamburgerButton({ setIsOpen }: HamburgerMenuProps) {
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-indigo-700 transition ease transform duration-300`;
  const selector = useSelector<RootState, AppState>((x) => x.auth);

  return (
    <button
      type="button"
      className="group flex h-12 w-12 scale-75 flex-col items-center justify-center rounded border border-indigo-700"
      onClick={() => setIsOpen()}
    >
      <div
        className={`${genericHamburgerLine} ${
          selector.isHamburgerMenuOpen
            ? "translate-y-3 rotate-45 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          selector.isHamburgerMenuOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          selector.isHamburgerMenuOpen
            ? "-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
}

export default HamburgerButton;
