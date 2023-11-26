import { useState, useEffect } from "react";
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
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { IoIosMore } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useGetAllInvoice } from "../../services/query/invoice-manager";
import { Loader } from "../../components/WithSuspense";
import { EmptyInvoice } from "../../assets";

const Invoices = () => {
  const { data, isLoading, refetch } = useGetAllInvoice();
  console.log(data);
  const [tableData, setTableData] = useState([]);
  console.log(data);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Box mt="20px">
            <InputGroup maxW="380px">
              <InputLeftElement pointerEvents="none">
                <Icon color="gray.300" as={SearchIcon} />
              </InputLeftElement>
              <Input type="text" placeholder="Search Invoice" />
            </InputGroup>
            {tableData?.length > 0 ? (
              <TableContainer
                mt="20px"
                border="1px solid #DEE2E6"
                borderRadius="10px"
              >
                <Table variant="unstyled">
                  <Thead bgColor="#F8F9FA">
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
                    {tableData?.map((inv: any, index: any) => (
                      <Tr key={index}>
                        <Td>{inv?.invoiceNumber}</Td>
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
                              {inv?.firstname[0]}
                              {inv?.lastname[0]}
                            </Flex>
                            <Box>
                              <Text fontWeight="600">
                                {inv?.firstname} {inv?.lastname}
                              </Text>
                              <Text>{inv?.email}</Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td>{formatDate(inv?.createdAt)}</Td>
                        <Td>{formatDate(inv?.dueDate)}</Td>
                        <Td>{inv?.isPaid ? "Paid" : "Not Paid"}</Td>
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
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                h="50vh"
              >
                <Image src={EmptyInvoice} />
                <Text fontSize="20px" fontWeight="600">
                  You have no invoices
                </Text>
                <Text color="#868E96" fontSize="14px">
                  Create a new invoice to start see them here
                </Text>
              </Flex>
            )}
          </Box>
        </div>
      )}
    </>
  );
};

export default Invoices;
