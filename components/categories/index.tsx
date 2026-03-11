import React, { useEffect, useState } from "react";
import { Box, Text, Skeleton, SimpleGrid } from "@chakra-ui/react";
import { useTheme } from "@/context/ThemeContext";
import styles from "@/components/navbar/navbar.module.css";
import axios from "axios";
import Link from "next/link";

const CATEGORY_META: Record<
  string,
  { icon: string; href: string; description: string }
> = {
  "men's clothing": {
    icon: "",
    href: "/new",
    description: "Esenciales y piezas únicas para el hombre moderno",
  },
  "women's clothing": {
    icon: "",
    href: "/women",
    description: "Diseños exclusivos para cada ocasión",
  },
  jewelery: {
    icon: "",
    href: "/jewelery",
    description: "Accesorios que elevan cualquier look",
  },
  electronics: {
    icon: "",
    href: "/electronics",
    description: "Tecnología de última generación",
  },
};

export const Categories = () => {
  const { palette: p } = useTheme();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}products/categories`)
      .then((resp: any) => {
        setCategories(resp.data);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      bg={p.bg}
      py={20}
      px={{ base: 6, md: 16 }}
      fontFamily="mono"
      transition="all 0.4s"
    >
      <Box mb={12}>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="widest"
          color={p.muted}
          mb={2}
        >
          Explora
        </Text>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Text
            className={styles.title}
            fontSize={{ base: "3xl", md: "5xl" }}
            color={p.fg}
            lineHeight="1"
            transition="color 0.4s"
          >
            Categorías
          </Text>
          <Text fontSize="sm" color={p.muted}>
            {categories.length} categorías
          </Text>
        </Box>
        <Box w="100%" h="1px" bg={p.fg} mt={6} />
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={0}>
        {loading
          ? Array(4)
              .fill("")
              .map((_, i) => (
                <Box key={i} border="1px solid" borderColor={p.border} p={8}>
                  <Skeleton
                    h="40px"
                    w="40px"
                    mb={6}
                    startColor={p.skeletonStart}
                    endColor={p.skeletonEnd}
                    borderRadius="full"
                  />
                  <Skeleton
                    h="4"
                    w="60%"
                    mb={3}
                    startColor={p.skeletonStart}
                    endColor={p.skeletonEnd}
                  />
                  <Skeleton
                    h="3"
                    w="80%"
                    startColor={p.skeletonStart}
                    endColor={p.skeletonEnd}
                  />
                </Box>
              ))
          : categories.map((cat, i) => {
              const meta = CATEGORY_META[cat] ?? {
                icon: "🛍️",
                href: "/products",
                description: "Explora esta categoría",
              };
              return (
                <Link key={cat} href={meta.href} passHref>
                  <Box
                    borderLeft="1px solid"
                    borderTop="1px solid"
                    borderBottom="1px solid"
                    borderRight={
                      i === categories.length - 1 ? "1px solid" : "none"
                    }
                    borderColor={p.border}
                    p={8}
                    cursor="pointer"
                    position="relative"
                    overflow="hidden"
                    role="group"
                    transition="all 0.3s"
                    _hover={{ bg: p.cardBg }}
                  >
                    <Text
                      position="absolute"
                      top={4}
                      right={5}
                      fontSize="60px"
                      fontWeight="extrabold"
                      color={p.border}
                      lineHeight="1"
                      userSelect="none"
                      transition="all 0.3s"
                      _groupHover={{ color: p.muted, transform: "scale(1.1)" }}
                    >
                      0{i + 1}
                    </Text>

                    <Text fontSize="32px" mb={8} lineHeight="1">
                      {meta.icon}
                    </Text>

                    <Text
                      fontSize="xs"
                      textTransform="uppercase"
                      letterSpacing="widest"
                      color={p.muted}
                      mb={2}
                    >
                      Categoría
                    </Text>
                    <Text
                      fontSize="lg"
                      fontWeight="extrabold"
                      color={p.fg}
                      textTransform="capitalize"
                      lineHeight="1.2"
                      mb={4}
                      transition="color 0.3s"
                    >
                      {cat}
                    </Text>

                    <Text
                      fontSize="xs"
                      color={p.muted}
                      lineHeight="1.8"
                      mb={8}
                      maxW="200px"
                    >
                      {meta.description}
                    </Text>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={3}
                      transition="all 0.2s"
                      _groupHover={{ gap: "16px" }}
                    >
                      <Text
                        fontSize="10px"
                        textTransform="uppercase"
                        letterSpacing="widest"
                        color={p.fg}
                        fontWeight="bold"
                      >
                        Ver productos
                      </Text>
                      <Box
                        w="20px"
                        h="1px"
                        bg={p.fg}
                        transition="width 0.3s"
                        _groupHover={{ w: "32px" }}
                      />
                      <Text fontSize="12px" color={p.fg}>
                        →
                      </Text>
                    </Box>
                  </Box>
                </Link>
              );
            })}
      </SimpleGrid>
    </Box>
  );
};

export default Categories;
