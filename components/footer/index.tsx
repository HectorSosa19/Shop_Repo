import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import {
  Box,
  Heading,
  Flex,
  List,
  ListItem,
  Link,
  Text,
} from "@chakra-ui/react";
import styles from "../navbar/navbar.module.css";

const FooterComponent = () => {
  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="gray.300"
      py="2.5rem"
      margin={"auto"}
      fontSize="0.875rem"
    >
      <Box
        w={"100%"}
        pb="2rem"
        mb="1.5rem"
        px={28}
        borderBottom="2px solid"
        borderColor="gray.300"
        borderLeft={"2px solid"}
        borderRight={"2px solid"}
      >
        <Flex flexWrap="wrap" alignItems="start" justifyContent="space-between">
          <List>
            <ListItem>
              <Link href={"/"}>
                <Text
                  fontSize={"38px"}
                  className={styles.title}
                  color={"white"}
                  _hover={{ color: "#C0A0E9" }}
                  mt={"40px"}
                >
                  Ellie Jane
                </Text>
              </Link>
            </ListItem>
          </List>
          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Flex justifyContent="start" mb="0.5rem" alignItems="baseline">
              <Link href="#" mr="0.5rem">
                <Box
                  color={"white"}
                  fontSize={"15px"}
                  _hover={{
                    borderRadius: "100%",
                    bg: "gray.700",
                  }}
                >
                  <FaFacebookF />
                </Box>
              </Link>
              <Link href="#" mr="0.5rem">
                <Box
                  color={"white"}
                  fontSize={"15px"}
                  _hover={{
                    borderRadius: "100%",
                    bg: "gray.700",
                  }}
                >
                  <RiTwitterXLine />
                </Box>
              </Link>
              <Link href="#" mr="0.5rem">
                <Box
                  color={"white"}
                  fontSize={"15px"}
                  _hover={{
                    borderRadius: "100%",
                    bg: "gray.700",
                  }}
                >
                  <FaInstagram />
                </Box>
              </Link>
            </Flex>
            <List lineHeight="2">
              <LinkItem text="Terms" />
              <LinkItem text="Privacy" />
              <LinkItem text="Site Map" />
            </List>
          </Box>
          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Heading
              as="h5"
              color="white"
              mb="0.5rem"
              fontWeight="600"
              fontSize="20px"
              fontFamily={"AngerStyle"}
            >
              About us
            </Heading>
            <List lineHeight="2" justifyContent="center">
              <LinkItem text="About Ellie Jane" />
              <LinkItem text="Best Seller" />
              <LinkItem text="Reviews" />
              <LinkItem text="Policy" />
            </List>
          </Box>
          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Heading
              as="h5"
              color="white"
              mb="0.5rem"
              fontWeight="600"
              fontSize="20px"
              fontFamily={"AngerStyle"}
            >
              Customer Service
            </Heading>
            <List lineHeight="2">
              <LinkItem text="Contact us" />
              <LinkItem text="Payment &amp; Taxes" />
              <LinkItem text="FAQ" />
            </List>
          </Box>
          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Heading
              as="h5"
              color="white"
              mb="0.5rem"
              fontWeight="600"
              fontSize="20px"
              fontFamily={"AngerStyle"}
            >
              Help
            </Heading>
            <List lineHeight="2">
              <LinkItem text="Suscription" />
              <LinkItem text="Gift Cards" />
              <LinkItem text="Returns" />
              <LinkItem text="How to Order" />
              <LinkItem text="Track your order" />
            </List>
          </Box>
          <Flex
            flexWrap="wrap"
            alignItems="start"
            justifyContent="space-between"
          ></Flex>
        </Flex>
      </Box>
      <Flex mx="auto" alignItems="center" px={10} marginLeft={"5%"}>
        <Text fontFamily={"AngerStyle"} fontSize={"20px"} color={"white"}>
          E - J
        </Text>
        <Text color="gray.600" fontSize="0.875rem" pl="0.5rem">
          &copy; 2024 Back To World, Inc. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

type LinkItemProps = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
};

const LinkItem = ({ text, isTag = false, tagText }: LinkItemProps) => {
  return (
    <ListItem display="flex">
      <Link
        fontWeight="600"
        href="#"
        color="rgba(113, 128, 150, 1)"
        _hover={{ color: "#C0A0E9" }}
      >
        {text}
      </Link>
      {isTag && (
        <Text
          as="span"
          bg="#C0A0E9"
          px="0.25rem"
          display="inline-flex"
          alignItems="center"
          color="#fff"
          height="1.25rem"
          borderRadius="0.25rem"
          ml="0.25rem"
          mt="0.25rem"
          fontSize="0.75rem"
        >
          {tagText}
        </Text>
      )}
    </ListItem>
  );
};

export default FooterComponent;
