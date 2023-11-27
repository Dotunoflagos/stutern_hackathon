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
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { IoIosMore } from "react-icons/io";
import {
  useDeleteClient,
  useGetAllClient,
  useSearchClient,
} from "../../services/query/client-manager";
import { Loader } from "../../components/WithSuspense";
import { EmptyClient } from "../../assets";
import useCustomToast from "../../utils/notification";
import { debounce } from "lodash";

const Client = () => {
  const { errorToast, successToast } = useCustomToast();
  const { data, isLoading, refetch } = useGetAllClient();
  console.log(data);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const { mutate, isLoading: deleteLoading } = useDeleteClient({
    onSuccess: (res: any) => {
      console.log(res);

      if (res?.message === "Client deleted successfully") {
        successToast(res?.message);
        refetch();
      } else {
        errorToast(res?.message);
      }
    },
    onError: (err: any) => {
      console.log(err);
      errorToast(err?.response?.data?.message);
    },
  });

  const { mutate: searchMutate, isLoading: searchLoading } = useSearchClient({
    onSuccess: (res: any) => {
      console.log(res);
      if (searchText === "") {
        setTableData(data);
      } else if (res?.message === "No clients found") {
        setTableData([]);
      } else {
        setTableData(res);
      }
    },
    onError: (err: any) => {
      console.log(err);
      errorToast(err?.response?.data?.message);
    },
  });

  const handleSearchChange = debounce(
    (value) => {
      searchMutate({
        name: value,
      });
    },
    2000,
    { leading: false, trailing: true }
  );

  const searchHandler = (event: any) => {
    const value = event.target.value;
    setSearchText(value);

    handleSearchChange(value);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      {isLoading || deleteLoading || searchLoading ? (
        <Loader />
      ) : (
        <div>
          <Box mt="20px">
            <InputGroup maxW="380px">
              <InputLeftElement pointerEvents="none">
                <Icon color="gray.300" as={SearchIcon} />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search Client by name"
                value={searchText}
                onChange={searchHandler}
              />
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
                      <Th fontSize="10px">Name</Th>
                      <Th fontSize="10px">Contact Information</Th>
                      <Th fontSize="10px">Date Added</Th>
                      <Th fontSize="10px">Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody fontSize="14px">
                    {tableData?.map((cli: any, index: any) => (
                      <Tr key={index}>
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
                              {cli?.firstname[0]}
                              {cli?.lastname[0]}
                            </Flex>
                            <Box>
                              <Text fontWeight="600">
                                {cli?.firstname} {cli?.lastname}
                              </Text>
                              <Text>{cli?.email}</Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td>{cli?.phone}</Td>
                        <Td>{formatDate(cli?.updatedAt)}</Td>
                        <Td>
                          <Menu>
                            <MenuButton>
                              <Icon as={IoIosMore} />
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() => {
                                  const isConfirmed = window.confirm(
                                    "Are you sure you want to delete?"
                                  );
                                  if (isConfirmed) {
                                    mutate({
                                      id: cli._id,
                                    });
                                  } else {
                                    console.log("Delete canceled.");
                                  }
                                }}
                              >
                                Delete
                              </MenuItem>
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
                <Image src={EmptyClient} />
                <Text fontSize="20px" fontWeight="600">
                  You have no client
                </Text>
                <Text color="#868E96" fontSize="14px">
                  Create a new client to start sending out invoices
                </Text>
              </Flex>
            )}
          </Box>
        </div>
      )}
    </>
  );
};

export default Client;
