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
            <Stack mt="-20px">
              <Flex
                mt="20px"
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack>
                  <Text color="#868E96" fontSize={"14px"}>
                    Profile Picture
                  </Text>
                  <Box
                    w="96px"
                    h="96px"
                    borderRadius="50%"
                    bgColor="#F1F3F5"
                    border="1px solid #DEE2E6"
                  ></Box>
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
                  onClick={() => infoToast("Currently Unavailable", 3000)}
                >
                  Click to upload
                </Button>
              </Flex>

              <Stack spacing={4} mt="20px">
                <FormControl id="name">
                  <FormLabel color="#868E96" fontSize="14px">
                    First Name
                  </FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    placeholder="First First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="name">
                  <FormLabel color="#868E96" fontSize="14px">
                    Last Name
                  </FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="address">
                  <FormLabel color="#868E96" fontSize="14px">
                    Phone Number
                  </FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
                <FormControl id="address">
                  <FormLabel color="#868E96" fontSize="14px">
                    Email address
                  </FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="address">
                  <FormLabel color="#868E96" fontSize="14px">
                    Address
                  </FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    placeholder="Enter email address"
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
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              w="fit-content"
              fontWeight={"400"}
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
