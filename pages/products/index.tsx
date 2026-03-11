import MainLayout from "@/layout";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Divider,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import ContentModal, {
  ContentProps,
} from "@/components/full-modal/content-modal";
import FullModal from "@/components/full-modal";
import { useTheme } from "@/context/ThemeContext";

const SORT_OPTIONS = [
  { label: "Relevancia", value: "default" },
  { label: "Menor precio", value: "price-asc" },
  { label: "Mayor precio", value: "price-desc" },
  { label: "Mejor rating", value: "rating-desc" },
];

const CATEGORIES = [
  { label: "Todas", value: "all" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Electronics", value: "electronics" },
];

const ITEMS_PER_PAGE = 6;

export default function Products() {
  const { palette: p } = useTheme();
  const [data, setData] = useState<ContentProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    axios
      .get(`${BASE_URL}products`)
      .then((resp) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, priceRange, activeCategory, onlyInStock]);

  const maxPrice = Math.ceil(Math.max(...data.map((d) => d.price ?? 0), 1000));

  const filteredData = data
    .filter(
      (item) =>
        activeCategory === "all" || (item as any).category === activeCategory,
    )
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

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page number array with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
    return pages;
  };

  return (
    <>
      <Box minH="100vh" bg={p.bg} fontFamily="mono" transition="all 0.4s">
        <Box px={{ base: 6, md: 16 }} pt={14} pb={8}>
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="widest"
            color={p.muted}
            mb={2}
          >
            Catálogo
          </Text>
          <HStack justify="space-between" align="flex-end">
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="extrabold"
              color={p.fg}
              fontFamily="mono"
              lineHeight="1"
            >
              All Products
            </Text>
            <Text fontSize="sm" color={p.muted} fontFamily="mono">
              {filteredData.length} productos
            </Text>
          </HStack>
          <Divider mt={6} borderColor={p.fg} borderWidth="1px" />
        </Box>

        <Box
          px={{ base: 6, md: 16 }}
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
              <Text
                fontSize="xs"
                color={p.muted}
                cursor="pointer"
                _hover={{ color: p.fg }}
                onClick={() => {
                  setPriceRange([0, maxPrice]);
                  setSortBy("default");
                  setActiveCategory("all");
                  setOnlyInStock(false);
                }}
              >
                Limpiar
              </Text>
            </HStack>
            <Divider borderColor={p.fg} mb={5} />
            <VStack align="flex-start" spacing={6}>
              <Box w="100%">
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={p.muted}
                  mb={3}
                >
                  Categoría
                </Text>
                <VStack align="flex-start" spacing={2}>
                  {CATEGORIES.map((cat) => (
                    <HStack
                      key={cat.value}
                      cursor="pointer"
                      onClick={() => setActiveCategory(cat.value)}
                      spacing={2}
                    >
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        border={`1.5px solid ${p.borderActive}`}
                        bg={activeCategory === cat.value ? p.fg : "transparent"}
                        transition="background 0.15s"
                        flexShrink={0}
                      />
                      <Text
                        fontSize="sm"
                        color={activeCategory === cat.value ? p.fg : p.muted}
                        fontWeight={
                          activeCategory === cat.value ? "bold" : "normal"
                        }
                        transition="color 0.15s"
                      >
                        {cat.label}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
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
                <VStack spacing={2} align="flex-start">
                  <HStack w="100%" justify="space-between">
                    <Text fontSize="xs" color={p.muted}>
                      Min
                    </Text>
                    <Box
                      as="input"
                      type="number"
                      value={priceRange[0]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPriceRange([
                          Math.min(Number(e.target.value), priceRange[1]),
                          priceRange[1],
                        ])
                      }
                      w="80px"
                      border="1px solid"
                      borderColor={p.border}
                      borderRadius="sm"
                      px={2}
                      py={1}
                      fontSize="xs"
                      fontFamily="mono"
                      color={p.fg}
                      bg={p.bg}
                      _focus={{ outline: "none", borderColor: p.fg }}
                    />
                  </HStack>
                  <HStack w="100%" justify="space-between">
                    <Text fontSize="xs" color={p.muted}>
                      Max
                    </Text>
                    <Box
                      as="input"
                      type="number"
                      value={priceRange[1]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPriceRange([
                          priceRange[0],
                          Math.max(Number(e.target.value), priceRange[0]),
                        ])
                      }
                      w="80px"
                      border="1px solid"
                      borderColor={p.border}
                      borderRadius="sm"
                      px={2}
                      py={1}
                      fontSize="xs"
                      fontFamily="mono"
                      color={p.fg}
                      bg={p.bg}
                      _focus={{ outline: "none", borderColor: p.fg }}
                    />
                  </HStack>
                </VStack>
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
            </VStack>
          </Box>

          <Box flex="1">
            {loading ? (
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
                spacing={0}
              >
                {Array(6)
                  .fill("")
                  .map((_, i) => (
                    <Box key={i} p={4}>
                      <Skeleton
                        h="400px"
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
              <>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
                  spacing={0}
                >
                  {paginatedData.map((item) => (
                    <Box
                      key={item.title}
                      onClick={() => setSelectedItem(item)}
                      cursor="pointer"
                      position="relative"
                      borderBottom="1px solid"
                      borderRight="1px solid"
                      borderColor={p.border}
                      p={6}
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
                        h="320px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mb={4}
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
                          fontSize="xs"
                          color={p.muted}
                          textTransform="uppercase"
                          letterSpacing="wider"
                          noOfLines={1}
                        >
                          {(item as any).category ?? "Producto"}
                        </Text>
                        <Text
                          fontSize="sm"
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
                            fontSize="md"
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
                        bottom={6}
                        right={6}
                        bg={p.fg}
                        color={p.bg}
                        fontSize="10px"
                        fontFamily="mono"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        px={3}
                        py={1}
                        borderRadius="full"
                        opacity={0}
                        transform="translateY(4px)"
                        transition="all 0.2s"
                        pointerEvents="none"
                      >
                        Ver detalle →
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>

                {totalPages > 1 && (
                  <Box mt={12}>
                    <Divider borderColor={p.border} mb={8} />
                    <HStack justify="space-between" align="center">
                      <Text fontSize="xs" color={p.muted} fontFamily="mono">
                        {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                        {Math.min(
                          currentPage * ITEMS_PER_PAGE,
                          filteredData.length,
                        )}{" "}
                        de {filteredData.length}
                      </Text>

                      <HStack spacing={1}>
                        <Box
                          as="button"
                          onClick={() =>
                            currentPage > 1 && goToPage(currentPage - 1)
                          }
                          w="36px"
                          h="36px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="1px solid"
                          borderColor={p.border}
                          color={currentPage === 1 ? p.muted : p.fg}
                          cursor={currentPage === 1 ? "not-allowed" : "pointer"}
                          opacity={currentPage === 1 ? 0.3 : 1}
                          transition="all 0.15s"
                          _hover={currentPage > 1 ? { borderColor: p.fg } : {}}
                          fontSize="14px"
                        >
                          ←
                        </Box>

                        {getPageNumbers().map((page, i) =>
                          page === "..." ? (
                            <Box
                              key={`ellipsis-${i}`}
                              w="36px"
                              h="36px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              color={p.muted}
                              fontSize="xs"
                            >
                              ···
                            </Box>
                          ) : (
                            <Box
                              key={page}
                              as="button"
                              onClick={() => goToPage(page as number)}
                              w="36px"
                              h="36px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              border="1px solid"
                              borderColor={
                                currentPage === page ? p.fg : p.border
                              }
                              bg={currentPage === page ? p.fg : "transparent"}
                              color={currentPage === page ? p.bg : p.muted}
                              fontSize="xs"
                              fontFamily="mono"
                              fontWeight={
                                currentPage === page ? "bold" : "normal"
                              }
                              cursor="pointer"
                              transition="all 0.15s"
                              _hover={
                                currentPage !== page
                                  ? { borderColor: p.fg, color: p.fg }
                                  : {}
                              }
                            >
                              {page}
                            </Box>
                          ),
                        )}

                        <Box
                          as="button"
                          onClick={() =>
                            currentPage < totalPages &&
                            goToPage(currentPage + 1)
                          }
                          w="36px"
                          h="36px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="1px solid"
                          borderColor={p.border}
                          color={currentPage === totalPages ? p.muted : p.fg}
                          cursor={
                            currentPage === totalPages
                              ? "not-allowed"
                              : "pointer"
                          }
                          opacity={currentPage === totalPages ? 0.3 : 1}
                          transition="all 0.15s"
                          _hover={
                            currentPage < totalPages
                              ? { borderColor: p.fg }
                              : {}
                          }
                          fontSize="14px"
                        >
                          →
                        </Box>
                      </HStack>

                      <HStack spacing={2}>
                        <Text fontSize="xs" color={p.muted}>
                          Ir a
                        </Text>
                        <Box
                          as="input"
                          type="number"
                          min={1}
                          max={totalPages}
                          defaultValue={currentPage}
                          key={currentPage}
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>,
                          ) => {
                            if (e.key === "Enter") {
                              const val = Number(
                                (e.target as HTMLInputElement).value,
                              );
                              if (val >= 1 && val <= totalPages) goToPage(val);
                            }
                          }}
                          w="48px"
                          h="36px"
                          border="1px solid"
                          borderColor={p.border}
                          bg={p.bg}
                          color={p.fg}
                          fontSize="xs"
                          fontFamily="mono"
                          textAlign="center"
                          borderRadius="sm"
                          _focus={{ outline: "none", borderColor: p.fg }}
                        />
                      </HStack>
                    </HStack>
                  </Box>
                )}
              </>
            )}
          </Box>
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
            category={(selectedItem as any).category}
          />
        </FullModal>
      )}
    </>
  );
}

Products.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout children={page} />;
};
