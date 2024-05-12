import React, { FC } from "react";
import NavBar from "@/components/navbar";

interface MainLayoutProps {
  children?: React.ReactNode;
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MainLayout;
