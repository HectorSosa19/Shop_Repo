import {
  Box,
  Image,
  Text,
  Button,
  Divider,
  Badge,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";

export interface ContentProps {
  description?: string;
  price?: number;
  rating?: Rating;
  image?: string;
  title?: string;
  category?: string;
  stock?: number;
}

export interface Rating {
  rate: number;
  count: number;
}

const ContentModal: React.FC<ContentProps> = ({
  description,
  price,
  image,
  rating,
  title,
  category = "General",
  stock = 10,
}: ContentProps) => {
  const { palette: p, addToCart } = useTheme();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(rating?.rate ?? 0);
  const [hovered, setHovered] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const displayRating = hovered || userRating;
  const discount = 15;
  const originalPrice = price ? +(price * (1 + discount / 100)).toFixed(2) : 0;
  const thumbnails = [image, image, image, image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ title, price, image, description, rating, category, stock });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handlePay = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ title, price, image, description, rating, category, stock });
    }
    router.push("/cart");
  };

  return (
    <Box
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      minH="100vh"
      fontFamily="mono"
    >
      <Box
        w={{ base: "100%", md: "50%" }}
        position={{ base: "relative", md: "sticky" }}
        top={{ base: "unset", md: 0 }}
        h={{ base: "auto", md: "100vh" }}
        display="flex"
        flexDir="column"
        bg={p.cardBg}
        transition="background 0.4s"
        pt={{ base: 6, md: 0 }}
      >
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: 6, md: 10 }}
          h={{ base: "280px", sm: "340px", md: "auto" }}
        >
          <Image
            src={thumbnails[activeThumb]}
            w={{ base: "60%", md: "50%" }}
            h="100%"
            objectFit="contain"
            transition="opacity 0.3s ease"
          />
        </Box>

        <HStack
          spacing={{ base: 2, md: 3 }}
          px={{ base: 4, md: 8 }}
          pb={{ base: 4, md: 6 }}
          justify="center"
        >
          {thumbnails.map((thumb, i) => (
            <Box
              key={i}
              w={{ base: "52px", md: "70px" }}
              h={{ base: "52px", md: "70px" }}
              cursor="pointer"
              onClick={() => setActiveThumb(i)}
              border="2px solid"
              borderColor={activeThumb === i ? p.fg : "transparent"}
              borderRadius="md"
              overflow="hidden"
              opacity={activeThumb === i ? 1 : 0.45}
              transition="all 0.2s"
              _hover={{ opacity: 1 }}
              bg={p.bg}
              p={1}
            >
              <Image src={thumb} w="100%" h="100%" objectFit="contain" />
            </Box>
          ))}
        </HStack>
      </Box>

      <Box
        w={{ base: "100%", md: "50%" }}
        overflowY="auto"
        px={{ base: 4, sm: 6, md: 12 }}
        py={{ base: 6, md: 14 }}
        bg={p.bg}
        transition="background 0.4s"
      >
        <VStack align="flex-start" spacing={{ base: 4, md: 5 }}>
          <Badge
            bg={p.fg}
            color={p.bg}
            textTransform="uppercase"
            letterSpacing="widest"
            fontSize="0.65em"
            px={3}
            py={1}
            borderRadius="sm"
          >
            {category}
          </Badge>

          <Text
            fontFamily="mono"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
            fontWeight="bold"
            color={p.fg}
            lineHeight="1.2"
          >
            {title}
          </Text>

          <VStack align="flex-start" spacing={1}>
            <HStack spacing={1} flexWrap="wrap">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <Text
                    key={i}
                    fontSize={{ base: "18px", md: "22px" }}
                    lineHeight="1"
                    cursor="pointer"
                    color={i < displayRating ? "yellow.400" : p.border}
                    transition="color 0.15s, transform 0.1s"
                    transform={i < displayRating ? "scale(1.15)" : "scale(1)"}
                    onMouseEnter={() => setHovered(i + 1)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setUserRating(i + 1)}
                    userSelect="none"
                  >
                    ★
                  </Text>
                ))}
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color={p.muted}
                ml={2}
                fontFamily="mono"
              >
                {userRating}/5 ({rating?.count} reseñas)
              </Text>
            </HStack>
            {hovered > 0 && (
              <Text fontSize="xs" color={p.muted} fontFamily="mono">
                {
                  ["Malo", "Regular", "Bueno", "Muy bueno", "Excelente"][
                    hovered - 1
                  ]
                }
              </Text>
            )}
          </VStack>

          <Divider borderColor={p.border} />

          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontFamily="mono"
            color={p.muted}
            lineHeight="1.8"
            noOfLines={{ base: 4, md: undefined }}
          >
            {description}
          </Text>

          <Divider borderColor={p.border} />

          <HStack spacing={{ base: 2, md: 4 }} align="baseline" flexWrap="wrap">
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              color={p.fg}
              fontFamily="mono"
            >
              USD {price?.toFixed(2)}
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color={p.muted}
              textDecor="line-through"
              fontFamily="mono"
            >
              USD {originalPrice}
            </Text>
            <Badge
              bg={p.fg}
              color={p.bg}
              fontSize="0.7em"
              px={2}
              py={1}
              borderRadius="sm"
              fontFamily="mono"
            >
              -{discount}%
            </Badge>
          </HStack>

          <HStack>
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg={stock > 0 ? p.fg : p.muted}
            />
            <Text
              fontSize="xs"
              color={stock > 0 ? p.fg : p.muted}
              fontFamily="mono"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              {stock > 0 ? `${stock} unidades disponibles` : "Sin stock"}
            </Text>
          </HStack>

          <HStack spacing={3}>
            <Text
              fontSize="xs"
              fontFamily="mono"
              color={p.muted}
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Cantidad:
            </Text>
            <HStack
              border="1px solid"
              borderColor={p.fg}
              borderRadius="sm"
              overflow="hidden"
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                borderRadius={0}
                color={p.fg}
                _hover={{ bg: p.fg, color: p.bg }}
                transition="all 0.15s"
                h="32px"
                minW="32px"
                px={0}
              >
                −
              </Button>
              <Text
                px={4}
                fontWeight="bold"
                fontFamily="mono"
                minW="30px"
                textAlign="center"
                color={p.fg}
              >
                {quantity}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                borderRadius={0}
                color={p.fg}
                _hover={{ bg: p.fg, color: p.bg }}
                transition="all 0.15s"
                h="32px"
                minW="32px"
                px={0}
              >
                +
              </Button>
            </HStack>
          </HStack>

          <Flex
            w="100%"
            bg={p.cardBg}
            border="1px solid"
            borderColor={p.border}
            borderRadius="md"
            p={{ base: 3, md: 4 }}
            justify="space-between"
            align="center"
          >
            <VStack align="flex-start" spacing={0}>
              <Text
                fontSize="xs"
                color={p.muted}
                fontFamily="mono"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Total a pagar
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="extrabold"
                color={p.fg}
                fontFamily="mono"
              >
                USD {((price ?? 0) * quantity).toFixed(2)}
              </Text>
            </VStack>
            <Text fontSize="xs" color={p.muted} fontFamily="mono">
              {quantity} {quantity === 1 ? "artículo" : "artículos"}
            </Text>
          </Flex>

          <VStack w="100%" spacing={3}>
            <Button
              w="100%"
              size={{ base: "md", md: "lg" }}
              bg={p.fg}
              color={p.bg}
              borderRadius="sm"
              fontSize={{ base: "xs", md: "sm" }}
              fontFamily="mono"
              fontWeight="bold"
              letterSpacing="wider"
              py={{ base: 5, md: 6 }}
              onClick={handlePay}
              _hover={{
                opacity: 0.85,
                transform: "translateY(-1px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              IR AL CARRITO — USD {((price ?? 0) * quantity).toFixed(2)}
            </Button>

            <Button
              w="100%"
              size={{ base: "md", md: "lg" }}
              variant="outline"
              borderColor={p.fg}
              color={p.fg}
              borderRadius="sm"
              fontSize={{ base: "xs", md: "sm" }}
              fontFamily="mono"
              fontWeight="bold"
              letterSpacing="wider"
              py={{ base: 5, md: 6 }}
              onClick={handleAddToCart}
              isLoading={addedToCart}
              loadingText="¡Agregado! ✓"
              _hover={{ bg: p.fg, color: p.bg }}
              transition="all 0.2s"
            >
              AGREGAR AL CARRITO
            </Button>
          </VStack>

          <HStack
            spacing={{ base: 4, md: 8 }}
            pt={2}
            w="100%"
            justify="center"
            color={p.muted}
            fontFamily="mono"
            flexWrap="wrap"
          >
            {[].map(({ icon, label }) => (
              <VStack key={label} spacing={0}>
                <Text fontSize={{ base: "md", md: "lg" }}>{icon}</Text>
                <Text
                  fontSize="9px"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {label}
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ContentModal;
