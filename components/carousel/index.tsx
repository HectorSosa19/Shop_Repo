import React, { FC, useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTheme } from "@/context/ThemeContext";
import { keyframes } from "@emotion/react";
import Link from "next/link";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SLIDES = [
  {
    image: "/images/Tienda.jpeg",
    tag: "Nueva colección",
    title: "MYTHOLOGY",
    subtitle: "SS25",
    description: "Piezas únicas inspiradas en la mitología clásica",
    cta: "Ver colección",
    href: "/new",
  },
  {
    image: "/images/Tienda2.jpeg",
    tag: "Destacado",
    title: "PEACE\nFULNESS",
    subtitle: "SS25",
    description: "La calma como filosofía de vida",
    cta: "Ver top sellers",
    href: "/sale",
  },
  {
    image: "/images/Tienda3.jpeg",
    tag: "Colección completa",
    title: "IMPULSIVE",
    subtitle: "SS25",
    description: "Para los que actúan antes de pensar",
    cta: "Ver todo",
    href: "/products",
  },
];

export const Carousel: FC = () => {
  const { palette: p, dark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);
    const slideInterval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [current]);

  const goTo = (i: number) => {
    setCurrent(i);
    setAnimKey((k) => k + 1);
  };

  const slide = SLIDES[current];

  return (
    <Box
      w="100%"
      h="100vh"
      position="relative"
      overflow="hidden"
      bg="black"
      fontFamily="mono"
    >
      <Box
        key={`img-${animKey}`}
        position="absolute"
        inset={0}
        animation={`${fadeIn} 0.6s ease forwards`}
      >
        <Box
          as="img"
          src={slide.image}
          alt={slide.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            filter: "brightness(0.45)",
          }}
        />
      </Box>

      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-r, blackAlpha.900 0%, blackAlpha.600 40%, transparent 100%)"
      />

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="40%"
        bgGradient="linear(to-t, blackAlpha.900 0%, transparent 100%)"
      />

      <Box
        position="absolute"
        inset={0}
        display="flex"
        flexDir="column"
        justifyContent="center"
        px={{ base: 8, md: 20 }}
        maxW={{ base: "100%", md: "55%" }}
      >
        <Box
          key={`content-${animKey}`}
          animation={`${slideUp} 0.7s ease forwards`}
        >
          <Box display="flex" alignItems="center" gap={3} mb={6}>
            <Box w="24px" h="1px" bg="white" opacity={0.5} />
            <Text
              fontSize="9px"
              textTransform="uppercase"
              letterSpacing="widest"
              color="whiteAlpha.600"
            >
              {slide.tag}
            </Text>
            <Box w="24px" h="1px" bg="white" opacity={0.5} />
            <Text
              fontSize="9px"
              textTransform="uppercase"
              letterSpacing="widest"
              color="whiteAlpha.400"
            >
              {slide.subtitle}
            </Text>
          </Box>

          <Text
            fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
            fontWeight="extrabold"
            color="white"
            lineHeight="0.9"
            whiteSpace="pre-line"
            mb={5}
            letterSpacing="-2px"
          >
            {slide.title}
          </Text>

          <Box w="40px" h="1px" bg="white" opacity={0.3} mb={5} />

          <Text
            fontSize="sm"
            color="whiteAlpha.600"
            mb={10}
            maxW="320px"
            lineHeight="1.8"
            letterSpacing="wider"
          >
            {slide.description}
          </Text>

          <Link href={slide.href} passHref>
            <Box
              as="button"
              display="inline-flex"
              alignItems="center"
              gap={4}
              position="relative"
            >
              <Box
                bg="white"
                color="black"
                px={7}
                py={3}
                fontSize="10px"
                fontFamily="mono"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                transition="all 0.2s"
                _hover={{ bg: "whiteAlpha.800" }}
              >
                {slide.cta}
              </Box>
              <Box
                w="32px"
                h="1px"
                bg="white"
                opacity={0.4}
                transition="width 0.2s"
              />
              <Text fontSize="12px" color="white" opacity={0.6}>
                →
              </Text>
            </Box>
          </Link>
        </Box>
      </Box>

      <Box
        position="absolute"
        right={{ base: 6, md: 12 }}
        top="50%"
        transform="translateY(-50%)"
        display="flex"
        flexDir="column"
        alignItems="center"
        gap={6}
      >
        {SLIDES.map((_, i) => (
          <Box
            key={i}
            as="button"
            onClick={() => goTo(i)}
            display="flex"
            flexDir="column"
            alignItems="center"
            gap={1}
            cursor="pointer"
          >
            <Box
              w="1px"
              h={current === i ? "40px" : "16px"}
              bg="white"
              opacity={current === i ? 1 : 0.25}
              transition="all 0.4s"
            />
          </Box>
        ))}

        <Text
          fontSize="10px"
          color="whiteAlpha.400"
          letterSpacing="widest"
          fontFamily="mono"
          mt={2}
          style={{ writingMode: "vertical-rl" }}
        >
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </Text>
      </Box>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="2px"
        bg="whiteAlpha.100"
      >
        <Box
          h="100%"
          bg="white"
          w={`${progress}%`}
          transition="width 0.1s linear"
        />
      </Box>

      <Box
        position="absolute"
        bottom={10}
        left={{ base: 8, md: 20 }}
        display="flex"
        gap={3}
      >
        <Box
          as="button"
          onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
          w="36px"
          h="36px"
          border="1px solid"
          borderColor="whiteAlpha.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="whiteAlpha.600"
          transition="all 0.2s"
          _hover={{ borderColor: "white", color: "white" }}
        >
          <Text fontSize="14px" lineHeight="1">
            ←
          </Text>
        </Box>
        <Box
          as="button"
          onClick={() => goTo((current + 1) % SLIDES.length)}
          w="36px"
          h="36px"
          border="1px solid"
          borderColor="whiteAlpha.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="whiteAlpha.600"
          transition="all 0.2s"
          _hover={{ borderColor: "white", color: "white" }}
        >
          <Text fontSize="14px" lineHeight="1">
            →
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;
