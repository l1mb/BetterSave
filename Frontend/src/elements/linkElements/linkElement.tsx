import Link from "next/link";
import React from "react";

interface LinkElementProps {
  link: string;
  label: string;
}

const LinkElement: React.FC<LinkElementProps> = ({ link, label }) => (
  <Link href={link}>
    <span className="rounded-lg  border border-transparent py-2 px-4  transition duration-150 hover:border-neutral-500 focus:shadow-sm">
      {label}
    </span>
  </Link>
);

export default LinkElement;
