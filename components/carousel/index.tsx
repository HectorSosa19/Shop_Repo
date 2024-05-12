import React, { FC } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

const Images = {
  image1: "",
  image2: "",
};

interface CarouselProps {}
const Carousel: FC<CarouselProps> = () => {
  return (
    <>
      <Box display={"flex"} flexDir={"row"}>
        <Image
          w={"50%"}
          h={"50%"}
          src="https://maustore.online/wp-content/uploads/2023/04/angel-blanco-2.png"
          alt=""
        />
        <Box right={"80px"} top={"340px"} position={"relative"}>
          <Button
            bg={"#161617"}
            padding={"28px"}
            position={"absolute"}
            color={"white"}
            fontFamily={"AngerStyle"}
            fontSize={"30px"}
            borderRadius={"40px"}
            _hover={{ bg: "purple.900", color: "white" }}
          >
            Shop Now
          </Button>{" "}
        </Box>
        <Image
          w={"50%"}
          h={"50%"}
          src="https://i.ebayimg.com/images/g/36sAAOSwv8Vh3QNk/s-l960.jpg"
          alt=""
        />
      </Box>
    </>
  );
};

export default Carousel;
