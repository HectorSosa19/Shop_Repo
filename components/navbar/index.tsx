import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import styles from "@/components/navbar/navbar.module.css";
import Link from "next/link";
import { CiShoppingTag } from "react-icons/ci";
import { FaUserAstronaut } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
const NavBar = () => {
  return (
    <>
      <Box
        bg="gray.800"
        color="white"
        display={"flex"}
        flexDir={"row"}
        justifyContent={"center"}
        margin={"auto"}
      >
        <Text fontSize={"18px"} fontWeight={"light"}>
          Free Shipping the First Month
        </Text>
        <Box fontSize={"17px"} mt={"1.5"} ml={"2"}>
          <CiShoppingTag />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        bgColor={"#161617"}
        color={"white"}
        paddingBottom={"10px"}
        borderBottom={"1px solid gray"}
        borderTop={"1px solid gray"}
      >
        <List>
          <ListItem>
            <Link href={"/"}>
              <Text
                fontSize={"48px"}
                className={styles.title}
                _hover={{ color: "#C0A0E9" }}
                mt={"5px"}
              >
                Ellie-Jane
              </Text>
            </Link>
          </ListItem>
        </List>
        <List
          display={"flex"}
          flexDirection={"row"}
          fontSize={"16px"}
          mt={"5px"}
          ml={"200px"}
        >
          <ListItem
            px={"20px"}
            fontWeight={"bold"}
            _hover={{
              color: "#C0A0E9",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            marginTop={"25px"}
          >
            NEW
          </ListItem>
          <ListItem
            fontWeight={"bold"}
            px={"20px"}
            _hover={{
              color: "#C0A0E9",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            marginTop={"25px"}
          >
            APPAREL
          </ListItem>
          <ListItem
            fontWeight={"bold"}
            px={"20px"}
            _hover={{
              color: "#C0A0E9",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            marginTop={"25px"}
          >
            SALE
          </ListItem>
          <ListItem
            fontWeight={"bold"}
            px={"20px"}
            _hover={{
              color: "#C0A0E9",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            marginTop={"25px"}
          >
            GIFT
          </ListItem>
        </List>

        <List>
          <ListItem>
            <Box border={"0"} mt={"20px"} display={"flex"} flexDir={"row"}>
              <Box mr={"30px"}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Box fontSize={"20px"}>
                      <CiSearch />
                    </Box>
                  </InputLeftElement>
                  <Input
                    border={"none"}
                    borderRadius={"50px"}
                    placeholder="Looking for Clothes..."
                  />
                </InputGroup>
              </Box>
              <IconButton
                h={"30px"}
                w={"30px"}
                aria-label=""
                bg={"transparent"}
                color={"gray.500"}
                mt={"6px"}
                as={FaUserAstronaut}
                _hover={{ color: "#C0A0E9", cursor: "pointer" }}
              />
              <IconButton
                h={"30px"}
                w={"30px"}
                margin={"auto"}
                aria-label=""
                mt={"6px"}
                bg={"transparent"}
                color={"gray.500"}
                as={CiShoppingCart}
                _hover={{ color: "#C0A0E9", cursor: "pointer" }}
              />
            </Box>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default NavBar;
