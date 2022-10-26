/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LinkElement from "../elements/linkElements/linkElement";
import navLinks from "../utils/links/links";

const Navbar = () => (
  <div className="flex gap-3 border-b border-neutral-300 py-3 px-7">
    {navLinks.map((linkObject) => (
      <LinkElement
        link={linkObject.link}
        key={linkObject.link}
        label={linkObject.label}
      />
    ))}
  </div>
);

export default Navbar;
