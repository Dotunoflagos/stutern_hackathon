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
import useCustomToast from "../../utils/notification";
import { useNavigate } from "react-router-dom";
import { usePostLogin } from "../../services/query/account-manager";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading: isCreateLoading } = usePostLogin({
    onSuccess: (res: any) => {
      console.log(res);

      if (res?.data?.message === "Login successful") {
        successToast(res?.data?.message);
        localStorage.setItem("user", JSON.stringify(res?.data?.userData));
        navigate("/dashboard");
      } else {
        errorToast(res?.data?.message);
      }
    },
    onError: (err: any) => {
      console.log(err);
      errorToast(err?.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    mutate({
      email: username,
      password: password,
    });
  };

  return (
    <Box
      minH={"100vh"}
      backgroundImage={BackgroundImage}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      <Box color={"white"}>
        <Flex justify="space-between" align="center" p="20px" flexWrap={"wrap"}>
          <Text fontSize="24px" fontWeight="700">
            Quick Invoice
          </Text>
          <NavLink to="/signup">
            <Button fontSize="14px" bgColor="none" border="2px solid #F8F9FA">
              <Text display={["none", "block", "block", "block"]}>
                Create a new account
              </Text>
              <Text display={["block", "none", "none", "none"]}>SignUp</Text>
            </Button>
          </NavLink>
        </Flex>
      </Box>
      <Flex align={"center"} justify={"center"}>
        <Stack px={[2, 6, 6, 6]} w={"100%"} align={"center"}>
          <Stack
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={[4, 8, 8, 8]}
            w={["100%", "90%", "600px", "600px"]}
          >
            <Stack>
              <Image src={QLogo} width="40px" />
              <Heading fontSize={"24px"}>Welcome Back - Login</Heading>
              <Text fontSize={"16px"} color={"#495057"}>
                Enter your details to continue
              </Text>
            </Stack>
            <Stack spacing={4} mt="20px">
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={username}
                  placeholder="name@example.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="securepassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Loading..."
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isCreateLoading}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Stack px="3" pb="20px" mt="10px">
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
    </Box>
  );
}
