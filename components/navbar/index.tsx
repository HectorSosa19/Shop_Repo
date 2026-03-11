import React, { useEffect, useRef, useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useTheme } from "@/context/ThemeContext";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";
import { keyframes } from "@emotion/react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const marqueeAnim = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const SHOP_CATEGORIES = [
  { label: "All Products", href: "/products" },
  { label: "Men's Clothing", href: "/new" },
  { label: "Women's Clothing", href: "/women" },
  { label: "Electronics", href: "/electronics" },
  { label: "Jewelery", href: "/jewelery" },
];

const NAV_LINKS = [
  { label: "SHOP", href: "/products", hasDropdown: true },
  { label: "MEN'S CLOTHING", href: "/new" },
  { label: "WOMEN'S CLOTHING", href: "/women" },
  { label: "ELECTRONICS", href: "/electronics" },
  { label: "JEWELERY", href: "/jewelery" },
  { label: "TOP SELLER", href: "/sale" },
];

const MARQUEE_TEXT = [
  "+ FREE SHIPPING ON YOUR FIRST ORDER",
  "+ NEW ARRIVALS EVERY WEEK",
  "+ RETURNS WITHIN 30 DAYS",
  "+ SECURE PAYMENT",
];

export const NavBar = () => {
  const { palette: p, dark, toggleTheme, cartCount } = useTheme();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [router.pathname]);

  const isActive = (href: string) => router.pathname === href;

  return (
    <>
      <Box
        w="100%"
        bg={dark ? "white" : "black"}
        py={2}
        overflow="hidden"
        transition="background 0.4s"
      >
        <Box
          display="flex"
          animation={`${marqueeAnim} 28s linear infinite`}
          whiteSpace="nowrap"
          w="max-content"
        >
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT].map((t, i) => (
            <Text
              key={i}
              fontSize="10px"
              letterSpacing="widest"
              textTransform="uppercase"
              color={dark ? "black" : "white"}
              fontFamily="mono"
              px={8}
            >
              {t}
            </Text>
          ))}
        </Box>
      </Box>

      <Box
        w="100%"
        position="sticky"
        top={0}
        zIndex={100}
        bg={p.bg}
        borderBottom="1px solid"
        borderColor={scrolled ? p.fg : p.border}
        boxShadow={scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none"}
        transition="all 0.3s"
      >
        <HStack
          px={{ base: 4, md: 8, lg: 12 }}
          h={{ base: "60px", md: "72px" }}
          justify="space-between"
          align="center"
        >
          <Link href="/" passHref>
            <Box
              display="flex"
              alignItems="baseline"
              gap={0}
              cursor="pointer"
              flexShrink={0}
            >
              <Text
                className={styles.title}
                fontSize={{ base: "28px", md: "36px" }}
                color={p.fg}
                transition="color 0.4s"
                lineHeight="1"
              >
                Ellie
              </Text>
              <Text
                className={styles.title}
                fontSize={{ base: "28px", md: "36px" }}
                color={p.muted}
                transition="color 0.4s"
                lineHeight="1"
              >
                -Jane
              </Text>
            </Box>
          </Link>

          <HStack spacing={6} display={{ base: "none", xl: "flex" }}>
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <Box
                  key={link.label}
                  position="relative"
                  ref={shopRef}
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <HStack spacing={1} cursor="pointer">
                    <Text
                      fontSize="11px"
                      fontFamily="mono"
                      fontWeight="bold"
                      letterSpacing="widest"
                      color={isActive(link.href) ? p.fg : p.muted}
                      _hover={{ color: p.fg }}
                      transition="color 0.2s"
                      textTransform="uppercase"
                    >
                      {link.label}
                    </Text>
                    <Text fontSize="9px" color={p.muted}>
                      ▾
                    </Text>
                  </HStack>
                  {shopOpen && (
                    <Box
                      position="absolute"
                      top="100%"
                      left={0}
                      w="200px"
                      h="12px"
                    />
                  )}
                  {shopOpen && (
                    <Box
                      position="absolute"
                      top="calc(100% + 12px)"
                      left={0}
                      bg={p.bg}
                      border="1px solid"
                      borderColor={p.fg}
                      minW="180px"
                      zIndex={200}
                      py={2}
                    >
                      {SHOP_CATEGORIES.map((cat) => (
                        <Link key={cat.href} href={cat.href} passHref>
                          <Box
                            px={4}
                            py={3}
                            cursor="pointer"
                            _hover={{ bg: p.cardBg }}
                            transition="background 0.15s"
                          >
                            <Text
                              fontSize="10px"
                              fontFamily="mono"
                              letterSpacing="widest"
                              textTransform="uppercase"
                              color={p.fg}
                            >
                              {cat.label}
                            </Text>
                          </Box>
                        </Link>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : (
                <Link key={link.label} href={link.href} passHref>
                  <Box position="relative" cursor="pointer">
                    <Text
                      fontSize="11px"
                      fontFamily="mono"
                      fontWeight="bold"
                      letterSpacing="widest"
                      color={isActive(link.href) ? p.fg : p.muted}
                      _hover={{ color: p.fg }}
                      transition="color 0.2s"
                      textTransform="uppercase"
                    >
                      {link.label}
                    </Text>
                    {isActive(link.href) && (
                      <Box
                        position="absolute"
                        bottom="-4px"
                        left={0}
                        right={0}
                        h="1.5px"
                        bg={p.fg}
                      />
                    )}
                  </Box>
                </Link>
              ),
            )}
          </HStack>

          <HStack spacing={{ base: 3, md: 4 }} align="center">
            <Box
              position="relative"
              display={{ base: "none", md: "flex" }}
              alignItems="center"
            >
              <Box
                as={CiSearch}
                w="20px"
                h="20px"
                color={p.muted}
                cursor="pointer"
                _hover={{ color: p.fg }}
                transition="color 0.2s"
                onClick={() => setSearchOpen(!searchOpen)}
                flexShrink={0}
              />
              <Box
                as="input"
                ref={searchRef}
                placeholder="Buscar..."
                w={searchOpen ? "160px" : "0px"}
                ml={searchOpen ? 2 : 0}
                opacity={searchOpen ? 1 : 0}
                overflow="hidden"
                transition="all 0.3s"
                border="none"
                borderBottom="1px solid"
                borderColor={p.fg}
                bg="transparent"
                color={p.fg}
                fontFamily="mono"
                fontSize="11px"
                outline="none"
                px={1}
                py={0.5}
                _placeholder={{ color: p.muted }}
              />
            </Box>

            <Link href="/login" passHref>
              <Box
                as={CiUser}
                w="22px"
                h="22px"
                color={p.muted}
                cursor="pointer"
                _hover={{ color: p.fg }}
                transition="color 0.2s"
              />
            </Link>

            <Link href="/cart" passHref>
              <Box position="relative" cursor="pointer">
                <Box
                  as={CiShoppingCart}
                  w="22px"
                  h="22px"
                  color={p.muted}
                  _hover={{ color: p.fg }}
                  transition="color 0.2s"
                />
                {cartCount > 0 && (
                  <Box
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    bg={p.fg}
                    color={p.bg}
                    w="16px"
                    h="16px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="8px"
                    fontWeight="bold"
                    fontFamily="mono"
                  >
                    {cartCount}
                  </Box>
                )}
              </Box>
            </Link>

            <Box
              display="flex"
              alignItems="center"
              gap={1}
              cursor="pointer"
              onClick={toggleTheme}
              border="1px solid"
              borderColor={p.border}
              borderRadius="full"
              px={2}
              py={1}
              transition="all 0.2s"
              _hover={{ borderColor: p.fg }}
              flexShrink={0}
            >
              <Text
                fontSize="9px"
                fontFamily="mono"
                color={p.muted}
                display={{ base: "none", sm: "block" }}
              >
                {dark ? "WH" : "BK"}
              </Text>
              <Box
                w="18px"
                h="18px"
                borderRadius="full"
                bg={p.fg}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="10px"
              >
                {dark ? "☀️" : "🌙"}
              </Box>
            </Box>

            <Box
              display={{ base: "flex", xl: "none" }}
              flexDir="column"
              gap="5px"
              cursor="pointer"
              p={1}
              onClick={() => setMobileOpen(true)}
              flexShrink={0}
            >
              <Box w="22px" h="1.5px" bg={p.fg} transition="all 0.2s" />
              <Box w="16px" h="1.5px" bg={p.fg} transition="all 0.2s" />
              <Box w="22px" h="1.5px" bg={p.fg} transition="all 0.2s" />
            </Box>
          </HStack>
        </HStack>
      </Box>

      {mobileOpen && (
        <Box
          position="fixed"
          inset={0}
          zIndex={999}
          display={{ base: "flex", xl: "none" }}
        >
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.600"
            onClick={() => setMobileOpen(false)}
          />

          <Box
            position="absolute"
            top={0}
            right={0}
            w={{ base: "100%", sm: "360px" }}
            h="100vh"
            bg={p.bg}
            display="flex"
            flexDir="column"
            overflowY="auto"
            zIndex={1000}
          >
            <HStack
              justify="space-between"
              px={6}
              py={5}
              borderBottom="1px solid"
              borderColor={p.border}
            >
              <Box display="flex" alignItems="baseline" gap={0}>
                <Text
                  className={styles.title}
                  fontSize="28px"
                  color={p.fg}
                  lineHeight="1"
                >
                  Ellie
                </Text>
                <Text
                  className={styles.title}
                  fontSize="28px"
                  color={p.muted}
                  lineHeight="1"
                >
                  -Jane
                </Text>
              </Box>
              <Box
                as={RiCloseLine}
                w="24px"
                h="24px"
                color={p.fg}
                cursor="pointer"
                onClick={() => setMobileOpen(false)}
                _hover={{ opacity: 0.7 }}
              />
            </HStack>

            <Box px={6} py={4} borderBottom="1px solid" borderColor={p.border}>
              <Box
                display="flex"
                alignItems="center"
                gap={3}
                border="1px solid"
                borderColor={p.border}
                px={4}
                py={3}
                borderRadius="sm"
              >
                <Box
                  as={CiSearch}
                  w="18px"
                  h="18px"
                  color={p.muted}
                  flexShrink={0}
                />
                <Box
                  as="input"
                  placeholder="Buscar productos..."
                  flex="1"
                  bg="transparent"
                  border="none"
                  outline="none"
                  color={p.fg}
                  fontFamily="mono"
                  fontSize="13px"
                  _placeholder={{ color: p.muted }}
                />
              </Box>
            </Box>

            <Box flex="1" px={6} py={4}>
              <Text
                fontSize="9px"
                textTransform="uppercase"
                letterSpacing="widest"
                color={p.muted}
                mb={4}
              >
                Menú
              </Text>

              <Box mb={1}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={4}
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderColor={p.border}
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                >
                  <Text
                    fontSize="13px"
                    fontFamily="mono"
                    fontWeight="bold"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    color={p.fg}
                  >
                    Shop
                  </Text>
                  <Text
                    fontSize="12px"
                    color={p.muted}
                    transition="transform 0.2s"
                    transform={mobileShopOpen ? "rotate(180deg)" : "none"}
                  >
                    ▾
                  </Text>
                </Box>
                {mobileShopOpen && (
                  <Box
                    pl={4}
                    py={2}
                    borderBottom="1px solid"
                    borderColor={p.border}
                  >
                    {SHOP_CATEGORIES.map((cat) => (
                      <Link key={cat.href} href={cat.href} passHref>
                        <Box py={3} cursor="pointer" _hover={{ opacity: 0.7 }}>
                          <Text
                            fontSize="12px"
                            fontFamily="mono"
                            letterSpacing="wider"
                            textTransform="uppercase"
                            color={p.muted}
                          >
                            {cat.label}
                          </Text>
                        </Box>
                      </Link>
                    ))}
                  </Box>
                )}
              </Box>

              {NAV_LINKS.filter((l) => !l.hasDropdown).map((link) => (
                <Link key={link.label} href={link.href} passHref>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py={4}
                    cursor="pointer"
                    borderBottom="1px solid"
                    borderColor={p.border}
                    _hover={{ opacity: 0.7 }}
                  >
                    <Text
                      fontSize="13px"
                      fontFamily="mono"
                      fontWeight="bold"
                      letterSpacing="widest"
                      textTransform="uppercase"
                      color={isActive(link.href) ? p.fg : p.muted}
                    >
                      {link.label}
                    </Text>
                    {isActive(link.href) && (
                      <Box w="6px" h="6px" borderRadius="full" bg={p.fg} />
                    )}
                  </Box>
                </Link>
              ))}
            </Box>

            <Box px={6} py={6} borderTop="1px solid" borderColor={p.border}>
              <HStack spacing={4}>
                <Link href="/login" passHref>
                  <Box
                    flex="1"
                    h="44px"
                    border="1px solid"
                    borderColor={p.border}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ borderColor: p.fg }}
                    transition="all 0.2s"
                  >
                    <Text
                      fontSize="10px"
                      fontFamily="mono"
                      fontWeight="bold"
                      letterSpacing="widest"
                      textTransform="uppercase"
                      color={p.fg}
                    >
                      Iniciar sesión
                    </Text>
                  </Box>
                </Link>
                <Link href="/cart" passHref>
                  <Box
                    flex="1"
                    h="44px"
                    bg={p.fg}
                    color={p.bg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    cursor="pointer"
                    _hover={{ opacity: 0.85 }}
                    transition="all 0.2s"
                  >
                    <Box as={CiShoppingCart} w="18px" h="18px" />
                    <Text
                      fontSize="10px"
                      fontFamily="mono"
                      fontWeight="bold"
                      letterSpacing="widest"
                      textTransform="uppercase"
                    >
                      Carrito {cartCount > 0 && `(${cartCount})`}
                    </Text>
                  </Box>
                </Link>
              </HStack>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NavBar;
