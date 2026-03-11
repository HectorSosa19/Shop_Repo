import MainLayout from "@/layout";
import {
  Box,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
  Input,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

const STEPS = [
  { id: 1, label: "Carrito" },
  { id: 2, label: "Pago" },
  { id: 3, label: "Confirmación" },
];

const Cart = () => {
  const {
    palette: p,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useTheme();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    email: "",
    address: "",
  });

  const formatCardNumber = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + "/" + clean.slice(2);
    return clean;
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2200);
  };

  const inputProps = {
    fontFamily: "mono",
    fontSize: "sm",
    bg: "transparent",
    border: "1px solid",
    borderColor: p.border,
    color: p.fg,
    borderRadius: "sm",
    h: "48px",
    px: 4,
    _placeholder: { color: p.muted },
    _focus: { borderColor: p.fg, boxShadow: "none" },
    _hover: { borderColor: p.fg },
    transition: "all 0.2s",
  };

  return (
    <Box minH="100vh" bg={p.bg} fontFamily="mono" transition="all 0.4s">
      <Box
        px={{ base: 4, md: 8, lg: 16 }}
        pt={{ base: 8, md: 14 }}
        pb={{ base: 4, md: 8 }}
      >
        <HStack justify="space-between" align="flex-end" mb={6}>
          <Box>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={2}
            >
              {step === 1
                ? "Tu selección"
                : step === 2
                  ? "Datos de pago"
                  : "Pedido completado"}
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="extrabold"
              color={p.fg}
              lineHeight="1"
              fontFamily="mono"
            >
              {step === 1 ? "Carrito" : step === 2 ? "Checkout" : "¡Listo!"}
            </Text>
          </Box>
          {step === 1 && cart.length > 0 && (
            <Text
              fontSize="xs"
              color={p.muted}
              cursor="pointer"
              textTransform="uppercase"
              letterSpacing="widest"
              _hover={{ color: p.fg }}
              transition="color 0.2s"
              onClick={clearCart}
            >
              Vaciar
            </Text>
          )}
        </HStack>

        <HStack spacing={0} mb={6}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <HStack
                spacing={{ base: 1, md: 2 }}
                cursor={s.id < step ? "pointer" : "default"}
                onClick={() => s.id < step && setStep(s.id)}
              >
                <Box
                  w={{ base: "22px", md: "28px" }}
                  h={{ base: "22px", md: "28px" }}
                  borderRadius="full"
                  border="1.5px solid"
                  borderColor={step >= s.id ? p.fg : p.border}
                  bg={step > s.id ? p.fg : "transparent"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s"
                  flexShrink={0}
                >
                  {step > s.id ? (
                    <Text fontSize="9px" color={p.bg} fontWeight="bold">
                      ✓
                    </Text>
                  ) : (
                    <Text
                      fontSize="9px"
                      color={step === s.id ? p.fg : p.muted}
                      fontWeight="bold"
                    >
                      {s.id}
                    </Text>
                  )}
                </Box>
                <Text
                  fontSize={{ base: "8px", md: "10px" }}
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color={step >= s.id ? p.fg : p.muted}
                  fontWeight={step === s.id ? "bold" : "normal"}
                  transition="color 0.3s"
                  display={{
                    base: step === s.id ? "block" : "none",
                    sm: "block",
                  }}
                >
                  {s.label}
                </Text>
              </HStack>
              {i < STEPS.length - 1 && (
                <Box
                  flex="1"
                  h="1px"
                  bg={step > s.id ? p.fg : p.border}
                  mx={{ base: 1, md: 3 }}
                  transition="background 0.3s"
                />
              )}
            </React.Fragment>
          ))}
        </HStack>
        <Divider borderColor={p.fg} borderWidth="1px" />
      </Box>

      {step === 1 && (
        <>
          {cart.length === 0 ? (
            <Box
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              py={{ base: 16, md: 32 }}
              gap={6}
              px={6}
              textAlign="center"
            >
              <Text
                fontSize={{ base: "60px", md: "80px" }}
                lineHeight="1"
                userSelect="none"
              >
                🛒
              </Text>
              <Box>
                <Text fontSize="xl" fontWeight="extrabold" color={p.fg} mb={2}>
                  Tu carrito está vacío
                </Text>
                <Text
                  fontSize="sm"
                  color={p.muted}
                  maxW="300px"
                  lineHeight="1.8"
                >
                  Explora nuestros productos y agrega algo que te guste
                </Text>
              </Box>
              <Link href="/products" passHref>
                <Box
                  as="button"
                  mt={4}
                  bg={p.fg}
                  color={p.bg}
                  px={8}
                  py={3}
                  fontSize="xs"
                  fontFamily="mono"
                  fontWeight="bold"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  borderRadius="sm"
                  transition="all 0.2s"
                  _hover={{ opacity: 0.85, transform: "translateY(-1px)" }}
                >
                  Ver productos →
                </Box>
              </Link>
            </Box>
          ) : (
            <Box
              px={{ base: 4, md: 8, lg: 16 }}
              pb={20}
              display="flex"
              gap={{ base: 0, lg: 12 }}
              alignItems="flex-start"
              flexDir={{ base: "column", lg: "row" }}
            >
              <Box flex="1" w="100%">
                {cart.map((item) => (
                  <Box key={item.title}>
                    <Box
                      py={{ base: 4, md: 6 }}
                      display="flex"
                      gap={{ base: 3, md: 6 }}
                      alignItems="center"
                      role="group"
                      transition="all 0.2s"
                      _hover={{ bg: p.cardBg, px: 3, mx: -3 }}
                    >
                      <Box
                        w={{ base: "64px", md: "90px" }}
                        h={{ base: "64px", md: "90px" }}
                        flexShrink={0}
                        bg={p.cardBg}
                        border="1px solid"
                        borderColor={p.border}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={2}
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
                          _groupHover={{ transform: "scale(1.05)" }}
                        />
                      </Box>
                      <Box flex="1" minW={0}>
                        <Text
                          fontSize={{ base: "9px", md: "xs" }}
                          color={p.muted}
                          textTransform="uppercase"
                          letterSpacing="wider"
                          mb={1}
                        >
                          {(item as any).category ?? "Producto"}
                        </Text>
                        <Text
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="bold"
                          color={p.fg}
                          noOfLines={2}
                          lineHeight="1.4"
                          mb={1}
                        >
                          {item.title}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={p.muted}
                          display={{ base: "none", sm: "block" }}
                        >
                          USD {item.price?.toFixed(2)} / unidad
                        </Text>
                      </Box>
                      <HStack
                        border="1px solid"
                        borderColor={p.border}
                        borderRadius="sm"
                        overflow="hidden"
                        flexShrink={0}
                      >
                        <Box
                          as="button"
                          px={{ base: 2, md: 3 }}
                          py={2}
                          fontSize="sm"
                          color={p.fg}
                          transition="all 0.15s"
                          _hover={{ bg: p.fg, color: p.bg }}
                          onClick={() =>
                            updateQuantity(item.title!, item.quantity - 1)
                          }
                        >
                          −
                        </Box>
                        <Text
                          px={{ base: 2, md: 4 }}
                          fontSize="sm"
                          fontWeight="bold"
                          color={p.fg}
                          minW="24px"
                          textAlign="center"
                        >
                          {item.quantity}
                        </Text>
                        <Box
                          as="button"
                          px={{ base: 2, md: 3 }}
                          py={2}
                          fontSize="sm"
                          color={p.fg}
                          transition="all 0.15s"
                          _hover={{ bg: p.fg, color: p.bg }}
                          onClick={() =>
                            updateQuantity(item.title!, item.quantity + 1)
                          }
                        >
                          +
                        </Box>
                      </HStack>
                      <Text
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="extrabold"
                        color={p.fg}
                        fontFamily="mono"
                        w={{ base: "70px", md: "100px" }}
                        textAlign="right"
                        flexShrink={0}
                      >
                        USD {((item.price ?? 0) * item.quantity).toFixed(2)}
                      </Text>
                      <Text
                        fontSize="xs"
                        color={p.muted}
                        cursor="pointer"
                        _hover={{ color: p.fg }}
                        transition="color 0.2s"
                        flexShrink={0}
                        ml={1}
                        onClick={() => removeFromCart(item.title!)}
                      >
                        ✕
                      </Text>
                    </Box>
                    <Divider borderColor={p.border} />
                  </Box>
                ))}
              </Box>

              <Box
                w={{ base: "100%", lg: "340px" }}
                flexShrink={0}
                position={{ base: "static", lg: "sticky" }}
                top="100px"
                border="1px solid"
                borderColor={p.border}
                p={{ base: 5, md: 8 }}
                mt={{ base: 8, lg: 0 }}
              >
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color={p.muted}
                  mb={6}
                  fontWeight="bold"
                >
                  Resumen del pedido
                </Text>
                <VStack align="stretch" spacing={4} mb={6}>
                  {cart.map((item) => (
                    <HStack key={item.title} justify="space-between">
                      <Text
                        fontSize="xs"
                        color={p.muted}
                        noOfLines={1}
                        flex="1"
                        mr={4}
                      >
                        {item.title} × {item.quantity}
                      </Text>
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        color={p.fg}
                        flexShrink={0}
                      >
                        USD {((item.price ?? 0) * item.quantity).toFixed(2)}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
                <Divider borderColor={p.border} mb={6} />
                <HStack justify="space-between" mb={2}>
                  <Text
                    fontSize="xs"
                    color={p.muted}
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Subtotal
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color={p.fg}>
                    USD {cartTotal.toFixed(2)}
                  </Text>
                </HStack>
                <HStack justify="space-between" mb={6}>
                  <Text
                    fontSize="xs"
                    color={p.muted}
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Envío
                  </Text>
                  <Text
                    fontSize="xs"
                    color="green.400"
                    fontWeight="bold"
                    letterSpacing="wider"
                  >
                    GRATIS
                  </Text>
                </HStack>
                <Divider borderColor={p.border} mb={6} />
                <HStack justify="space-between" mb={8}>
                  <Text
                    fontSize="sm"
                    fontWeight="extrabold"
                    color={p.fg}
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Total
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="extrabold"
                    color={p.fg}
                    fontFamily="mono"
                  >
                    USD {cartTotal.toFixed(2)}
                  </Text>
                </HStack>
                <Button
                  bg={p.fg}
                  color={p.bg}
                  borderRadius="sm"
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  h="52px"
                  w="100%"
                  transition="all 0.2s"
                  mb={3}
                  _hover={{ opacity: 0.85, transform: "translateY(-1px)" }}
                  onClick={() => setStep(2)}
                >
                  Proceder al pago →
                </Button>
                <Link href="/products" passHref>
                  <Button
                    bg="transparent"
                    color={p.fg}
                    border="1px solid"
                    borderColor={p.border}
                    borderRadius="sm"
                    fontFamily="mono"
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    h="52px"
                    w="100%"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: p.fg,
                      transform: "translateY(-1px)",
                    }}
                  >
                    Seguir comprando
                  </Button>
                </Link>
              </Box>
            </Box>
          )}
        </>
      )}

      {step === 2 && (
        <Box
          px={{ base: 4, md: 8, lg: 16 }}
          pb={20}
          display="flex"
          gap={12}
          alignItems="flex-start"
          flexDir={{ base: "column", lg: "row" }}
        >
          <Box flex="1" maxW={{ base: "100%", lg: "560px" }}>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={5}
              fontWeight="bold"
            >
              Datos de contacto
            </Text>
            <VStack spacing={4} mb={10}>
              {[
                {
                  label: "Nombre completo",
                  key: "name",
                  placeholder: "John Doe",
                  type: "text",
                },
                {
                  label: "Correo electrónico",
                  key: "email",
                  placeholder: "john@email.com",
                  type: "email",
                },
                {
                  label: "Dirección de envío",
                  key: "address",
                  placeholder: "Calle, ciudad, país",
                  type: "text",
                },
              ].map(({ label, key, placeholder, type }) => (
                <Box key={key} w="100%">
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color={p.muted}
                    mb={2}
                  >
                    {label}
                  </Text>
                  <Input
                    {...inputProps}
                    type={type}
                    placeholder={placeholder}
                    value={(cardData as any)[key]}
                    onChange={(e) =>
                      setCardData({ ...cardData, [key]: e.target.value })
                    }
                  />
                </Box>
              ))}
            </VStack>

            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={5}
              fontWeight="bold"
            >
              Datos de tarjeta
            </Text>

            <Box
              w="100%"
              h={{ base: "150px", md: "180px" }}
              borderRadius="12px"
              bg={p.fg}
              position="relative"
              overflow="hidden"
              mb={6}
              p={{ base: 5, md: 6 }}
            >
              <Box
                position="absolute"
                top="-30px"
                right="-30px"
                w="160px"
                h="160px"
                borderRadius="full"
                bg="whiteAlpha.100"
              />
              <Box
                position="absolute"
                bottom="-40px"
                right="40px"
                w="120px"
                h="120px"
                borderRadius="full"
                bg="whiteAlpha.50"
              />
              <Text
                fontSize={{ base: "9px", md: "xs" }}
                color={p.bg}
                opacity={0.5}
                letterSpacing="widest"
                textTransform="uppercase"
                mb={{ base: 6, md: 8 }}
              >
                Ellie-Jane Card
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                color={p.bg}
                letterSpacing="4px"
                mb={4}
                fontFamily="mono"
              >
                {cardData.number || "•••• •••• •••• ••••"}
              </Text>
              <HStack justify="space-between">
                <Box>
                  <Text
                    fontSize="8px"
                    color={p.bg}
                    opacity={0.5}
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    Titular
                  </Text>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color={p.bg}
                    fontWeight="bold"
                    letterSpacing="wider"
                  >
                    {cardData.name || "NOMBRE APELLIDO"}
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text
                    fontSize="8px"
                    color={p.bg}
                    opacity={0.5}
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    Vence
                  </Text>
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color={p.bg}
                    fontWeight="bold"
                    letterSpacing="wider"
                  >
                    {cardData.expiry || "MM/AA"}
                  </Text>
                </Box>
              </HStack>
            </Box>

            <VStack spacing={4}>
              <Box w="100%">
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color={p.muted}
                  mb={2}
                >
                  Número de tarjeta
                </Text>
                <Input
                  {...inputProps}
                  value={cardData.number}
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      number: formatCardNumber(e.target.value),
                    })
                  }
                />
              </Box>
              <HStack w="100%" spacing={4}>
                <Box flex="1">
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color={p.muted}
                    mb={2}
                  >
                    Vencimiento
                  </Text>
                  <Input
                    {...inputProps}
                    value={cardData.expiry}
                    placeholder="MM/AA"
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        expiry: formatExpiry(e.target.value),
                      })
                    }
                  />
                </Box>
                <Box flex="1">
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color={p.muted}
                    mb={2}
                  >
                    CVV
                  </Text>
                  <Input
                    {...inputProps}
                    value={cardData.cvv}
                    placeholder="•••"
                    type="password"
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                  />
                </Box>
              </HStack>
            </VStack>
          </Box>

          <Box
            w={{ base: "100%", lg: "340px" }}
            flexShrink={0}
            position={{ base: "static", lg: "sticky" }}
            top="100px"
            border="1px solid"
            borderColor={p.border}
            p={{ base: 5, md: 8 }}
            mt={{ base: 8, lg: 0 }}
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={6}
              fontWeight="bold"
            >
              Resumen
            </Text>
            <VStack align="stretch" spacing={3} mb={6}>
              {cart.map((item) => (
                <HStack key={item.title} justify="space-between">
                  <Text
                    fontSize="xs"
                    color={p.muted}
                    noOfLines={1}
                    flex="1"
                    mr={4}
                  >
                    {item.title} × {item.quantity}
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color={p.fg}
                    flexShrink={0}
                  >
                    USD {((item.price ?? 0) * item.quantity).toFixed(2)}
                  </Text>
                </HStack>
              ))}
            </VStack>
            <Divider borderColor={p.border} mb={4} />
            <HStack justify="space-between" mb={2}>
              <Text
                fontSize="xs"
                color={p.muted}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Subtotal
              </Text>
              <Text fontSize="sm" fontWeight="bold" color={p.fg}>
                USD {cartTotal.toFixed(2)}
              </Text>
            </HStack>
            <HStack justify="space-between" mb={6}>
              <Text
                fontSize="xs"
                color={p.muted}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Envío
              </Text>
              <Text fontSize="xs" color="green.400" fontWeight="bold">
                GRATIS
              </Text>
            </HStack>
            <Divider borderColor={p.border} mb={6} />
            <HStack justify="space-between" mb={8}>
              <Text
                fontSize="sm"
                fontWeight="extrabold"
                color={p.fg}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Total
              </Text>
              <Text
                fontSize="2xl"
                fontWeight="extrabold"
                color={p.fg}
                fontFamily="mono"
              >
                USD {cartTotal.toFixed(2)}
              </Text>
            </HStack>
            <Button
              bg={p.fg}
              color={p.bg}
              borderRadius="sm"
              fontFamily="mono"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              textTransform="uppercase"
              h="52px"
              w="100%"
              mb={3}
              isLoading={isProcessing}
              loadingText="Procesando..."
              transition="all 0.2s"
              _hover={{ opacity: 0.85 }}
              onClick={handleConfirm}
            >
              Confirmar — USD {cartTotal.toFixed(2)}
            </Button>
            <Button
              bg="transparent"
              color={p.fg}
              border="1px solid"
              borderColor={p.border}
              borderRadius="sm"
              fontFamily="mono"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              textTransform="uppercase"
              h="52px"
              w="100%"
              transition="all 0.2s"
              _hover={{ borderColor: p.fg }}
              onClick={() => setStep(1)}
            >
              ← Volver al carrito
            </Button>
            <HStack spacing={6} pt={6} justify="center" color={p.muted}>
              {["🔒 SSL", "💳 Visa", "💳 MC"].map((t) => (
                <Text key={t} fontSize="10px" letterSpacing="wider">
                  {t}
                </Text>
              ))}
            </HStack>
          </Box>
        </Box>
      )}

      {step === 3 && (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          py={{ base: 16, md: 24 }}
          px={6}
          textAlign="center"
          gap={6}
        >
          <Box
            w="80px"
            h="80px"
            borderRadius="full"
            border="2px solid"
            borderColor={p.fg}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="32px" lineHeight="1">
              ✓
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={3}
            >
              Pedido confirmado
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              color={p.fg}
              lineHeight="1"
              mb={4}
            >
              ¡Gracias por tu compra!
            </Text>
            <Text
              fontSize="sm"
              color={p.muted}
              maxW="400px"
              lineHeight="1.8"
              mx="auto"
            >
              Recibirás un correo de confirmación en breve con los detalles de
              tu envío.
            </Text>
          </Box>
          <Box
            border="1px solid"
            borderColor={p.border}
            p={{ base: 5, md: 8 }}
            w="100%"
            maxW="400px"
            mt={4}
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
              color={p.muted}
              mb={4}
              fontWeight="bold"
            >
              Resumen del pedido
            </Text>
            {[
              {
                label: "Número de orden",
                value: `#EJ-${Math.floor(Math.random() * 90000) + 10000}`,
              },
              { label: "Envío estimado", value: "3-5 días hábiles" },
              {
                label: "Método de pago",
                value: `•••• ${cardData.number.replace(/\s/g, "").slice(-4) || "••••"}`,
              },
            ].map(({ label, value }) => (
              <HStack key={label} justify="space-between" mb={2}>
                <Text fontSize="xs" color={p.muted}>
                  {label}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color={p.fg}
                  fontFamily="mono"
                >
                  {value}
                </Text>
              </HStack>
            ))}
          </Box>
          <HStack
            spacing={3}
            mt={4}
            flexDir={{ base: "column", sm: "row" }}
            w={{ base: "100%", sm: "auto" }}
          >
            <Link href="/products" passHref>
              <Button
                bg={p.fg}
                color={p.bg}
                borderRadius="sm"
                fontFamily="mono"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                h="48px"
                px={8}
                transition="all 0.2s"
                w={{ base: "100%", sm: "auto" }}
                _hover={{ opacity: 0.85 }}
              >
                Seguir comprando
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button
                bg="transparent"
                color={p.fg}
                border="1px solid"
                borderColor={p.border}
                borderRadius="sm"
                fontFamily="mono"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                h="48px"
                px={8}
                w={{ base: "100%", sm: "auto" }}
                transition="all 0.2s"
                _hover={{ borderColor: p.fg }}
              >
                Ir al inicio
              </Button>
            </Link>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Cart;
