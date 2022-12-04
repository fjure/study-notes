import type { FC } from "react";
import React from "react";
import Navbar from "./Navbar";

type Props = {
  children?: React.ReactNode;
};

const Layout: FC<Props> = (props) => {
  return (
    <div className="h-screen w-screen bg-stone-200">
      <Navbar />
      {props?.children}
    </div>
  );
};

export default Layout;
