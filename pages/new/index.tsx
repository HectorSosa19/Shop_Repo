// Shared responsive filter + grid pattern for category pages (new.tsx, women.tsx, electronics.tsx, jewelery.tsx)
// This shows the new.tsx — replicate same pattern for others, just change endpoint + title

import FullModal from "@/components/full-modal";
import ContentModal, {
  ContentProps,
} from "@/components/full-modal/content-modal";
import MainLayout from "@/layout";
import { useTheme } from "@/context/ThemeContext";
import {
  Box,
  Text,
  HStack,
  Divider,
  Skeleton,
  SimpleGrid,
  VStack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { RiSlidersHLine } from "react-icons/ri";

const SORT_OPTIONS = [
  { label: "Relevancia", value: "default" },
  { label: "Menor precio", value: "price-asc" },
  { label: "Mayor precio", value: "price-desc" },
  { label: "Mejor rating", value: "rating-desc" },
];

// Reusable filter panel content
const FilterPanel = ({
  p,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  maxPrice,
  onlyInStock,
  setOnlyInStock,
  onClear,
}: any) => (
  <VStack align="flex-start" spacing={6} w="100%">
    <Box w="100%">
      <Text
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="wider"
        color={p.muted}
        mb={3}
      >
        Ordenar por
      </Text>
      <VStack align="flex-start" spacing={2}>
        {SORT_OPTIONS.map((opt) => (
          <HStack
            key={opt.value}
            cursor="pointer"
            onClick={() => setSortBy(opt.value)}
            spacing={2}
          >
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              border={`1.5px solid ${p.borderActive}`}
              bg={sortBy === opt.value ? p.fg : "transparent"}
              transition="background 0.15s"
              flexShrink={0}
            />
            <Text
              fontSize="sm"
              color={sortBy === opt.value ? p.fg : p.muted}
              fontWeight={sortBy === opt.value ? "bold" : "normal"}
              transition="color 0.15s"
            >
              {opt.label}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>

    <Divider borderColor={p.border} />

    <Box w="100%">
      <HStack justify="space-between" mb={3}>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="wider"
          color={p.muted}
        >
          Precio
        </Text>
        <Text fontSize="xs" color={p.fg} fontWeight="bold">
          ${priceRange[0]} – ${priceRange[1]}
        </Text>
      </HStack>
      <RangeSlider
        min={0}
        max={maxPrice}
        step={5}
        value={priceRange}
        onChange={(val) => setPriceRange(val as [number, number])}
      >
        <RangeSliderTrack bg={p.border} h="2px">
          <RangeSliderFilledTrack bg={p.fg} />
        </RangeSliderTrack>
        <RangeSliderThumb
          index={0}
          w="14px"
          h="14px"
          border={`2px solid ${p.borderActive}`}
          bg={p.bg}
          boxShadow="none"
          _focus={{ boxShadow: "none" }}
        />
        <RangeSliderThumb
          index={1}
          w="14px"
          h="14px"
          border={`2px solid ${p.borderActive}`}
          bg={p.bg}
          boxShadow="none"
          _focus={{ boxShadow: "none" }}
        />
      </RangeSlider>
    </Box>

    <Divider borderColor={p.border} />

    <Box w="100%">
      <Text
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="wider"
        color={p.muted}
        mb={3}
      >
        Disponibilidad
      </Text>
      <HStack
        cursor="pointer"
        spacing={2}
        onClick={() => setOnlyInStock(!onlyInStock)}
      >
        <Box
          w="14px"
          h="14px"
          border={`1.5px solid ${p.borderActive}`}
          borderRadius="2px"
          bg={onlyInStock ? p.fg : "transparent"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="background 0.15s"
          flexShrink={0}
        >
          {onlyInStock && (
            <Text fontSize="8px" color={p.bg} lineHeight="1">
              ✓
            </Text>
          )}
        </Box>
        <Text fontSize="sm" color={onlyInStock ? p.fg : p.muted}>
          Solo en stock
        </Text>
      </HStack>
    </Box>

    <Divider borderColor={p.border} />

    <Text
      fontSize="xs"
      color={p.muted}
      cursor="pointer"
      _hover={{ color: p.fg }}
      onClick={onClear}
      textTransform="uppercase"
      letterSpacing="wider"
    >
      Limpiar filtros
    </Text>
  </VStack>
);

const NewClothes = () => {
  const { palette: p } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState<ContentProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("default");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}products/category/men's clothing`)
      .then((resp) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const maxPrice = Math.ceil(Math.max(...data.map((d) => d.price ?? 0), 1000));

  const handleClear = () => {
    setPriceRange([0, maxPrice]);
    setSortBy("default");
    setOnlyInStock(false);
  };

  const filteredData = data
    .filter((item) => {
      const price = item.price ?? 0;
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .filter((item) => !onlyInStock || (item as any).stock > 0)
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.price ?? 0) - (b.price ?? 0);
      if (sortBy === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      if (sortBy === "rating-desc")
        return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
      return 0;
    });

  return (
    <>
      <Box minH="100vh" bg={p.bg} fontFamily="mono" transition="all 0.4s">
        <Box
          px={{ base: 4, md: 8, lg: 16 }}
          pt={{ base: 8, md: 14 }}
          pb={{ base: 4, md: 8 }}
        >
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="widest"
            color={p.muted}
            mb={2}
          >
            Colección
          </Text>
          <HStack justify="space-between" align="flex-end">
            <Text
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="extrabold"
              color={p.fg}
              fontFamily="mono"
              lineHeight="1"
            >
              Men's Clothing
            </Text>
            <HStack spacing={3}>
              <Text
                fontSize="sm"
                color={p.muted}
                fontFamily="mono"
                display={{ base: "none", sm: "block" }}
              >
                {filteredData.length} productos
              </Text>
              <Box
                display={{ base: "flex", lg: "none" }}
                alignItems="center"
                gap={2}
                border="1px solid"
                borderColor={p.border}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ borderColor: p.fg }}
                transition="all 0.2s"
                onClick={onOpen}
              >
                <Box as={RiSlidersHLine} w="14px" h="14px" color={p.fg} />
                <Text
                  fontSize="10px"
                  fontFamily="mono"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  color={p.fg}
                >
                  Filtros
                </Text>
              </Box>
            </HStack>
          </HStack>
          <Divider
            mt={{ base: 4, md: 6 }}
            borderColor={p.fg}
            borderWidth="1px"
          />
        </Box>

        <Box
          px={{ base: 4, md: 8, lg: 16 }}
          pb={20}
          display="flex"
          gap={10}
          alignItems="flex-start"
        >
          <Box
            w="220px"
            flexShrink={0}
            position="sticky"
            top="24px"
            display={{ base: "none", lg: "block" }}
          >
            <HStack justify="space-between" mb={4}>
              <Text
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing="widest"
                fontWeight="bold"
                color={p.fg}
              >
                Filtros
              </Text>
            </HStack>
            <Divider borderColor={p.fg} mb={5} />
            <FilterPanel
              p={p}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              onlyInStock={onlyInStock}
              setOnlyInStock={setOnlyInStock}
              onClear={handleClear}
            />
          </Box>

          <Box flex="1" minW={0}>
            {loading ? (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={0}>
                {Array(6)
                  .fill("")
                  .map((_, i) => (
                    <Box key={i} p={4}>
                      <Skeleton
                        h={{ base: "240px", md: "320px", lg: "400px" }}
                        borderRadius="none"
                        startColor={p.skeletonStart}
                        endColor={p.skeletonEnd}
                      />
                      <Skeleton
                        h="4"
                        mt={4}
                        w="70%"
                        startColor={p.skeletonStart}
                        endColor={p.skeletonEnd}
                      />
                      <Skeleton
                        h="4"
                        mt={2}
                        w="40%"
                        startColor={p.skeletonStart}
                        endColor={p.skeletonEnd}
                      />
                    </Box>
                  ))}
              </SimpleGrid>
            ) : filteredData.length === 0 ? (
              <Box py={20} textAlign="center">
                <Text
                  fontSize="sm"
                  color={p.muted}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  No hay productos con estos filtros
                </Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 2, sm: 2, lg: 3 }} spacing={0}>
                {filteredData.map((item) => (
                  <Box
                    key={item.title}
                    onClick={() => setSelectedItem(item)}
                    cursor="pointer"
                    position="relative"
                    borderBottom="1px solid"
                    borderRight="1px solid"
                    borderColor={p.border}
                    p={{ base: 3, md: 6 }}
                    transition="all 0.2s"
                    _hover={{
                      bg: p.cardBg,
                      "& .card-action": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    }}
                    role="group"
                  >
                    <Box
                      w="100%"
                      h={{
                        base: "160px",
                        sm: "220px",
                        md: "280px",
                        lg: "320px",
                      }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mb={3}
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
                          transition: "transform 0.4s ease",
                        }}
                        _groupHover={{ transform: "scale(1.05)" }}
                      />
                    </Box>
                    <VStack align="flex-start" spacing={1}>
                      <Text
                        fontSize={{ base: "9px", md: "xs" }}
                        color={p.muted}
                        textTransform="uppercase"
                        letterSpacing="wider"
                        noOfLines={1}
                      >
                        Men's Clothing
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="bold"
                        color={p.fg}
                        fontFamily="mono"
                        noOfLines={2}
                        lineHeight="1.4"
                      >
                        {item.title}
                      </Text>
                      <HStack justify="space-between" w="100%" pt={1}>
                        <Text
                          fontSize={{ base: "sm", md: "md" }}
                          fontWeight="extrabold"
                          color={p.fg}
                          fontFamily="mono"
                        >
                          USD {item.price?.toFixed(2)}
                        </Text>
                        {item.rating && (
                          <HStack spacing={1}>
                            <Text fontSize="xs" color="yellow.400">
                              ★
                            </Text>
                            <Text
                              fontSize="xs"
                              color={p.muted}
                              fontFamily="mono"
                              display={{ base: "none", sm: "block" }}
                            >
                              {item.rating.rate}
                            </Text>
                          </HStack>
                        )}
                      </HStack>
                    </VStack>
                    <Box
                      className="card-action"
                      position="absolute"
                      bottom={{ base: 2, md: 6 }}
                      right={{ base: 2, md: 6 }}
                      bg={p.fg}
                      color={p.bg}
                      fontSize={{ base: "8px", md: "10px" }}
                      fontFamily="mono"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      px={2}
                      py={1}
                      borderRadius="full"
                      opacity={0}
                      transform="translateY(4px)"
                      transition="all 0.2s"
                      pointerEvents="none"
                      display={{ base: "none", sm: "block" }}
                    >
                      Ver detalle →
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Box>
      </Box>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={p.bg} borderTopRadius="xl" maxH="80vh">
          <DrawerHeader borderBottomWidth="1px" borderColor={p.border} pb={4}>
            <HStack justify="space-between">
              <Text
                fontSize="xs"
                fontFamily="mono"
                textTransform="uppercase"
                letterSpacing="widest"
                fontWeight="bold"
                color={p.fg}
              >
                Filtros
              </Text>
              <DrawerCloseButton position="static" color={p.fg} />
            </HStack>
          </DrawerHeader>
          <DrawerBody py={6}>
            <FilterPanel
              p={p}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              onlyInStock={onlyInStock}
              setOnlyInStock={setOnlyInStock}
              onClear={() => {
                handleClear();
                onClose();
              }}
            />
            <Box
              mt={8}
              bg={p.fg}
              color={p.bg}
              h="48px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={onClose}
              _hover={{ opacity: 0.85 }}
            >
              <Text
                fontSize="10px"
                fontFamily="mono"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
              >
                Ver {filteredData.length} productos
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

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
            category="men's clothing"
          />
        </FullModal>
      )}
    </>
  );
};

NewClothes.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default NewClothes;
