import React from "react";

interface ContentProps {
  children: JSX.Element;
}

const Content: React.FC<ContentProps> = ({ children }) => (
  <div className="mr-28 ml-28 flex h-screen">{children}</div>
);

export default Content;
