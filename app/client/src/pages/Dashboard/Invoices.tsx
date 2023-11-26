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
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
// import Header from "../../layouts/Header";
import { SearchIcon } from "@chakra-ui/icons";
import { IoIosMore } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Invoices = () => {
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
            <Thead bgColor="#F8F9FA" color={"grey.700"}>
              <Tr>
                <Th fontSize="10px">Invoice ID</Th>
                <Th fontSize="10px">Client name</Th>
                <Th fontSize="10px">Date Added</Th>
                <Th fontSize="10px">Date Due</Th>
                <Th fontSize="10px">Status</Th>
                <Th fontSize="10px">Action</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="14px">
              <Tr>
                <Td>#000301</Td>
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
                    <Box fontSize={"0.875rem"}>
                      <Text color={"grey.900"} fontWeight="600">
                        Jaydon Korsgaard
                      </Text>
                      <Text color={"grey.500"} fontWeight={"400"}>
                        {" "}
                        jaydonkorsgaard@email.com
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>Nov 24, 2023</Td>
                <Td>Nov 30, 2023</Td>
                <Td>Paid</Td>
                <Td>
                  <Menu>
                    <MenuButton>
                      <Icon as={IoIosMore} />
                    </MenuButton>
                    <MenuList>
                      <NavLink to="/view-invoice">
                        <MenuItem>View</MenuItem>
                      </NavLink>

                      <MenuItem>Edit</MenuItem>
                      <MenuItem color="red">Archive</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Invoices;
