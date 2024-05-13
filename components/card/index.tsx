import {
  Image,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { TbShoppingBagPlus } from "react-icons/tb";
import React, { FC } from "react";
import { CiStar } from "react-icons/ci";
interface CardInterface {}
export const CardComponent: FC<CardInterface> = () => {
  return (
    <>
      <Card
        paddingRight={"10px"}
        paddingLeft={"10px"}
        maxW="260px"
        bgColor={"transparent"}
        borderWidth={"1px"}
      >
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading
              size="md"
              color={"gray.300"}
              fontWeight={"light"}
              fontFamily={"AngerStyles"}
            >
              T-Shirt Overside
            </Heading>
            <Box
              display={"flex"}
              flexDir={"row"}
              justifyContent={"space-between"}
              fontFamily={"AngerStyles"}
            >
              <Text
                color="gray.400"
                fontSize={"2xl"}
                fontFamily={"AngerStyles"}
              >
                DOP
              </Text>
              <Text color="gray.400" fontSize="2xl">
                $450
              </Text>
            </Box>
          </Stack>
          <Box marginTop={"20px"}>
            <Image
              src="https://goldenconcept.com/cdn/shop/products/OV_T-Shirt_WHE-01_863x.progressive.jpg?v=1695823693"
              alt="..."
              borderRadius="10%"
            />
          </Box>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <IconButton
              aria-label="Search database"
              icon={<TbShoppingBagPlus />}
              variant={"ghost"}
              _hover={{
                bgColor: "transparent",
                color: "blue.600",
              }}
              color={"white"}
              fontSize={"22px"}
            />
            <IconButton
              aria-label="Search database"
              icon={<CiStar />}
              variant={"ghost"}
              _hover={{
                bgColor: "transparent",
                color: "yellow",
              }}
              color={"white"}
              fontSize={"22px"}
            />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardComponent;
