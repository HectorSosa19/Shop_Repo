import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Text,
  List,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import styles from "../navbar/navbar.module.css";
import Link from "next/link";
import { FaUserAstronaut } from "react-icons/fa";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { keyframes } from "@emotion/react";

const NavBar = () => {
  const marqueeAnimation = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
`;

  return (
    <>
      {/* Barra superior con mensaje animado */}
      <Box
        bg="#d8d8d8"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        margin="auto"
        className="marquee"
      >
        <Text
          fontSize="18px"
          fontWeight="light"
          color="black"
          animation={`${marqueeAnimation} 10s linear infinite`}
        >
          Free Shipping the First Month
        </Text>
      </Box>

      {/* Navbar principal */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="10px 20px"
        borderBottom="1px solid gray"
        borderTop="1px solid gray"
        bgColor="white"
      >
        {/* Logo */}
        <Link href="/" passHref>
          <Text
            fontSize="48px"
            className={styles.title}
            _hover={{ fontWeight: "bold" }}
            color="black"
          >
            Ellie-Jane
          </Text>
        </Link>

        {/* Menú de navegación */}
        <List display="flex" flexDirection="row" gap="20px" alignItems="center">
          <ListItem>
            <Link href="/new" passHref>
              <Text
                color="black"
                fontWeight="thin"
                _hover={{ cursor: "pointer", fontWeight: "bold" }}
                fontFamily="mono"
              >
                NEW
              </Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/products" passHref>
              <Text
                color="black"
                fontWeight="thin"
                _hover={{ cursor: "pointer", fontWeight: "bold" }}
                fontFamily="mono"
              >
                ALL-PRODUCTS
              </Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/sale" passHref>
              <Text
                color="black"
                fontWeight="thin"
                _hover={{ cursor: "pointer", fontWeight: "bold" }}
                fontFamily="mono"
              >
                TOP-SELLER
              </Text>
            </Link>
          </ListItem>
        </List>

        {/* Barra de búsqueda + iconos */}
        <Box display="flex" alignItems="center" gap="20px">
          <InputGroup maxW="250px">
            <InputLeftElement pointerEvents="none">
              <CiSearch fontSize="20px" color="gray" />
            </InputLeftElement>
            <Input
              borderRadius="50px"
              placeholder="Looking for Clothes..."
              _focus={{ borderColor: "black" }}
            />
          </InputGroup>

          <Link href="/login" passHref>
            <IconButton
              aria-label="User"
              bg="transparent"
              color="black"
              as={FaUserAstronaut}
              _hover={{ cursor: "pointer" }}
            />
          </Link>

          <IconButton
            aria-label="Cart"
            bg="transparent"
            color="black"
            as={CiShoppingCart}
            _hover={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
