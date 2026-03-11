import { Box, Text, List, ListItem } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserAstronaut } from "react-icons/fa";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { keyframes } from "@emotion/react";
import { useTheme } from "@/context/ThemeContext";
import styles from "@/components/navbar/navbar.module.css";

const marqueeAnimation = keyframes`
  from { transform: translateX(100vw); }
  to { transform: translateX(-100%); }
`;

const SHOP_CATEGORIES = [
  { label: "All Products", href: "/products" },
  { label: "Men's Clothing", href: "/new" },
  { label: "Women's Clothing", href: "/women" },
  { label: "Electronics", href: "/electronics" },
  { label: "Jewelery", href: "/jewelery" },
];

const NAV_LINKS = [
  { label: "MEN'S CLOTHING", href: "/new" },
  { label: "WOMEN'S CLOTHING", href: "/women" },
  { label: "ELECTRONICS", href: "/electronics" },
  { label: "JEWELERY", href: "/jewelery" },
  { label: "TOP SELLER", href: "/sale" },
];

const NavBar = () => {
  const router = useRouter();
  const { dark, toggleTheme, cartCount } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bg = dark ? "black" : "white";
  const fg = dark ? "white" : "black";
  const muted = dark ? "whiteAlpha.400" : "gray.400";
  const border = dark ? "whiteAlpha.200" : "gray.200";
  const borderActive = dark ? "white" : "black";
  const inputBg = dark ? "blackAlpha.400" : "white";
  const marqueeBg = dark ? "white" : "black";
  const marqueeText = dark ? "black" : "white";
  const iconHoverBg = dark ? "white" : "black";
  const iconHoverColor = dark ? "black" : "white";
  const dropdownBg = dark ? "#0a0a0a" : "white";
  const dropdownBorder = dark ? "whiteAlpha.100" : "gray.100";

  const isShopActive = SHOP_CATEGORIES.some((c) => router.pathname === c.href);

  return (
    <Box position="sticky" top={0} zIndex={100} fontFamily="mono">
      <Box
        bg={marqueeBg}
        overflow="hidden"
        py="6px"
        whiteSpace="nowrap"
        transition="background 0.4s"
      >
        <Text
          display="inline-block"
          fontSize="11px"
          color={marqueeText}
          letterSpacing="widest"
          textTransform="uppercase"
          animation={`${marqueeAnimation} 18s linear infinite`}
          transition="color 0.4s"
        >
          ✦ Free Shipping on your First Order &nbsp;&nbsp;&nbsp;&nbsp; ✦ New
          Arrivals Every Week &nbsp;&nbsp;&nbsp;&nbsp; ✦ Returns within 30 Days
          &nbsp;&nbsp;&nbsp;&nbsp; ✦ Secure Payment &nbsp;&nbsp;&nbsp;&nbsp;
        </Text>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: 6, md: 16 }}
        py="14px"
        bg={bg}
        borderBottom="1px solid"
        borderColor={scrolled ? borderActive : border}
        transition="all 0.4s"
        boxShadow={scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none"}
      >
        <Link href="/" passHref>
          <Text
            className={styles.title}
            fontSize="38px"
            color={fg}
            fontWeight="normal"
            letterSpacing="-1px"
            cursor="pointer"
            transition="all 0.4s"
            userSelect="none"
            _hover={{ letterSpacing: "1px" }}
          >
            Ellie-Jane
          </Text>
        </Link>

        <List display="flex" flexDirection="row" gap="36px" alignItems="center">
          <ListItem>
            <Box
              ref={dropdownRef}
              position="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <Box
                display="flex"
                alignItems="center"
                gap="4px"
                cursor="pointer"
                position="relative"
              >
                <Text
                  fontSize="11px"
                  fontWeight={isShopActive ? "bold" : "normal"}
                  color={isShopActive || shopOpen ? fg : muted}
                  letterSpacing="widest"
                  textTransform="uppercase"
                  transition="color 0.2s"
                >
                  SHOP
                </Text>
                <Text
                  fontSize="8px"
                  color={isShopActive || shopOpen ? fg : muted}
                  transition="all 0.2s"
                  transform={shopOpen ? "rotate(180deg)" : "rotate(0deg)"}
                  lineHeight="1"
                  mt="1px"
                >
                  ▾
                </Text>
                <Box
                  position="absolute"
                  bottom="-3px"
                  left={0}
                  h="1px"
                  bg={fg}
                  transition="width 0.25s"
                  w={isShopActive ? "100%" : "0%"}
                />
              </Box>

              <Box
                position="absolute"
                top="100%"
                left="-20px"
                right="-20px"
                h="20px"
                display={shopOpen ? "block" : "none"}
              />

              <Box
                position="absolute"
                top="calc(100% + 16px)"
                left="50%"
                transform="translateX(-50%)"
                w="200px"
                bg={dropdownBg}
                border="1px solid"
                borderColor={dropdownBorder}
                py={2}
                opacity={shopOpen ? 1 : 0}
                pointerEvents={shopOpen ? "auto" : "none"}
                transition="opacity 0.2s"
                boxShadow={
                  dark
                    ? "0 8px 30px rgba(255,255,255,0.05)"
                    : "0 8px 30px rgba(0,0,0,0.08)"
                }
                zIndex={200}
              >
                <Box
                  position="absolute"
                  top="-5px"
                  left="50%"
                  transform="translateX(-50%) rotate(45deg)"
                  w="9px"
                  h="9px"
                  bg={dropdownBg}
                  border="1px solid"
                  borderColor={dropdownBorder}
                  borderBottom="none"
                  borderRight="none"
                />

                {SHOP_CATEGORIES.map(({ label, href }) => {
                  const isActive = router.pathname === href;
                  return (
                    <Link key={href} href={href} passHref>
                      <Box
                        px={5}
                        py="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        cursor="pointer"
                        onClick={() => setShopOpen(false)}
                        bg={
                          isActive
                            ? dark
                              ? "whiteAlpha.100"
                              : "gray.50"
                            : "transparent"
                        }
                        transition="background 0.15s"
                        _hover={{ bg: dark ? "whiteAlpha.100" : "gray.50" }}
                        role="group"
                      >
                        <Text
                          fontSize="11px"
                          letterSpacing="widest"
                          textTransform="uppercase"
                          color={isActive ? fg : muted}
                          fontWeight={isActive ? "bold" : "normal"}
                          transition="color 0.15s"
                          _groupHover={{ color: fg }}
                        >
                          {label}
                        </Text>
                        {isActive && (
                          <Box w="4px" h="4px" borderRadius="full" bg={fg} />
                        )}
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            </Box>
          </ListItem>

          {NAV_LINKS.map(({ label, href }) => {
            const isActive = router.pathname === href;
            return (
              <ListItem key={href}>
                <Link href={href} passHref>
                  <Box
                    position="relative"
                    display="inline-block"
                    cursor="pointer"
                  >
                    <Text
                      fontSize="11px"
                      fontWeight={isActive ? "bold" : "normal"}
                      color={isActive ? fg : muted}
                      letterSpacing="widest"
                      textTransform="uppercase"
                      transition="color 0.3s"
                      _hover={{ color: fg }}
                    >
                      {label}
                    </Text>
                    <Box
                      position="absolute"
                      bottom="-3px"
                      left={0}
                      h="1px"
                      bg={fg}
                      transition="width 0.25s"
                      w={isActive ? "100%" : "0%"}
                    />
                  </Box>
                </Link>
              </ListItem>
            );
          })}
        </List>

        <Box display="flex" alignItems="center" gap="16px">
          <Box w="1px" h="20px" bg={border} transition="background 0.4s" />

          <Link href="/login" passHref>
            <Box
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="34px"
              h="34px"
              borderRadius="full"
              border="1px solid"
              borderColor={border}
              color={muted}
              transition="all 0.2s"
              _hover={{
                borderColor: borderActive,
                bg: iconHoverBg,
                color: iconHoverColor,
              }}
            >
              <FaUserAstronaut size={14} />
            </Box>
          </Link>
          <Link href="/cart" passHref>
            <Box position="relative">
              <Box
                as="button"
                onClick={() => router.push("/cart")}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="34px"
                h="34px"
                borderRadius="full"
                border="1px solid"
                borderColor={border}
                color={muted}
                transition="all 0.2s"
                _hover={{
                  borderColor: borderActive,
                  bg: iconHoverBg,
                  color: iconHoverColor,
                }}
              >
                <CiShoppingCart size={18} />
              </Box>
              <Box
                position="absolute"
                top="-4px"
                right="-4px"
                w="14px"
                h="14px"
                bg={fg}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="background 0.4s"
              >
                <Text
                  fontSize="8px"
                  color={bg}
                  fontWeight="bold"
                  lineHeight="1"
                  transition="color 0.4s"
                >
                  {cartCount}
                </Text>
              </Box>
            </Box>
          </Link>

          <Box w="1px" h="20px" bg={border} transition="background 0.4s" />

          <Box
            as="button"
            onClick={toggleTheme}
            display="flex"
            alignItems="center"
            w="52px"
            h="28px"
            borderRadius="full"
            border="1.5px solid"
            borderColor={borderActive}
            bg={dark ? "white" : "black"}
            px="3px"
            position="relative"
            transition="all 0.35s"
            cursor="pointer"
            flexShrink={0}
          >
            <Text
              position="absolute"
              left="7px"
              fontSize="7px"
              fontWeight="bold"
              letterSpacing="wider"
              color={dark ? "black" : "transparent"}
              transition="color 0.3s"
              userSelect="none"
            >
              BK
            </Text>
            <Text
              position="absolute"
              right="6px"
              fontSize="7px"
              fontWeight="bold"
              letterSpacing="wider"
              color={dark ? "transparent" : "white"}
              transition="color 0.3s"
              userSelect="none"
            >
              WH
            </Text>
            <Box
              w="20px"
              h="20px"
              borderRadius="full"
              bg={dark ? "black" : "white"}
              border="1px solid"
              borderColor={dark ? "whiteAlpha.300" : "blackAlpha.200"}
              position="absolute"
              left={dark ? "calc(100% - 23px)" : "3px"}
              transition="left 0.3s cubic-bezier(0.4,0,0.2,1), background 0.35s"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="9px" lineHeight="1" userSelect="none">
                {dark ? "🌙" : "☀️"}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
