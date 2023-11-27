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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { BackgroundImage, QLogo } from "../../assets";
import { FaRegComments } from "react-icons/fa";
import useCustomToast from "../../utils/notification";
import { useNavigate } from "react-router-dom";
import {
  usePostRegister,
  usePostResendOtp,
  usePostVerifyOtp,
} from "../../services/query/account-manager";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [resendLink, setResendLink] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate, isLoading: isCreateLoading } = usePostRegister({
    onSuccess: (res: any) => {
      console.log(res);

      if (
        res?.data?.message ===
        "Registration successful. Please check your email for the OTP."
      ) {
        successToast(res?.data?.message);
        localStorage.setItem("stageId", res?.data?.user?.id);
        localStorage.setItem("email", res?.data?.user?.email);
        onOpen();
        setResendLink(true);
        // localStorage.setItem("user", JSON.stringify(res?.data?.userData));
      } else {
        errorToast(res?.data?.message);
      }
    },
    onError: (err: any) => {
      console.log(err);
      errorToast(err?.response?.data?.message);
    },
  });

  const { mutate: verifyOtpMutate, isLoading: isVerifyLoading } =
    usePostVerifyOtp({
      onSuccess: (res: any) => {
        console.log(res);
        if (res?.data?.message === "OTP verified successfully") {
          successToast(res?.data?.message);
          navigate("/personal-info");
        } else {
          errorToast(res?.data?.message);
        }
      },
      onError: (err: any) => {
        console.log(err);
        errorToast(err?.response?.data?.message);
      },
    });

  const { mutate: resendOtpMutate, isLoading: isResendLoading } =
    usePostResendOtp({
      onSuccess: (res: any) => {
        console.log(res);
        if (res?.data?.message === "New OTP sent to your email") {
          successToast(res?.data?.message);
          navigate("/personal-info");
          setOtp("");
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
    if (password !== confirmPassword) {
      errorToast("Password does not match");
    } else if (password.length < 5) {
      errorToast("Password must have a minimum of 6 character");
    } else {
      mutate({
        email: email,
        password: password,
      });
    }
  };

  const verifyOtpHandler = () => {
    if (otp === "") {
      errorToast("Input your OTP");
    } else if (otp.length !== 6) {
      errorToast("Invalid OTP, input a valid otp");
    } else {
      verifyOtpMutate({
        email: email,
        otp: otp,
      });
    }
  };
  const resendOtpHander = () => {
    onOpen();
    resendOtpMutate({
      email: email,
    });
  };

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
          <Flex
            justify="space-between"
            align="center"
            p="2rem"
            flexWrap={"wrap"}
          >
            <Text fontSize="24px" fontWeight="700">
              Quik Invoice
            </Text>
            <NavLink to="/login">
              <Button
                fontSize="14px"
                border="2px solid #F8F9FA"
                color={"#F8F9FA"}
                bgColor="transparent"
                _hover={{
                  bg: "transparent",
                  cursor: "pointer",
                }}
              >
                <Text display={["none", "block", "block", "block"]}>
                  Login to existing account
                </Text>
                <Text display={["block", "none", "none", "none"]}>Login</Text>
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
                <Heading fontSize={"24px"} color={"grey.900"}>
                  Welcome - Sign Up
                </Heading>
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
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color={"grey.700"}>
                    Create a new password (Min. 8 characters)
                  </FormLabel>
                  <InputGroup>
                    <Input
                      height={"3rem"}
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
                <FormControl id="password" isRequired>
                  <FormLabel color={"grey.700"}>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      height={"3rem"}
                      type={showPassword ? "text" : "password"}
                      placeholder="securepassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                {/* <NavLink to="/personal-info"> */}
                <Stack spacing={10} pt={"1.5rem"}>
                  <Button
                    height="3.5rem"
                    width="100%"
                    loadingText="Loading..."
                    size="lg"
                    bg={"primary.500"}
                    color={"white"}
                    _hover={{
                      bg: "primary.400",
                    }}
                    type="submit"
                    isLoading={isCreateLoading}
                    onClick={handleSubmit}
                    // onClick={onOpen}
                  >
                    Create your Account
                  </Button>
                </Stack>
                {resendLink && (
                  <Link color="#74B816" onClick={resendOtpHander}>
                    Resend Otp
                  </Link>
                )}
                {/* </NavLink> */}
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

      {/* OTP INPUT MODAL */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Email Verification</ModalHeader>

          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text fontSize="13px" mt="-20px">
              Enter the otp that was sent to your email to continue
            </Text>
            <br />
            {isResendLoading ? (
              <Text>Loading... Please wait</Text>
            ) : (
              <FormControl id="email" isRequired>
                <FormLabel color={"grey.700"}>OTP</FormLabel>
                <Input
                  height={"3rem"}
                  type="number"
                  // maxLength="6"
                  placeholder="Enter your otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              loadingText="Verifying..."
              bg={"primary.500"}
              color={"white"}
              _hover={{
                bg: "primary.400",
              }}
              type="submit"
              isLoading={isVerifyLoading}
              onClick={verifyOtpHandler}
            >
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
