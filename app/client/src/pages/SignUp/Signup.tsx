import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { BackgroundImage, QLogo } from "../../assets";
import { FaRegComments } from "react-icons/fa";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      minH={"100vh"}
      backgroundImage={BackgroundImage}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      <Flex 
        maxW={"90rem"}
        minH={"100dvh"}
        margin={"auto"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      > 
        <Box color={"white"}>
          <Flex justify="space-between" align="center" p="2rem" flexWrap={"wrap"}>
            <Text fontSize="24px" fontWeight="700">
              Quick Invoice
            </Text>
            <NavLink to="/login">
              <Button fontSize="14px" bgColor="none" border="2px solid #F8F9FA">
                <Text display={["none", "block", "block", "block"]}>
                  Login to existing account
                </Text>
                <Text display={["block", "none", "none", "none"]}>Login</Text>
              </Button>
            </NavLink>
          </Flex>
        </Box>
        <Flex align={"center"} justify={"center"}>
          <Stack  px={[2, 6, 6, 6]} w={"100%"} align={"center"}>
            <Stack
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={[4, 8, 8, 8]}
              w={["100%", "90%", "600px", "600px"]}
            >
              <Stack>
                <Image src={QLogo} width="40px" />
                <Heading fontSize={"24px"} color={"grey.900"}>Welcome - Sign Up</Heading>
                <Text fontSize={"16px"} color={"grey.700"}>
                  Enter your details to continue
                </Text>
              </Stack>
              <Stack spacing={"1.5rem"} mt="2.5rem">
                <FormControl id="email" isRequired>
                  <FormLabel color={"grey.700"}>Email address</FormLabel>
                  <Input 
                    height={"3rem"} 
                    type="email" 
                    placeholder="name@example.com" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color={"grey.700"}>Create a new password (Min. 8 characters)</FormLabel>
                  <InputGroup>
                    <Input
                      height={"3rem"}
                      type={showPassword ? "text" : "password"}
                      placeholder="securepassword"
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color={"grey.700"}>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      height={"3rem"}
                      type={showPassword ? "text" : "password"}
                      placeholder="securepassword"
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <NavLink to="/personal-info">
                  <Stack spacing={10} pt={"1.5rem"}>
                    <Button
                      height="3.5rem"
                      width="100%"
                      loadingText="Submitting"
                      size="lg"
                      bg={"primary.500"}
                      color={"white"}
                      _hover={{
                        bg: "primary.400",
                      }}
                    >
                      Create your Account
                    </Button>
                  </Stack>
                </NavLink>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
        <Stack px="2rem" pb="20px">
          <Flex justifyContent={"flex-end"}>
            <Button
              border={"2px solid #DEE2E6"}
              background={"#F1F3F5"}
              fontSize={"12px"}
              fontWeight={"500"}
              gap={"5px"}
            >
              Contact Support{" "}
              <span style={{ fontSize: "20px" }}>
                <FaRegComments />
              </span>
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
