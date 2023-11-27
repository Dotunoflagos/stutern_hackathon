import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Stack,
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Header from "../layouts/Header";
import { useCreateClient } from "../services/query/client-manager";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../utils/notification";
import { GET_ALL_CLIENT_KEY } from "../services/queryKeys";
import { useQueryClient } from "react-query";

export default function AddClient() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { errorToast, successToast, infoToast } = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isLoading } = useCreateClient({
    onSuccess: (res: any) => {
      console.log(res);

      if (res?.data?.message === "Client creation successful.") {
        successToast(res?.data?.message);
        onClose();
        queryClient.invalidateQueries(GET_ALL_CLIENT_KEY);
        navigate("/client");
        setEmail("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setAddress("");
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
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      address === ""
    ) {
      errorToast("Please Input all Fields");
    } else {
      mutate({
        email: email,
        firstname: firstName,
        lastname: lastName,
        phone: phoneNumber,
        address: address,
      });
    }
  };

  return (
    <>
      <Header onOpen={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a new Client</DrawerHeader>

          <DrawerBody mt="-10px">
            <Stack>
              <Text color="grey.700" fontWeight={"500"} fontSize={"14px"}>
                Profile Picture
              </Text>
              <Flex
                // mt="20px"
                alignItems={"center"}
                justifyContent={"space-between"}
                // border="3px solid red"
              >
                <Stack>
                  <Box
                    w="96px"
                    h="96px"
                    borderRadius="50%"
                    bgColor="#F1F3F5"
                    border="1px solid #DEE2E6"
                  ></Box>
                </Stack>
                <Flex
                  flexDirection={"column"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-end"}
                  gap={"0.5rem"}
                >
                  <Button
                    loadingText="Submitting"
                    size="sm"
                    bg={"white"}
                    border={"2px"}
                    borderColor={"primary.600"}
                    borderRadius={"0.375rem"}
                    color={"primary.600"}
                    _hover={{
                      bg: "primary.600",
                      color: "white",
                    }}
                    w="fit-content"
                    fontWeight={"400"}
                    fontSize={"12px"}
                    onClick={() => infoToast("Currently Unavailable", 3000)}
                  >
                    Click to upload
                  </Button>
                  <Text
                    color="grey.500"
                    fontWeight={"400"}
                    fontSize={"0.75rem"}
                    textAlign={"right"}
                  >
                    Maximum file size: 5MB
                  </Text>
                </Flex>
              </Flex>

              <Stack spacing={4} mt="20px">
                <FormControl id="name">
                  <FormLabel
                    color="grey.700"
                    fontWeight={"500"}
                    fontSize="14px"
                  >
                    First Name
                  </FormLabel>
                  <Input
                    h="2.6rem"
                    borderRadius="0.5rem"
                    // border="1px solid grey.300"
                    type="text"
                    size="sm"
                    placeholder="First First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="name">
                  <FormLabel
                    color="grey.700"
                    fontWeight={"500"}
                    fontSize="14px"
                  >
                    Last Name
                  </FormLabel>
                  <Input
                    h="2.6rem"
                    borderRadius="0.5rem"
                    // border="1px solid grey.300"
                    type="text"
                    size="sm"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="address">
                  <FormLabel
                    color="grey.700"
                    fontWeight={"500"}
                    fontSize="14px"
                  >
                    Phone Number
                  </FormLabel>
                  <Input
                    h="2.6rem"
                    borderRadius="0.5rem"
                    // border="1px solid grey.300"
                    type="text"
                    size="sm"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
                <FormControl id="address">
                  <FormLabel
                    color="grey.700"
                    fontWeight={"500"}
                    fontSize="14px"
                  >
                    Email address
                  </FormLabel>
                  <Input
                    h="2.6rem"
                    borderRadius="0.5rem"
                    // border="1px solid grey.300"
                    type="text"
                    size="sm"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="address">
                  <FormLabel
                    color="grey.700"
                    fontWeight={"500"}
                    fontSize="14px"
                  >
                    Address
                  </FormLabel>
                  <Input
                    h="2.6rem"
                    borderRadius="0.5rem"
                    // border="1px solid grey.300"
                    type="text"
                    size="sm"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              size="sm"
              loadingText="Creating..."
              isLoading={isLoading}
              bg={"primary.400"}
              color={"white"}
              _hover={{
                bg: "primary.500",
              }}
              type="submit"
              w="fit-content"
              fontWeight={"600"}
              onClick={handleSubmit}
            >
              Create client
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
