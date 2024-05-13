import React, { FC } from "react";
import NavBar from "@/components/navbar";
import { Box } from "@chakra-ui/react";
import FooterComponent from "@/components/footer";

interface MainLayoutProps {
  children?: React.ReactNode;
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Box>
        <FooterComponent />
      </Box>
    </>
  );
};

export default MainLayout;
