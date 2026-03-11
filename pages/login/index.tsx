import MainLayout from "@/layout";
import { Box, Input, Text, useToast } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import styles from "@/components/navbar/navbar.module.css";
import { GiMoonBats } from "react-icons/gi";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/router";

const FAKE_USERS: Record<string, string> = {
  admin: "1234",
  usuario: "password",
};

const Login = () => {
  const { palette: p, dark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    const validPass = FAKE_USERS[username.toLowerCase()];
    if (validPass && validPass === password) {
      toast({
        title: `¡Bienvenido, ${username}! 👋`,
        description: "Redirigiendo...",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => router.push("/"), 1500);
    } else {
      toast({
        title: "Credenciales incorrectas",
        description: "Usuario o contraseña inválidos.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regUser || !regPass || !regConfirm) {
      toast({
        title: "Campos requeridos",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (regPass !== regConfirm) {
      toast({
        title: "Las contraseñas no coinciden",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (regPass.length < 4) {
      toast({
        title: "Contraseña muy corta",
        description: "Mínimo 4 caracteres.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    FAKE_USERS[regUser.toLowerCase()] = regPass;
    toast({
      title: `¡Cuenta creada! 🎉`,
      description: `Bienvenido, ${regName}. Ya puedes iniciar sesión.`,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
    setUsername(regUser);
    setPassword(regPass);
    setMode("login");
  };

  const inputProps = {
    fontFamily: "mono",
    fontSize: "sm",
    bg: "transparent",
    border: "1px solid",
    borderColor: p.border,
    color: p.fg,
    borderRadius: "sm",
    h: "52px",
    px: 5,
    _placeholder: { color: p.muted },
    _focus: { borderColor: p.fg, boxShadow: "none" },
    _hover: { borderColor: p.fg },
    transition: "all 0.2s",
  };

  return (
    <Box minH="100vh" display="flex" fontFamily="mono" transition="all 0.4s">
      <Box
        w="50%"
        bg={dark ? "white" : "black"}
        display={{ base: "none", md: "flex" }}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        transition="background 0.4s"
      >
        <Text
          position="absolute"
          fontSize={{ md: "160px", lg: "260px" }}
          fontWeight="extrabold"
          color={dark ? "blackAlpha.50" : "whiteAlpha.50"}
          fontFamily="serif"
          fontStyle="italic"
          userSelect="none"
          lineHeight="1"
          letterSpacing="-10px"
        >
          EJ
        </Text>
        <Box
          as={GiMoonBats}
          w={{ md: "140px", lg: "200px" }}
          h={{ md: "140px", lg: "200px" }}
          color={dark ? "black" : "white"}
          opacity={0.9}
          transition="color 0.4s"
          zIndex={1}
        />
        <Box
          position="absolute"
          bottom={12}
          textAlign="center"
          px={10}
          zIndex={1}
        >
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="widest"
            color={dark ? "blackAlpha.400" : "whiteAlpha.400"}
            mb={2}
          >
            Ellie-Jane
          </Text>
          <Text
            fontSize="sm"
            color={dark ? "blackAlpha.500" : "whiteAlpha.500"}
            fontFamily="mono"
            lineHeight="1.8"
          >
            {mode === "login"
              ? "Tu destino de moda favorito"
              : "Únete a nuestra comunidad"}
          </Text>
        </Box>
        {[
          { t: 10, r: 10, s: 70 },
          { t: 7, r: 7, s: 98 },
          { b: 36, l: 10, s: 50 },
          { b: 32, l: 7, s: 72 },
        ].map((c, i) => (
          <Box
            key={i}
            position="absolute"
            top={c.t !== undefined ? c.t : undefined}
            bottom={(c as any).b !== undefined ? (c as any).b : undefined}
            right={c.r !== undefined ? c.r : undefined}
            left={(c as any).l !== undefined ? (c as any).l : undefined}
            w={`${c.s}px`}
            h={`${c.s}px`}
            border="1px solid"
            borderColor={dark ? "blackAlpha.150" : "whiteAlpha.150"}
            borderRadius="full"
          />
        ))}
      </Box>

      <Box
        w={{ base: "100%", md: "50%" }}
        bg={p.bg}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 5, sm: 8, md: 10 }}
        py={{ base: 10, md: 16 }}
        transition="all 0.4s"
        position="relative"
        overflowY="auto"
        minH="100vh"
      >
        <Box
          position="absolute"
          top={{ base: 5, md: 8 }}
          left={{ base: 5, md: 10 }}
          display="flex"
          alignItems="center"
          gap={2}
          cursor="pointer"
          role="group"
          onClick={() => router.back()}
        >
          <Text
            fontSize="16px"
            color={p.muted}
            transition="all 0.2s"
            _groupHover={{ color: p.fg, transform: "translateX(-3px)" }}
          >
            ←
          </Text>
          <Text
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="widest"
            color={p.muted}
            transition="color 0.2s"
            _groupHover={{ color: p.fg }}
          >
            Volver
          </Text>
        </Box>

        <Box w="100%" maxW="460px">
          <Link href="/" passHref>
            <Box
              display="flex"
              alignItems="baseline"
              gap={0}
              mb={8}
              cursor="pointer"
            >
              <Text
                className={styles.title}
                fontSize={{ base: "32px", md: "42px" }}
                color={p.fg}
                transition="color 0.4s"
              >
                Ellie
              </Text>
              <Text
                className={styles.title}
                fontSize={{ base: "32px", md: "42px" }}
                color={p.muted}
                transition="color 0.4s"
              >
                -Jane
              </Text>
            </Box>
          </Link>

          <Box display="flex" mb={8} border="1px solid" borderColor={p.border}>
            {(["login", "register"] as const).map((m) => (
              <Box
                key={m}
                flex="1"
                py={3}
                textAlign="center"
                cursor="pointer"
                bg={mode === m ? p.fg : "transparent"}
                color={mode === m ? p.bg : p.muted}
                fontSize={{ base: "9px", md: "10px" }}
                fontFamily="mono"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                transition="all 0.2s"
                onClick={() => setMode(m)}
                _hover={mode !== m ? { color: p.fg } : {}}
              >
                {m === "login" ? "Iniciar sesión" : "Crear cuenta"}
              </Box>
            ))}
          </Box>

          {mode === "login" && (
            <Box display="flex" flexDir="column" gap={5}>
              <Box mb={2}>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color={p.muted}
                  mb={2}
                >
                  Bienvenido de vuelta
                </Text>
                <Text
                  fontSize={{ base: "2xl", md: "4xl" }}
                  fontWeight="extrabold"
                  color={p.fg}
                  lineHeight="1"
                >
                  Inicia sesión
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
                  Usuario
                </Text>
                <Input
                  {...inputProps}
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </Box>

              <Box>
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color={p.muted}
                  >
                    Contraseña
                  </Text>
                  <Text
                    fontSize="xs"
                    color={p.muted}
                    cursor="pointer"
                    _hover={{ color: p.fg }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Text>
                </Box>
                <Input
                  {...inputProps}
                  placeholder="Ingresa tu contraseña"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </Box>

              <Text
                fontSize="xs"
                color={p.muted}
                cursor="pointer"
                _hover={{ color: p.fg }}
                textAlign="right"
                mt={-2}
              >
                ¿Olvidaste tu contraseña?
              </Text>

              <Box
                as="button"
                bg={p.fg}
                color={p.bg}
                h="52px"
                w="100%"
                fontSize="xs"
                fontFamily="mono"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                borderRadius="sm"
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s"
                _hover={{ opacity: 0.85 }}
                onClick={handleLogin}
                opacity={isLoading ? 0.7 : 1}
                cursor={isLoading ? "not-allowed" : "pointer"}
              >
                {isLoading ? (
                  <Box display="flex" gap={1}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg={p.bg}
                        style={{
                          animation: `bounce 0.8s ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </Box>
                ) : (
                  "Iniciar sesión →"
                )}
              </Box>

              <Box display="flex" alignItems="center" gap={4}>
                <Box flex="1" h="1px" bg={p.border} />
                <Text
                  fontSize="10px"
                  color={p.muted}
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  o
                </Text>
                <Box flex="1" h="1px" bg={p.border} />
              </Box>

              <Box
                as="button"
                bg="transparent"
                color={p.fg}
                border="1px solid"
                borderColor={p.border}
                h="52px"
                w="100%"
                fontSize="xs"
                fontFamily="mono"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                borderRadius="sm"
                transition="all 0.2s"
                _hover={{ borderColor: p.fg }}
                onClick={() => setMode("register")}
              >
                Crear cuenta
              </Box>

              <Box
                border="1px solid"
                borderColor={p.border}
                p={4}
                borderRadius="sm"
              >
                <Text
                  fontSize="9px"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color={p.muted}
                  mb={3}
                >
                  Cuentas de prueba
                </Text>
                {Object.entries(FAKE_USERS).map(([u, pw]) => (
                  <Box
                    key={u}
                    display="flex"
                    justifyContent="space-between"
                    py={1}
                    cursor="pointer"
                    role="group"
                    onClick={() => {
                      setUsername(u);
                      setPassword(pw);
                    }}
                  >
                    <Text
                      fontSize="xs"
                      color={p.muted}
                      fontFamily="mono"
                      _groupHover={{ color: p.fg }}
                      transition="color 0.15s"
                    >
                      {u}
                    </Text>
                    <Text
                      fontSize="xs"
                      color={p.muted}
                      fontFamily="mono"
                      _groupHover={{ color: p.fg }}
                      transition="color 0.15s"
                    >
                      {pw}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {mode === "register" && (
            <Box display="flex" flexDir="column" gap={4}>
              <Box mb={2}>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color={p.muted}
                  mb={2}
                >
                  Únete ahora
                </Text>
                <Text
                  fontSize={{ base: "2xl", md: "4xl" }}
                  fontWeight="extrabold"
                  color={p.fg}
                  lineHeight="1"
                >
                  Crear cuenta
                </Text>
              </Box>

              {[
                {
                  label: "Nombre completo",
                  val: regName,
                  set: setRegName,
                  placeholder: "John Doe",
                  type: "text",
                },
                {
                  label: "Correo electrónico",
                  val: regEmail,
                  set: setRegEmail,
                  placeholder: "john@email.com",
                  type: "email",
                },
                {
                  label: "Usuario",
                  val: regUser,
                  set: setRegUser,
                  placeholder: "Elige un usuario",
                  type: "text",
                },
              ].map(({ label, val, set, placeholder, type }) => (
                <Box key={label}>
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color={p.muted}
                    mb={3}
                  >
                    {label}
                  </Text>
                  <Input
                    {...inputProps}
                    type={type}
                    placeholder={placeholder}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                  />
                </Box>
              ))}

              <Box>
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color={p.muted}
                  >
                    Contraseña
                  </Text>
                  <Text
                    fontSize="xs"
                    color={p.muted}
                    cursor="pointer"
                    _hover={{ color: p.fg }}
                    onClick={() => setShowRegPass(!showRegPass)}
                  >
                    {showRegPass ? "Ocultar" : "Mostrar"}
                  </Text>
                </Box>
                <Input
                  {...inputProps}
                  type={showRegPass ? "text" : "password"}
                  placeholder="Mínimo 4 caracteres"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                />
              </Box>

              <Box>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color={p.muted}
                  mb={3}
                >
                  Confirmar contraseña
                </Text>
                <Input
                  {...inputProps}
                  type={showRegPass ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={regConfirm}
                  borderColor={
                    regConfirm && regConfirm !== regPass ? "red.400" : p.border
                  }
                  onChange={(e) => setRegConfirm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
                {regConfirm && regConfirm !== regPass && (
                  <Text fontSize="xs" color="red.400" mt={2}>
                    Las contraseñas no coinciden
                  </Text>
                )}
              </Box>

              <Box
                as="button"
                bg={p.fg}
                color={p.bg}
                h="52px"
                w="100%"
                fontSize="xs"
                fontFamily="mono"
                fontWeight="bold"
                letterSpacing="widest"
                textTransform="uppercase"
                borderRadius="sm"
                mt={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s"
                _hover={{ opacity: 0.85 }}
                onClick={handleRegister}
                opacity={isLoading ? 0.7 : 1}
                cursor={isLoading ? "not-allowed" : "pointer"}
              >
                {isLoading ? (
                  <Box display="flex" gap={1}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        bg={p.bg}
                        style={{
                          animation: `bounce 0.8s ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </Box>
                ) : (
                  "Crear cuenta →"
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Login;
