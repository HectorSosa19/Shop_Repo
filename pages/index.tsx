import CardComponent from "@/components/card";
import Carousel from "@/components/carousel";
import FooterComponent from "@/components/footer";
import MainLayout from "@/layout";
import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function Home() {
  return (
    <>
      <Box
        w={"100%"}
        bgColor={"#161617"}
        bgSize={"cover"}
        h={"auto"}
        minH={"100vh"}
      >
        {/* <Carousel /> */}
        <Box
          display={"flex"}
          flexDir={"row"}
          flexWrap={"wrap"}
          w={"70%"}
          justifyContent={"space-around"}
          margin={"auto"}
          paddingBottom={"20px"}
          maxW={"100vw"}
          px={"80px"}
        >
          <Box px={"20px"} paddingTop={"40px"}>
            <CardComponent />
          </Box>
          <Box px={"20px"} paddingTop={"40px"}>
            <CardComponent />
          </Box>
          <Box px={"20px"} paddingTop={"40px"}>
            <CardComponent />
          </Box>
          <Box px={"20px"} paddingTop={"40px"}>
            <CardComponent />
          </Box>
          <Box px={"20px"} paddingTop={"40px"}>
            <CardComponent />
          </Box>
          <Box px={"20px"} paddingTop={"40px"}>
            <CardComponent />
          </Box>
        </Box>
        <Box>
          <FooterComponent />
        </Box>
      </Box>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout children={page} />;
};
