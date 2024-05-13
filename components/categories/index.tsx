import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import styles from "@/components/navbar/navbar.module.css";
export const Categories = () => {
  return (
    <>
      <Box
        bgColor={"#161617"}
        paddingBottom={"60px"}
        // alignItems={"center"}

        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
      >
        <Divider />
        <Text
          textAlign={"center"}
          className={styles.title}
          fontSize={"45px"}
          color={"white"}
        >
          Categories
        </Text>
        <SimpleGrid
          paddingTop={"50px"}
          px={"100px"}
          spacing={14}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <Card bgColor="transparent" color={"white"} borderWidth={"1px"}>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
          <Card bgColor="transparent" color={"white"} borderWidth={"1px"}>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
          <Card bgColor="transparent" color={"white"} borderWidth={"1px"}>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
          <Card bgColor="transparent" color={"white"} borderWidth={"1px"}>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
          <Card bgColor="transparent" color={"white"} borderWidth={"1px"}>
            <CardHeader>
              <Heading size="md"> Customer dashboard</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                View a summary of all your customers over the last month.
              </Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Box>
    </>
  );
};
