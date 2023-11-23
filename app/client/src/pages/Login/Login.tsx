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
// import { useNavigate } from "react-router-dom";
import { usePostLogin } from "../../services/query/account-manager";
import { useDispatch } from "react-redux";
import { loginUser } from "../../components/Userslice";
import Cookies from "js-cookie";

export default function Signup() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading: isCreateLoading } = usePostLogin({
    onSuccess: (res: any) => {
      console.log(res);

      if (res?.status === 200 && res?.data?.message === "Login successful") {
        successToast(res?.data?.message);
        const user = {
          username,
        };
        dispatch(loginUser(user));
        const token = "";
        // Save user info to cookies
        Cookies.set("user", JSON.stringify(user));
        Cookies.set("token", token);

        // Log the contents of all cookies
        const allCookies: { [key: string]: string } = Cookies.get();
        console.log("All Cookies:", allCookies);
      } else {
        errorToast(res?.data?.message);
      }

      // if (res?.message === "Record Found") {
      //   successToast("Login Successful");
      //   localStorage.setItem("user", JSON.stringify(res));
      //   localStorage.setItem("firstname", res?.document.firstname);
      //   localStorage.setItem("lastname", res?.document.lastname);
      //   localStorage.setItem(
      //     "accessToken",
      //     JSON.stringify(
      //       res?.document?.accessTokens?.authorizationToken?.accessToken
      //     )
      //   );
      //   setTimeout(() => {
      //     navigate("/dashboard");
      //   }, 200);
      // } else {
      //   errorToast("Invalid Details");
      // }
    },
    onError: (err: any) => {
      console.log(err);
      errorToast(err?.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    // console.log(username);
    // console.log(password);
    mutate({
      email: username,
      password: password,
    });
  };

  return (
    <Box
      minH={"100dvh"}
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
          <Stack px={[2, 6, 6, 6]} w={"100%"} align={"center"} >
            <Stack
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={[4, 8, 8, 8]}
              
              w={["100%", "90%", "600px", "600px"]}
            >
              <Stack>
                <Image src={QLogo} width="40px" />
                <Heading fontSize={"24px"} color={"grey.900"}>Welcome Back - Login</Heading>
                <Text fontSize={"16px"} color={"grey.700"}>
                  Enter your details to continue
                </Text>
              </Stack>
              <Stack mt="20px">
                <FormControl id="email" isRequired mb="0.8rem">
                  <FormLabel color={"grey.700"}>Email address</FormLabel>
                  <Input
                    type="email"
                    borderColor={'grey.300'}
                    size={'lg'}
                    height={"3rem"}
                    value={username}
                    placeholder="Name@example.com"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired mb="3rem">
                  <FormLabel color={"grey.700"}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password" 
                      borderColor={'grey.300'}
                      height={"3rem"}
                      size={'lg'}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
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

                <Stack spacing={10} >
                  <Button
                    height="3.5rem"
                    width="100%"
                    loadingText="Submitting"
                    size="lg"
                    padding={"1rem"}
                    bg={"primary.400"}
                    color={"white"}
                    _hover={{
                      bg: "primary.500",
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
        <Stack>
          <Flex justifyContent={"flex-end"} p={"2rem"}>
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
