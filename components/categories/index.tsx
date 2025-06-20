import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import styles from "@/components/navbar/navbar.module.css";
import axios from "axios";
export const Categories = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [categories, setCategories] = useState<object[]>([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}products/categories`)
      .then((resp: any) => setCategories(resp.data))
      .catch((e: any) => console.log(e));
  }, []);
  return (
    <>
      <Box
        bgColor={"white"}
        paddingBottom={"60px"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Text
          textAlign={"center"}
          className={styles.title}
          fontSize={"45px"}
          color={"black"}
        >
          Categories
        </Text>
        <Box display={"flex"} flexDir={"row"} margin={"auto"}>
          {categories.map((item: any) => (
            <SimpleGrid
              paddingTop={"50px"}
              px={"50px"}
              templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            >
              <Card
                bgColor="transparent"
                color={"black"}
                borderWidth={"1px"}
                textAlign={"center"}
              >
                <CardHeader>
                  <Heading size="md">{item} </Heading>
                </CardHeader>
                <CardBody>
                  <Text>
                    View a summary of all your customers over the last month.
                  </Text>
                </CardBody>
                <CardFooter margin={"auto"}>
                  <Button>View here</Button>
                </CardFooter>
              </Card>
            </SimpleGrid>
          ))}
        </Box>
      </Box>
    </>
  );
};
