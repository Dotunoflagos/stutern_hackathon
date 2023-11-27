import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Table,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import { QLogo } from "../../assets";
import { useState, useEffect } from "react";
import {
  useGetAllClient,
  useSearchClient,
} from "../../services/query/client-manager";
import useCustomToast from "../../utils/notification";
import { debounce } from "lodash";
import { useCreateInvoice } from "../../services/query/invoice-manager";
import { GET_ALL_INVOICE_KEY } from "../../services/queryKeys";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const AddInvoice = () => {
  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rowCount, setRowCount] = useState(1);
  const [rowData, setRowData] = useState([
    { quantity: 0, price: 0, amount: 0, name: "" },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityName = (value: any, index: any) => {
    const updatedRowData = [...rowData];
    updatedRowData[index].name = value;

    setRowData(updatedRowData);

    updateTotalAmount(updatedRowData);
  };
  const handleQuantityChange = (value: any, index: any) => {
    const updatedRowData = [...rowData];
    updatedRowData[index].quantity = value;
    updatedRowData[index].amount = value * updatedRowData[index].price;
    setRowData(updatedRowData);

    updateTotalAmount(updatedRowData);
  };

  const handleUnitPriceChange = (value: any, index: any) => {
    const updatedRowData = [...rowData];
    updatedRowData[index].price = value;
    updatedRowData[index].amount = value * updatedRowData[index].quantity;
    setRowData(updatedRowData);

    updateTotalAmount(updatedRowData);
  };

  const updateTotalAmount = (data: any) => {
    const total = data.reduce((acc: any, row: any) => acc + row.amount, 0);
    setTotalAmount(total);
  };

  const addNewRow = () => {
    setRowCount(rowCount + 1);
    setRowData([...rowData, { quantity: 0, price: 0, amount: 0, name: "" }]);
  };

  const formatAmount = (amount: any) => {
    return new Intl.NumberFormat().format(amount);
  };

  const removeAmountProperty = (data: any) => {
    return data.map(({ amount, ...rest }: any) => rest);
  };

  const rowDataWithoutAmount = removeAmountProperty(rowData);

  const { data } = useGetAllClient();
  //   console.log(data);

  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientFirstname, setClientFirstname] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [dueDate, setDueDate] = useState("");
  //   const [productName, setProductName] = useState("");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const { mutate: searchMutate, isLoading: searchLoading } = useSearchClient({
    onSuccess: (res: any) => {
      console.log(res);
      if (searchText === "") {
        setTableData([]);
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
    1000,
    { leading: false, trailing: true }
  );

  const searchHandler = (event: any) => {
    const value = event.target.value;
    setSearchText(value);

    handleSearchChange(value);
  };

  const { mutate, isLoading: isLoading } = useCreateInvoice({
    onSuccess: (res: any) => {
      console.log(res);

      if (res?.data?.message === "Invoice created successfully.") {
        queryClient.invalidateQueries(GET_ALL_INVOICE_KEY);
        successToast(res?.data?.message);
        navigate("/invoice");
        // setEmail("");
        // setFirstName("");
        // setLastName("");
        // setPhoneNumber("");
        // setAddress("");
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
    // console.log(rowDataWithoutAmount);
    if (selected === false) {
      errorToast("Please select a client");
    }
    if (dueDate === "") {
      errorToast("Please select a Due Date");
    } else {
      mutate({
        clientId: clientId,
        firstname: clientFirstname,
        lastname: clientLastName,
        phone: clientPhone,
        email: clientEmail,
        dueDate: dueDate,
        send: true,
        product: rowDataWithoutAmount,
      });
    }
  };

  return (
    <div>
      <Text color="#5C7CFA" fontSize="20px" fontWeight="600">
        Add new invoice
      </Text>
      <Box
        width="100%"
        border="1px solid #DEE2E6"
        borderRadius="8px"
        h="fit-content"
        mt="30px"
        p={["10px", "30px", "30px", "30px"]}
      >
        <Flex justifyContent={"space-between"} alignItems="center">
          <Image w="24px" src={QLogo} />
          {/* <Text color="#868E96" fontSize="14px" fontWeight="400">
            Invoice ID
          </Text> */}
        </Flex>
        <Text mt="20px" fontWeight="500" fontSize="16px">
          Add invoice and client information
        </Text>
        <Flex justifyContent={"space-between"} mt="20px">
          <Box>
            <Text color="#868E96" fontSize="14px">
              Client Name
            </Text>
            {selected && (
              <Text fontSize="14px" color="#5C7CFA" fontWeight="600" mt="10px">
                {clientFirstname} {clientLastName}
              </Text>
            )}
          </Box>
          <Box>
            <Input
              type="text"
              placeholder="Search Client"
              size="xs"
              maxW="200px"
              value={searchText}
              height="30px"
              onChange={searchHandler}
            />
            {searchLoading ? (
              <Flex justifyContent={"center"} pt="10px">
                <CircularProgress size="20px" isIndeterminate color="black" />
              </Flex>
            ) : (
              <>
                {searchText !== "" && (
                  <Box
                    boxShadow={"lg"}
                    padding="10px"
                    border="1px solid silver"
                  >
                    {tableData?.length > 0 ? (
                      <>
                        {tableData?.map((cli: any, index: any) => (
                          <Text
                            key={index}
                            onClick={() => {
                              setSearchText("");
                              setClientId(cli?._id);
                              setClientEmail(cli?.email);
                              setClientFirstname(cli?.firstname);
                              setClientLastName(cli?.lastname);
                              setClientPhone(cli?.phone);
                              setSelected(true);
                            }}
                            cursor="pointer"
                          >
                            {cli?.firstname} {cli?.lastname}
                          </Text>
                        ))}
                      </>
                    ) : (
                      <Text>No client</Text>
                    )}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Flex>
        <Flex justifyContent={"space-between"} mt="40px">
          <Box>
            <Text color="#868E96" fontSize="14px">
              Due Date
            </Text>
            {dueDate !== "" && (
              <Text fontSize="14px" color="#5C7CFA" fontWeight="600" mt="10px">
                {dueDate}
              </Text>
            )}
          </Box>

          <Input
            placeholder="Select Date and Time"
            size="xs"
            type="date"
            maxW="190px"
            value={dueDate}
            height="36px"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Flex>

        <Divider my="30px" />

        <Text mt="20px" fontWeight="500" fontSize="16px">
          Add product information
        </Text>

        <TableContainer mt="20px" borderRadius="10px">
          <Table variant="unstyled">
            <Thead bgColor="#F8F9FA">
              <Tr>
                <Th fontSize="10px">Quantity</Th>
                <Th fontSize="10px">Product</Th>
                <Th fontSize="10px">Unit Price</Th>
                <Th fontSize="10px">Amount</Th>
              </Tr>
            </Thead>

            <Tbody fontSize="14px">
              {rowData.map((row, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      size="xs"
                      width="50px"
                      type="number"
                      height="36px"
                      value={row.quantity}
                      onChange={(e) =>
                        handleQuantityChange(e.target.value, index)
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      size="xs"
                      minWidth="150px"
                      type="text"
                      value={row.name}
                      height="36px"
                      onChange={(e) =>
                        handleQuantityName(e.target.value, index)
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      size="xs"
                      width="100px"
                      type="text"
                      value={row.price}
                      height="36px"
                      onChange={(e) =>
                        handleUnitPriceChange(e.target.value, index)
                      }
                    />
                  </Td>
                  <Td fontSize="12px">{`NGN${formatAmount(row.amount)}`}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Text
          color="#5C7CFA"
          fontSize="14px"
          fontWeight="600"
          onClick={addNewRow}
          cursor="pointer"
        >
          + Add new item
        </Text>

        <Divider my="30px" />

        {/* <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text color="#495057" fontSize="18px" fontWeight="600">
            Subtotal
          </Text>
          <Text color="#495057" fontSize="18px" fontWeight="600">
            $900
          </Text>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"center"} mt="20px">
          <Text color="#495057" fontSize="14px" fontWeight="500">
            Tax(2.5%)
          </Text>
          <Text color="#495057" fontSize="14px" fontWeight="500">
            $75
          </Text>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"center"} mt="20px">
          <Text color="#495057" fontSize="14px" fontWeight="500">
            Discount(10%)
          </Text>
          <Text color="#495057" fontSize="14px" fontWeight="500">
            $90
          </Text>
        </Flex> */}
        <Flex justifyContent={"space-between"} alignItems={"center"} mt="30px">
          <Text color="#495057" fontSize="20px" fontWeight="600">
            Total
          </Text>
          <Text color="#495057" fontSize="20px" fontWeight="600">
            {`NGN${formatAmount(totalAmount)}`}
          </Text>
        </Flex>

        <Flex mt="30px" justifyContent={"flex-end"} gap="20px">
          {/* <Button
            size="sm"
            bg={"white"}
            border="1px solid blue"
            color={"blue.400"}
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
          >
            Save as draft
          </Button> */}
          <Button
            size="sm"
            bg={"primary.400"}
            color={"white"}
            _hover={{
              bg: "primary.500",
            }}
            type="submit"
            w="fit-content"
            fontWeight={"400"}
            onClick={handleSubmit}
            loadingText="Creating..."
            isLoading={isLoading}
          >
            Save and send invoice
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default AddInvoice;
