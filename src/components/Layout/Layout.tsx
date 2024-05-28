import React from "react";

import HeaderDemo from "@/components/HeaderDemo/HeaderDemo";
import FooterDemo from "@/components/FooterDemo/FooterDemo";
import { LayoutTypes } from "./Layout.types";

const Layout: React.FC<LayoutTypes> = ({ children }) => (
  <>
    <HeaderDemo />
    {children}
    <FooterDemo />
  </>
);

export default Layout;
