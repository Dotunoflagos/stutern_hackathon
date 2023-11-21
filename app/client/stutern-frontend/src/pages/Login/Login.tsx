import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  useColorModeValue,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useCustomToast from "../../utils/notification";
import { useNavigate } from "react-router-dom";
import { usePostLogin } from "../../services/query/account-manager";

export default function Login() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [token] = useState("12345");

  const { mutate, isLoading: isCreateLoading } = usePostLogin({
    onSuccess: (res: any) => {
      console.log(res);

      if (res?.message === "Record Found") {
        successToast("Login Successful");
        localStorage.setItem("user", JSON.stringify(res));
        localStorage.setItem("firstname", res?.document.firstname);
        localStorage.setItem("lastname", res?.document.lastname);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(
            res?.document?.accessTokens?.authorizationToken?.accessToken
          )
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 200);
      } else {
        errorToast("Invalid Details");
      }
    },
    onError: (err: any) => {
      console.log(err);
      errorToast("Failed");
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
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="whitesmoke">
      <Stack w={["95%", "80%", "70%", "50%"]}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
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
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
