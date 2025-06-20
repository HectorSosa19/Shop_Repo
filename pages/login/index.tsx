import MainLayout from "@/layout";
import { Box, Button, Icon, IconButton, Input, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import styles from "@/components/navbar/navbar.module.css";
import { GiMoonBats } from "react-icons/gi";
const Login = () => {
  return (
    <>
      <Box bgColor={"black"} w={"50%"} h={"100vh"} flexDir={"column"}>
        <Box
          display={"flex"}
          flexDir={"row"}
          textAlign={"center"}
          justifyContent={"center"}
          w={"200%"}
        >
          <Text
            fontSize={"38px"}
            className={styles.title}
            color={"white"}
            textDecoration="none"
            _hover={{ color: "#C0A0E9", textDecoration: "none" }}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
          >
            Ellie
          </Text>
          <Text
            fontSize={"38px"}
            className={styles.title}
            color={"black"}
            textDecoration="none"
            ml="60px"
            _hover={{ color: "#C0A0E9", textDecoration: "none" }}
          >
            Jane
          </Text>
        </Box>

        <Box display={"flex"} flexDir="row">
          <Box
            display={"flex"}
            flexDir={"column"}
            alignContent={"center"}
            w={"400px"}
            justifyContent={"center"}
            margin={"auto"}
            h={"80vh"}
            color={"white"}
            ml="100px"
          >
            <Box marginBottom={"25px"}>
              <Text fontWeight={"thin"} mb={"2"}>
                Username:
              </Text>
              <Input placeholder="Ingresa tu usuario" />
            </Box>
            <Box>
              <Text fontWeight={"thin"} mb={"2"}>
                Password:
              </Text>
              <Input placeholder="Ingresa tu contraseña..." type="password" />
            </Box>
            <Box
              borderRadius={"10px"}
              w={"100px"}
              marginTop={"20px"}
              display={"flex"}
              marginLeft={"320px"}
            >
              <Button>Login</Button>
            </Box>
          </Box>

          <Box marginLeft={"55vh"} mt="20vh">
            <Icon
              h={"300px"}
              w={"300px"}
              aria-label=""
              bg={"transparent"}
              color={"black"}
              mt={"6px"}
              as={GiMoonBats}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
