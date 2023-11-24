import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Flex,
  Text,
} from "@chakra-ui/react";
// import Header from "../../layouts/Header";
import { SearchIcon } from "@chakra-ui/icons";
import { IoIosMore } from "react-icons/io";

const Client = () => {
  //   const name = "Client List";
  return (
    <div>
      {/* <Header name={name} /> */}
      <Box mt="20px">
        <InputGroup maxW="380px">
          <InputLeftElement pointerEvents="none">
            <Icon color="gray.300" as={SearchIcon} />
          </InputLeftElement>
          <Input type="text" placeholder="Search Client" />
        </InputGroup>

        <TableContainer
          mt="20px"
          border="1px solid #DEE2E6"
          borderRadius="10px"
        >
          <Table variant="unstyled">
            <Thead bgColor="#F8F9FA">
              <Tr>
                <Th></Th>
                <Th fontSize="10px">Name</Th>
                <Th fontSize="10px">Contact Information</Th>
                <Th fontSize="10px">Date Added</Th>
                <Th fontSize="10px">Action</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="14px">
              <Tr>
                <Td>
                  <Checkbox></Checkbox>
                </Td>
                <Td>
                  <Flex alignItems="center" gap="10px">
                    <Flex
                      w="40px"
                      h="40px"
                      justifyContent="center"
                      alignItems="center"
                      bg="green"
                      color="white"
                      borderRadius="50%"
                    >
                      JK
                    </Flex>
                    <Box>
                      <Text fontWeight="600">Jaydon Korsgaard</Text>
                      <Text>jaydonkorsgaard@email.com</Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>+234 812 3457 908</Td>
                <Td>Nov 24, 2023</Td>
                <Td>
                  <Icon as={IoIosMore} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Client;
