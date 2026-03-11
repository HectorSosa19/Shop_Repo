import {
  Image,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface CardInterface {
  title?: string;
  price?: number;
  description?: string;
  image?: string;
  onClick?: () => void;
}

export const CardComponent: FC<CardInterface> = ({
  title = "T-Shirt Overside",
  price = 400,
  image = "https://tommydominicana.vtexassets.com/arquivos/ids/287141/T-shirt-con-logo-de-parche-en-el-pecho.jpg?v=638696752994230000",
}) => {
  return (
    <>
      <Card
        paddingX="10px"
        cursor="pointer"
        fontWeight="bold"
        w={"175vh"}
        maxW={"100%"}
        display="flex"
        justifyContent={"center"}
        border={"0px"}
        borderWidth={"0px"}
        boxShadow={"none"}
      >
        <CardBody display="flex" flexDir="row-reverse" m="auto">
          <Stack spacing="2">
            <Heading
              fontSize="30px"
              fontWeight="thin"
              fontFamily="mono"
              w="300px"
              margin="auto"
            >
              {title}
              <Box display="flex" flexDir="row" pt="30px">
                <Text color="green" fontSize="30px" fontWeight="thin">
                  USD {price} $
                </Text>
              </Box>
              <Button
                borderRadius="20px"
                mt="40px"
                cursor="pointer"
                fontWeight={"light"}
                padding={"20px"}
                borderWidth={"1px"}
                bg={"transparent"}
                _hover={{ color: "green.600" }}
              >
                Buy
              </Button>
            </Heading>
          </Stack>

          <Box mt="20px" display="flex" flexDir="row" px="100px">
            <Image
              src={image}
              alt="..."
              borderRadius="10%"
              margin="auto"
              w="300px"
              h="450px"
              bgColor="transparent"
            />
          </Box>
        </CardBody>
        <CardFooter display="flex" justifyContent="space-between" />
      </Card>
    </>
  );
};

export default CardComponent;
