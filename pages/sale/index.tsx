import MainLayout from "@/layout";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Box, Text, HStack, VStack, Divider, Skeleton } from "@chakra-ui/react";
import ContentModal, {
  ContentProps,
} from "@/components/full-modal/content-modal";
import FullModal from "@/components/full-modal";
import { useTheme } from "@/context/ThemeContext";

const MEDALS = ["🥇", "🥈", "🥉"];

const Sale = () => {
  const { palette: p } = useTheme();
  const [data, setData] = useState<ContentProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    axios
      .get(`${BASE_URL}products`)
      .then((resp) => {
        const sorted = [...resp.data].sort(
          (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0),
        );
        setData(sorted.slice(0, 10));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Box minH="100vh" bg={p.bg} fontFamily="mono" transition="all 0.4s">
        <Box
          px={{ base: 6, md: 16 }}
          pt={14}
          pb={10}
          position="relative"
          overflow="hidden"
        >
          <Text
            position="absolute"
            top="-10px"
            right={{ base: "10px", md: "60px" }}
            fontSize="200px"
            fontWeight="extrabold"
            color={p.cardBg}
            fontFamily="mono"
            lineHeight="1"
            userSelect="none"
            pointerEvents="none"
            zIndex={0}
          >
            #1
          </Text>

          <Box position="relative" zIndex={1}>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={2}
            >
              Ranking
            </Text>
            <Text
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="extrabold"
              color={p.fg}
              fontFamily="mono"
              lineHeight="1"
              mb={4}
            >
              Top Sellers
            </Text>
            <Text fontSize="sm" color={p.muted} maxW="400px" lineHeight="1.8">
              Los productos mejor valorados por nuestra comunidad. Ordenados por
              rating de mayor a menor.
            </Text>
          </Box>

          <Divider mt={8} borderColor={p.fg} borderWidth="1px" />
        </Box>

        <Box px={{ base: 6, md: 16 }} mb={2}>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="widest"
            color={p.muted}
            mb={6}
          >
            Podio
          </Text>

          {loading ? (
            <HStack spacing={4} align="flex-end">
              {[300, 380, 280].map((h, i) => (
                <Skeleton
                  key={i}
                  flex="1"
                  h={`${h}px`}
                  startColor={p.skeletonStart}
                  endColor={p.skeletonEnd}
                />
              ))}
            </HStack>
          ) : (
            <HStack spacing={4} align="flex-end" mb={2}>
              {data[1] && (
                <Box
                  flex="1"
                  cursor="pointer"
                  onClick={() => setSelectedItem(data[1])}
                  role="group"
                  position="relative"
                  _hover={{ "& .podio-overlay": { opacity: 1 } }}
                >
                  <Box
                    h="300px"
                    bg={p.cardBg}
                    border="1px solid"
                    borderColor={p.border}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={6}
                    overflow="hidden"
                    position="relative"
                  >
                    <Box
                      as="img"
                      src={data[1].image}
                      alt={data[1].title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transition: "transform 0.4s",
                      }}
                      _groupHover={{ transform: "scale(1.05)" }}
                    />
                    <Box
                      className="podio-overlay"
                      position="absolute"
                      inset={0}
                      bg="blackAlpha.700"
                      opacity={0}
                      transition="opacity 0.2s"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        fontSize="xs"
                        color="white"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Ver detalle →
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    bg={p.cardBg}
                    px={4}
                    py={3}
                    borderTop="1px solid"
                    borderColor={p.border}
                  >
                    <HStack justify="space-between">
                      <Text fontSize="lg">{MEDALS[1]}</Text>
                      <HStack spacing={1}>
                        <Text fontSize="xs" color="yellow.400">
                          ★
                        </Text>
                        <Text fontSize="xs" color={p.muted} fontFamily="mono">
                          {data[1].rating?.rate}
                        </Text>
                      </HStack>
                    </HStack>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color={p.fg}
                      noOfLines={2}
                      mt={1}
                      lineHeight="1.4"
                    >
                      {data[1].title}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="extrabold"
                      color={p.fg}
                      mt={1}
                    >
                      USD {data[1].price?.toFixed(2)}
                    </Text>
                  </Box>
                </Box>
              )}

              {data[0] && (
                <Box
                  flex="1"
                  cursor="pointer"
                  onClick={() => setSelectedItem(data[0])}
                  role="group"
                  position="relative"
                  _hover={{ "& .podio-overlay": { opacity: 1 } }}
                >
                  <Box
                    h="380px"
                    bg={p.fg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={6}
                    overflow="hidden"
                    position="relative"
                  >
                    <Box
                      as="img"
                      src={data[0].image}
                      alt={data[0].title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transition: "transform 0.4s",
                        filter: "brightness(0.95)",
                      }}
                      _groupHover={{ transform: "scale(1.05)" }}
                    />
                    <Box
                      className="podio-overlay"
                      position="absolute"
                      inset={0}
                      bg="blackAlpha.800"
                      opacity={0}
                      transition="opacity 0.2s"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        fontSize="xs"
                        color="white"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Ver detalle →
                      </Text>
                    </Box>
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      bg={p.bg}
                      px={2}
                      py={1}
                      borderRadius="sm"
                    >
                      <Text
                        fontSize="9px"
                        fontWeight="extrabold"
                        color={p.fg}
                        letterSpacing="wider"
                        textTransform="uppercase"
                      >
                        Best Seller
                      </Text>
                    </Box>
                  </Box>
                  <Box bg={p.fg} px={4} py={3}>
                    <HStack justify="space-between">
                      <Text fontSize="lg">{MEDALS[0]}</Text>
                      <HStack spacing={1}>
                        <Text fontSize="xs" color="yellow.400">
                          ★
                        </Text>
                        <Text fontSize="xs" color={p.bg} fontFamily="mono">
                          {data[0].rating?.rate}
                        </Text>
                      </HStack>
                    </HStack>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color={p.bg}
                      noOfLines={2}
                      mt={1}
                      lineHeight="1.4"
                    >
                      {data[0].title}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="extrabold"
                      color={p.bg}
                      mt={1}
                    >
                      USD {data[0].price?.toFixed(2)}
                    </Text>
                  </Box>
                </Box>
              )}

              {data[2] && (
                <Box
                  flex="1"
                  cursor="pointer"
                  onClick={() => setSelectedItem(data[2])}
                  role="group"
                  position="relative"
                  _hover={{ "& .podio-overlay": { opacity: 1 } }}
                >
                  <Box
                    h="280px"
                    bg={p.cardBg}
                    border="1px solid"
                    borderColor={p.border}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={6}
                    overflow="hidden"
                    position="relative"
                  >
                    <Box
                      as="img"
                      src={data[2].image}
                      alt={data[2].title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transition: "transform 0.4s",
                      }}
                      _groupHover={{ transform: "scale(1.05)" }}
                    />
                    <Box
                      className="podio-overlay"
                      position="absolute"
                      inset={0}
                      bg="blackAlpha.700"
                      opacity={0}
                      transition="opacity 0.2s"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        fontSize="xs"
                        color="white"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Ver detalle →
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    bg={p.cardBg}
                    px={4}
                    py={3}
                    borderTop="1px solid"
                    borderColor={p.border}
                  >
                    <HStack justify="space-between">
                      <Text fontSize="lg">{MEDALS[2]}</Text>
                      <HStack spacing={1}>
                        <Text fontSize="xs" color="yellow.400">
                          ★
                        </Text>
                        <Text fontSize="xs" color={p.muted} fontFamily="mono">
                          {data[2].rating?.rate}
                        </Text>
                      </HStack>
                    </HStack>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color={p.fg}
                      noOfLines={2}
                      mt={1}
                      lineHeight="1.4"
                    >
                      {data[2].title}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="extrabold"
                      color={p.fg}
                      mt={1}
                    >
                      USD {data[2].price?.toFixed(2)}
                    </Text>
                  </Box>
                </Box>
              )}
            </HStack>
          )}
        </Box>

        <Box px={{ base: 6, md: 16 }} pb={20} mt={10}>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="widest"
            color={p.muted}
            mb={4}
          >
            Ranking completo
          </Text>
          <Divider borderColor={p.fg} borderWidth="1px" mb={0} />

          {loading
            ? Array(7)
                .fill("")
                .map((_, i) => (
                  <Box
                    key={i}
                    py={5}
                    borderBottom="1px solid"
                    borderColor={p.border}
                  >
                    <HStack spacing={6}>
                      <Skeleton
                        w="40px"
                        h="4"
                        startColor={p.skeletonStart}
                        endColor={p.skeletonEnd}
                      />
                      <Skeleton
                        w="60px"
                        h="60px"
                        startColor={p.skeletonStart}
                        endColor={p.skeletonEnd}
                      />
                      <Box flex="1">
                        <Skeleton
                          h="3"
                          w="60%"
                          mb={2}
                          startColor={p.skeletonStart}
                          endColor={p.skeletonEnd}
                        />
                        <Skeleton
                          h="3"
                          w="30%"
                          startColor={p.skeletonStart}
                          endColor={p.skeletonEnd}
                        />
                      </Box>
                    </HStack>
                  </Box>
                ))
            : data.slice(3).map((item, index) => (
                <Box
                  key={item.title}
                  py={5}
                  borderBottom="1px solid"
                  borderColor={p.border}
                  cursor="pointer"
                  onClick={() => setSelectedItem(item)}
                  role="group"
                  transition="all 0.15s"
                  _hover={{ bg: p.cardBg, px: 3 }}
                >
                  <HStack spacing={6} align="center">
                    <Text
                      fontSize="xs"
                      fontWeight="extrabold"
                      color={p.muted}
                      fontFamily="mono"
                      w="28px"
                      textAlign="right"
                      flexShrink={0}
                    >
                      #{index + 4}
                    </Text>

                    <Box
                      w="60px"
                      h="60px"
                      bg={p.cardBg}
                      border="1px solid"
                      borderColor={p.border}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      p={1}
                      flexShrink={0}
                      overflow="hidden"
                    >
                      <Box
                        as="img"
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "transform 0.3s",
                        }}
                        _groupHover={{ transform: "scale(1.1)" }}
                      />
                    </Box>

                    <Box flex="1" minW={0}>
                      <Text
                        fontSize="xs"
                        color={p.muted}
                        textTransform="uppercase"
                        letterSpacing="wider"
                        mb={1}
                      >
                        {(item as any).category ?? "Producto"}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={p.fg}
                        fontFamily="mono"
                        noOfLines={1}
                      >
                        {item.title}
                      </Text>
                    </Box>

                    <HStack spacing={1} flexShrink={0}>
                      <Text fontSize="xs" color="yellow.400">
                        ★
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={p.fg}
                        fontFamily="mono"
                      >
                        {item.rating?.rate}
                      </Text>
                      <Text fontSize="xs" color={p.muted} fontFamily="mono">
                        ({item.rating?.count})
                      </Text>
                    </HStack>

                    <Text
                      fontSize="sm"
                      fontWeight="extrabold"
                      color={p.fg}
                      fontFamily="mono"
                      flexShrink={0}
                      w="90px"
                      textAlign="right"
                    >
                      USD {item.price?.toFixed(2)}
                    </Text>

                    <Text
                      fontSize="xs"
                      color={p.muted}
                      _groupHover={{ color: p.fg }}
                      transition="color 0.15s"
                      flexShrink={0}
                    >
                      →
                    </Text>
                  </HStack>
                </Box>
              ))}
        </Box>
      </Box>

      {selectedItem && (
        <FullModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        >
          <ContentModal
            image={selectedItem.image}
            title={selectedItem.title}
            price={selectedItem.price}
            description={selectedItem.description}
            rating={selectedItem.rating}
          />
        </FullModal>
      )}
    </>
  );
};

Sale.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Sale;
