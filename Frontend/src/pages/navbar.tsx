/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import LinkElement from "../elements/linkElements/linkElement";
import navLinks from "../utils/links/links";
import Logo from "../../public/logos/BetterSaveLogo.svg";

const Navbar = () => (
  <div className=" flex items-center justify-between gap-3 border-b border-blueberry-600 py-3 px-7">
    <div>
      <Link href="/home" className="">
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
      {navLinks
        .filter((el) => el.align === "right")
        .map((linkObject) => (
          <LinkElement
            link={linkObject.link}
            key={linkObject.link}
            label={linkObject.label}
          />
        ))}
    </div>
  </div>
);

export default Navbar;
