import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export interface ContentProps {
  description?: string;
  price?: number;
  rating?: Rating;
  image?: string;
  title?: string;
}
export interface Rating {
  rate: number;
  count: number;
}

const ContentModal: React.FC<ContentProps> = ({
  description,
  price,
  image,
  rating,
  title,
}: ContentProps) => {
  return (
    <Box display={"flex"} flexDir={"row"} marginTop={"200px"}>
      <Image
        src={image}
        borderRadius="10%"
        margin="auto"
        w="300px"
        h="450px"
        bgColor="transparent"
      ></Image>
      <Box
        display={"flex"}
        flexDir={"column"}
        px={"100px"}
        ml={"100px"}
        mt="50px"
      >
        <Text fontFamily={"mono"} fontSize={"60px"}>
          {title}
        </Text>
        <Text fontSize={"20px"} fontFamily={"mono"}>
          {description}
        </Text>
        <Text fontSize={"20px"} fontFamily={"mono"}>
          Rate:{rating?.rate}
        </Text>
        <Text fontSize={"20px"} fontFamily={"mono"} color={"green.300"}>
          USD {price}
        </Text>
      </Box>
    </Box>
  );
};

export default ContentModal;
