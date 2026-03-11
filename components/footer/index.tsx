import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { Box, Flex, List, ListItem, Link, Text } from "@chakra-ui/react";
import { useTheme } from "@/context/ThemeContext";
import styles from "@/components/navbar/navbar.module.css";
const FooterComponent = () => {
  const { palette: p } = useTheme();

  return (
    <Box
      bg={p.bg}
      as="footer"
      borderTop="1px solid"
      borderColor={p.border}
      py="2.5rem"
      margin="auto"
      fontSize="0.875rem"
      fontFamily="mono"
      transition="all 0.4s"
    >
      <Box
        w="100%"
        pb="2rem"
        mb="1.5rem"
        px={28}
        borderBottom="1px solid"
        borderColor={p.border}
      >
        <Flex flexWrap="wrap" alignItems="start" justifyContent="space-between">
          <List>
            <ListItem>
              <Link href={"/"}>
                <Text
                  fontSize={"38px"}
                  className={styles.title}
                  color={p.fg}
                  _hover={{ color: "black", fontWeight: "bold" }}
                  mt={"40px"}
                >
                  Ellie Jane
                </Text>
              </Link>
            </ListItem>
            <ListItem mt={4}>
              <Flex gap={3} alignItems="center">
                {[
                  { icon: <FaFacebookF />, href: "#" },
                  { icon: <RiTwitterXLine />, href: "#" },
                  { icon: <FaInstagram />, href: "#" },
                ].map(({ icon, href }, i) => (
                  <Link key={i} href={href}>
                    <Box
                      w="28px"
                      h="28px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="full"
                      border="1px solid"
                      borderColor={p.border}
                      color={p.muted}
                      fontSize="13px"
                      transition="all 0.2s"
                      _hover={{ borderColor: p.fg, bg: p.fg, color: p.bg }}
                    >
                      {icon}
                    </Box>
                  </Link>
                ))}
              </Flex>
            </ListItem>
          </List>

          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={3}
              fontWeight="bold"
            >
              Legal
            </Text>
            <LinkItem text="Terms" fg={p.fg} muted={p.muted} />
            <LinkItem text="Privacy" fg={p.fg} muted={p.muted} />
            <LinkItem text="Site Map" fg={p.fg} muted={p.muted} />
          </Box>

          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={3}
              fontWeight="bold"
            >
              About us
            </Text>
            <LinkItem text="About Ellie Jane" fg={p.fg} muted={p.muted} />
            <LinkItem text="Best Seller" fg={p.fg} muted={p.muted} />
            <LinkItem text="Reviews" fg={p.fg} muted={p.muted} />
            <LinkItem text="Policy" fg={p.fg} muted={p.muted} />
          </Box>

          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={3}
              fontWeight="bold"
            >
              Customer Service
            </Text>
            <LinkItem text="Contact us" fg={p.fg} muted={p.muted} />
            <LinkItem text="Payment & Taxes" fg={p.fg} muted={p.muted} />
            <LinkItem text="FAQ" fg={p.fg} muted={p.muted} />
          </Box>

          <Box
            w={{ base: "100%", sm: "50%", md: "max-content" }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={3}
              fontWeight="bold"
            >
              Help
            </Text>
            <LinkItem text="Suscription" fg={p.fg} muted={p.muted} />
            <LinkItem text="Gift Cards" fg={p.fg} muted={p.muted} />
            <LinkItem text="Returns" fg={p.fg} muted={p.muted} />
            <LinkItem text="How to Order" fg={p.fg} muted={p.muted} />
            <LinkItem text="Track your order" fg={p.fg} muted={p.muted} />
          </Box>
        </Flex>
      </Box>

      <Flex
        mx="auto"
        alignItems="center"
        px={10}
        marginLeft="5%"
        justify="space-between"
        pr={28}
      >
        <Text
          fontFamily={"AngerStyle"}
          fontSize={"20px"}
          fontStyle="italic"
          color={p.fg}
          transition="color 0.4s"
        >
          E — J
        </Text>
        <Text
          color={p.muted}
          fontSize="0.75rem"
          fontFamily="mono"
          letterSpacing="wider"
          transition="color 0.4s"
        >
          © 2025 Ellie-Jane, Inc. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

type LinkItemProps = {
  text?: string;
  fg: string;
  muted: string;
};

const LinkItem = ({ text, fg, muted }: LinkItemProps) => {
  return (
    <List>
      <ListItem display="flex" lineHeight="2">
        <Link
          href="#"
          fontSize="sm"
          fontFamily="mono"
          color={muted}
          _hover={{ color: fg }}
          transition="color 0.2s"
        >
          {text}
        </Link>
      </ListItem>
    </List>
  );
};

export default FooterComponent;
