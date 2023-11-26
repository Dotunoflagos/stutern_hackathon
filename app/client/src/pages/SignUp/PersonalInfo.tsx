import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Step,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  FormControl,
  FormLabel,
  Input,
  Button,
  Badge,
  Heading,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { QLogo } from "../../assets/index";
import { useState, useEffect } from "react";
import { usePutUpdateUser } from "../../services/query/account-manager";
import useCustomToast from "../../utils/notification";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const [stage, setStage] = useState(1);
  const [totalStage] = useState(3);
  const [stageTitle, setStageTitle] = useState("Personal Information");
  const [showFullName, setShowFullName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showBussinessName, setShowBussinessName] = useState(false);
  const [showBusinessAddress, setShowBusinessAddress] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");

  const navigate = useNavigate();
  const { errorToast, successToast, infoToast } = useCustomToast();
  const steps = [
    {
      title: "Personal Information",
      description: "Provide information about your self",
      stepIndex: 1,
    },
    {
      title: "Business Information",
      description: "Provide information about your business",
      stepIndex: 2,
    },
    {
      title: "Get Started",
      description: "Review information provided and confirm",
      stepIndex: 3,
    },
  ];

  const activeStep = stage - 1;

  const stageChange = () => {
    if (stage < totalStage) {
      setStage(stage + 1);
    }
  };
  const previousStageChange = () => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  useEffect(() => {
    console.log(stage);

    if (stage === 2) {
      setStageTitle("Business Information");
    } else if (stage === 3) {
      setStageTitle("Get Started");
    } else if (stage === 1) {
      setStageTitle("Personal Information");
    }
  }, [stage]);

  const { mutate, isLoading: isLoading } = usePutUpdateUser({
    onSuccess: (res: any) => {
      console.log(res);

      if (res?.data?.message === "update successful.") {
        successToast(res?.data?.message);
        navigate("/login");
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
      page: 1,
      email: localStorage.getItem("email"),
      firstname: firstName,
      lastname: lastName,
      phone: phoneNumber,
      businessname: businessName,
      businessaddress: businessAddress,
    });
  };

  const pictureHandler = () => {
    infoToast("Feature is currently unavailable", 2000);
  };

  return (
    <Box minH={"100vh"}>
      <Flex w="100%" height="100vh">
        {/* SIDE BAR STARTS HERE */}

        <Box
          w="350px"
          bg="#F8F9FA"
          height="100%"
          display={["none", "none", "block", "block"]}
        >
          <Stack p="20px" border={"1px solid #F1F3F5"}>
            <Image w="40px" src={QLogo} />
          </Stack>
          <Box p="25px">
            <Stack>
              <Text fontSize="20px" fontWeight={"600"}>
                Welcome to Quik invoice
              </Text>
              <Text color="#868E96" fontSize={"14px"}>
                Complete the steps below to setup your business profile
              </Text>
            </Stack>

            <Stepper
              index={activeStep}
              orientation="vertical"
              height="250px"
              gap="0"
              mt="30px"
              size="xs"
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <Text 
                      fontSize="16px" 
                      fontWeight={"500"}
                      color={"grey.700"}
                    >
                      {step.title}
                    </Text>
                    <Text 
                      fontSize="12px" 
                      fontWeight={"400"}
                      color={"grey.500"}
                    >
                      {step.description}
                    </Text>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>

        {/* SIDEBAR END HERE */}

        {/* FORM STARTS HERE */}
        <Box w={["100%", "100%", "fit-content", "fit-content"]}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            p="20px"
            display={["flex", "flex", "none", "none"]}
          >
            <Image w="40px" src={QLogo} />
            <Badge colorScheme="blue" p="5px" borderRadius="10px">
              {stage}/{totalStage}- {stageTitle}
            </Badge>
          </Flex>

          <Box
            px={["15px", "25px", "25px", "65px"]}
            pb="10px"
            mt={["10px", "20px", "50px", "50px"]}
          >
            {/* STAGE ONE STARTS HERE */}
            {stage === 1 && (
              <Stack>
                <Stack>
                  <Text fontSize="20px" fontWeight={"600"}>
                    Personal Information
                  </Text>
                  <Text color="#868E96" fontSize={"14px"}>
                    Complete the steps below to setup your business profile
                  </Text>
                </Stack>

                <Flex
                  mt="20px"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack>
                    <Text color="grey.600" fontSize={"14px"}>
                      Profile Picture
                    </Text>
                    <Box
                      w="96px"
                      h="96px"
                      borderRadius="50%"
                      bgColor="#F1F3F5"
                      border="1px solid #DEE2E6"
                    ></Box>
                    <Text color="#868E96" fontSize={"14px"}>
                      Maximum file size: 5MB
                    </Text>
                  </Stack>
                  <Button
                    loadingText="Submitting"
                    size="sm"
                    bg={"#EDF2FF"}
                    color={"#5C7CFA"}
                    _hover={{
                      bg: "primary.500",
                      color: "white",
                    }}
                    w="fit-content"
                    fontWeight={"400"}
                    fontSize={"12px"}
                    onClick={pictureHandler}
                  >
                    Click to upload
                  </Button>
                </Flex>

                <Stack spacing={4} mt="20px">
                  <FormControl id="name">
                    <FormLabel fontWeight={"400"} color="grey.600" fontSize="14px">
                      First Name
                    </FormLabel>
                    <Input
                      height={"3rem"}
                      borderRadius={"0.5rem"}
                      focusBorderColor="primary.500"
                      type="text"
                      size="sm"
                      placeholder="First First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel fontWeight={"400"} color="grey.600" fontSize="14px">
                      Last Name
                    </FormLabel>
                    <Input
                      height={"3rem"}
                      borderRadius={"0.5rem"}
                      focusBorderColor="primary.500"
                      type="text"
                      size="sm"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="address">
                    <FormLabel fontWeight={"400"} color="grey.600" fontSize="14px">
                      Phone Number
                    </FormLabel>
                    <Input
                      height={"3rem"}
                      borderRadius={"0.5rem"}
                      focusBorderColor="primary.500"
                      type="text"
                      size="sm"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            )}
            {/* STAGE ONE ENDS HERE */}

            {/* STAGE TWO STARTS HERE */}
            {stage === 2 && (
              <Stack>
                <Stack>
                  <Text fontSize="20px" fontWeight={"600"}>
                    Business Information
                  </Text>
                  <Text color="#868E96" fontSize={"14px"}>
                    Complete the steps below to setup your business profile
                  </Text>
                </Stack>

                {/* <Flex
                  mt="20px"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack>
                    <Text color="#868E96" fontSize={"14px"}>
                      Bussiness Logo
                    </Text>
                    <Box
                      w="150px"
                      h="90px"
                      borderRadius="8px"
                      border="3px dashed #DEE2E6"
                    ></Box>
                    <Text color="#868E96" fontSize={"14px"}>
                      Max. file size: 5MB
                    </Text>
                  </Stack>
                  <Button
                    loadingText="Submitting"
                    size="sm"
                    bg={"#EDF2FF"}
                    color={"#5C7CFA"}
                    _hover={{
                      bg: "blue.500",
                      color: "white",
                    }}
                    w="fit-content"
                    fontWeight={"400"}
                    fontSize={"12px"}
                  >
                    Click to upload
                  </Button>
                </Flex> */}

                <Stack spacing={"1.5rem"} mt="20px">
                  <FormControl id="name">
                    <FormLabel color="#868E96" fontSize="14px">
                      Business Name
                    </FormLabel>
                    <Input
                      height={"3rem"}
                      borderRadius={"0.5rem"}
                      focusBorderColor="primary.500"
                      type="text"
                      size="sm"
                      placeholder="Enter business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="name">
                    <FormLabel color="#868E96" fontSize="14px">
                      Business Address
                    </FormLabel>
                    <Input
                      height={"3rem"}
                      borderRadius={"0.5rem"}
                      focusBorderColor="primary.500"
                      type="text"
                      size="sm"
                      placeholder="Enter business address"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            )}
            {/* STAGE TWO ENDS HERE */}

            {/* STAGE THREE STARTS HERE */}
            {stage === 3 && (
              <Stack>
                <Stack>
                  <Text color={"grey.700"} fontSize="20px" fontWeight={"600"}>
                    You’re all set!
                  </Text>
                  <Text color="grey.600" fontSize={"14px"}>
                    Review the information you have provided and proceed
                  </Text>
                </Stack>

                <Stack mt="2.5rem">
                  <Heading fontSize="20px" color="#868E96">
                    Personal Information
                  </Heading>
                  <Flex mt={"0.5rem"} flexDirection={"column"} gap={"1.5rem"}>
                    <FormControl id="name">
                      <FormLabel color="#868E96" fontSize="14px">
                        First Name
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
                          height={"3rem"}
                          borderRadius={"0.5rem"}
                          focusBorderColor="primary.500"
                          size="sm"
                          type="text"
                          border={showFullName ? "1px solid #868E96" : "none"}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <InputRightElement mr="1rem" mt={"0.5rem"}>
                          <Text
                            fontSize={"14px"}
                            color="#868E96"
                            textAlign="center"
                            onClick={() => setShowFullName(!showFullName)}
                          >
                            {showFullName ? "Cancel" : "Edit"}
                          </Text>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel color="#868E96" fontSize="14px">
                        Last Name
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
                          height={"3rem"}
                          borderRadius={"0.5rem"}
                          focusBorderColor="primary.500"
                          size="sm"
                          type="text"
                          border={showEmail ? "1px solid #868E96" : "none"}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <InputRightElement mr="1rem" mt={"0.5rem"}>
                          <Text
                            fontSize={"14px"}
                            color="#868E96"
                            textAlign="center"
                            onClick={() => setShowEmail(!showEmail)}
                          >
                            {showEmail ? "Cancel" : "Edit"}
                          </Text>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel color="#868E96" fontSize="14px">
                        Phone Number
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
                          height={"3rem"}
                          borderRadius={"0.5rem"}
                          focusBorderColor="primary.500"
                          size="sm"
                          type="text"
                          border={showPhone ? "1px solid #868E96" : "none"}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <InputRightElement mr="1rem" mt={"0.5rem"}>
                          <Text
                            fontSize={"14px"}
                            color="#868E96"
                            textAlign="center"
                            onClick={() => setShowPhone(!showPhone)}
                          >
                            {showPhone ? "Cancel" : "Edit"}
                          </Text>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Flex>
                </Stack>
                <Stack mt="1.5rem">
                  <Heading fontSize="20px" color="#868E96">
                    Business Information
                  </Heading>
                  <Flex mt={"0.5rem"} flexDirection={"column"} gap={"1.5rem"}>
                    <FormControl id="name">
                      <FormLabel color="#868E96" fontSize="14px">
                        Business Name
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
                          height={"3rem"}
                          borderRadius={"0.5rem"}
                          focusBorderColor="primary.500"
                          size="sm"
                          type="text"
                          border={
                            showBussinessName ? "1px solid #868E96" : "none"
                          }
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                        <InputRightElement mr="1rem" mt={"0.5rem"}>
                          <Text
                            fontSize={"14px"}
                            color="#868E96"
                            textAlign="center"
                            onClick={() =>
                              setShowBussinessName(!showBussinessName)
                            }
                          >
                            {showBussinessName ? "Cancel" : "Edit"}
                          </Text>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel color="#868E96" fontSize="14px">
                        Business Address
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
                          height={"3rem"}
                          borderRadius={"0.5rem"}
                          focusBorderColor="primary.500"
                          size="sm"
                          type="text"
                          border={
                            showBusinessAddress ? "1px solid #868E96" : "none"
                          }
                          value={businessAddress}
                          onChange={(e) => setBusinessAddress(e.target.value)}
                        />
                        <InputRightElement mr="1rem" mt={"0.5rem"}>
                          <Text
                            fontSize={"14px"}
                            color="#868E96"
                            textAlign="center"
                            onClick={() =>
                              setShowBusinessAddress(!showBusinessAddress)
                            }
                          >
                            {showBusinessAddress ? "Cancel" : "Edit"}
                          </Text>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Flex>
                </Stack>
              </Stack>
            )}
            {/* STAGE THREE ENDS HERE */}
            <Flex justifyContent={"space-between"} mt="2">
              {stage > 1 ? (
                <Button
                  mt={"2rem"}
                  size="sm"
                  bg={"white"}
                  border="1px"
                  borderColor={"primary.600"}
                  color={"primary.600"}
                  _hover={{
                    bg: "white",
                  }}
                  _focus={{
                    bg: "white",
                  }}
                  _active={{
                    bg: "white",
                  }}
                  w="fit-content"
                  fontWeight={"500"}
                  onClick={previousStageChange}
                >
                  Back
                </Button>
              ) : (
                <span></span>
              )}
              {stage !== 3 ? (
                <Button
                mt={"2rem"}
                  size="sm"
                  bg={"primary.400"}
                  color={"white"}
                  _hover={{
                    bg: "primary.500",
                  }}
                  type="submit"
                  w="fit-content"
                  fontWeight={"400"}
                  onClick={stageChange}
                >
                  Save and continue
                </Button>
              ) : (
                <Button
                  mt={"2rem"}
                  size="sm"
                  loadingText="Processing..."
                  isLoading={isLoading}
                  bg={"primary.400"}
                  color={"white"}
                  _hover={{
                    bg: "primary.500",
                  }}
                  type="submit"
                  w="fit-content"
                  fontWeight={"400"}
                  onClick={handleSubmit}
                >
                  Save and finish
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default PersonalInfo;
