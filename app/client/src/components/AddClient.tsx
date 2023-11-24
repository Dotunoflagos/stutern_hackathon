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

export default function AddClient() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                    //   value={firstName}
                    //   onChange={(e) => setFirstName(e.target.value)}
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
                    //   value={lastName}
                    //   onChange={(e) => setLastName(e.target.value)}
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
                    //   value={phoneNumber}
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
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
                    //   value={phoneNumber}
                    //   onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              size="sm"
              loadingText="Processing..."
              //   isLoading={isLoading}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              w="fit-content"
              fontWeight={"400"}
              //   onClick={handleSubmit}
            >
              Create client
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
