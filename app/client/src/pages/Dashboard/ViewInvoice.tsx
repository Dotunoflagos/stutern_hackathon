import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { QLogo } from "../../assets";
import { FaRegFilePdf } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSearchInvoiceById } from "../../services/query/invoice-manager";
import useCustomToast from "../../utils/notification";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/WithSuspense";

const ViewInvoice = () => {
  const { errorToast } = useCustomToast();
  const [invoiceDetails, setInvoiceDetails] = useState<
    {
      firstname: string;
      lastname: string;
      createdAt: string;
      dueDate: string;
      email: string;
      invoiceNumber: string;
      isPaid: boolean;
      amount: number;
      product: [
        {
          name: string;
          price: number;
          quantity: number;
        }
      ];
    }[]
  >([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { id } = useParams();
  const componentRef = useRef(null);

  const handleDownloadPDF = () => {
    const input = componentRef.current;

    if (input) {
      // Capture the component as an image using html2canvas
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Create a new jsPDF instance
        const pdf = new jsPDF("p", "mm", "a4");

        // Add the image to the PDF
        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight()
        );

        // Download the PDF
        pdf.save("Quik Invoice.pdf");
      });
    }
  };

  const [value] = useState("Currently Unavailable");

  const { mutate: searchMutate, isLoading: searchLoading } =
    useSearchInvoiceById({
      onSuccess: (res: any) => {
        console.log(res);
        if (res?.length !== 1) {
          errorToast("Unable to get user details");
        } else {
          setInvoiceDetails(res);
        }
      },
      onError: (err: any) => {
        console.log(err);
        errorToast(err?.response?.data?.message);
      },
    });

  console.log(invoiceDetails);
  useEffect(() => {
    searchMutate({
      invId: id,
    });

    const userDataString = localStorage.getItem("user");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const { firstname, lastname, email } = userData;
      setUserFirstName(firstname);
      setUserLastName(lastname);
      setUserEmail(email);
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {searchLoading ? (
        <Loader />
      ) : (
        <Box>
          {invoiceDetails?.length === 1 && (
            <>
              {invoiceDetails?.map((info, index) => (
                <Box key={index}>
                  <Text
                    color="#5C7CFA"
                    fontWeight="600"
                    fontSize={["14px", "14px", "20px", "20px"]}
                  >
                    Invoice for {info?.firstname} {info?.lastname}
                  </Text>
                  <Flex
                    justifyContent={"space-between"}
                    gap="10px"
                    flexWrap="wrap"
                    mt="20px"
                  >
                    <Box
                      width={["100%", "100%", "100%", "60%"]}
                      border="1px solid #DEE2E6"
                      borderRadius="8px"
                      h="fit-content"
                    >
                      <Box ref={componentRef} p="30px">
                        <Image w="24px" src={QLogo} />
                        <Flex
                          justifyContent={"space-between"}
                          alignItems="center"
                          mt="20px"
                        >
                          <Box>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                            >
                              Invoice ID
                            </Text>
                            <Text
                              color="#868E96"
                              fontSize="18px"
                              fontWeight="600"
                            >
                              {info?.invoiceNumber}
                            </Text>
                          </Box>
                          <Box>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                              textAlign={"right"}
                            >
                              Status
                            </Text>
                            <Flex
                              fontSize="14px"
                              fontWeight="600"
                              // borderRadius="10px"
                              // bg="#FBEAE9"
                              // color="#9E0A05"
                              // p="2px 5px"
                              // alignItems={"center"}
                              // gap="2px"
                            >
                              {info?.isPaid ? "Paid" : "Unpaid"}
                            </Flex>
                          </Box>
                        </Flex>
                        <Text
                          mt="20px"
                          color="#495057"
                          fontSize="18px"
                          fontWeight="600"
                        >
                          Invoice and Client information
                        </Text>

                        <Flex
                          justifyContent={"space-between"}
                          alignItems="center"
                          mt="20px"
                        >
                          <Box>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                            >
                              From
                            </Text>
                            <Text
                              color="#868E96"
                              fontSize="18px"
                              fontWeight="600"
                            >
                              {userFirstName} {userLastName}
                            </Text>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                            >
                              {userEmail}
                            </Text>
                          </Box>
                          <Box>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                              textAlign={"right"}
                            >
                              Date Created
                            </Text>
                            <Text
                              color="#868E96"
                              fontSize="18px"
                              fontWeight="600"
                            >
                              {formatDate(info?.createdAt)}
                            </Text>
                          </Box>
                        </Flex>

                        <Flex
                          justifyContent={"space-between"}
                          alignItems="center"
                          mt="20px"
                        >
                          <Box>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                            >
                              To
                            </Text>
                            <Text
                              color="#868E96"
                              fontSize="18px"
                              fontWeight="600"
                            >
                              {info?.firstname} {info?.lastname}
                            </Text>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                            >
                              {info?.email}
                            </Text>
                          </Box>
                          <Box>
                            <Text
                              color="#868E96"
                              fontSize="14px"
                              fontWeight="400"
                              textAlign={"right"}
                            >
                              Date Due
                            </Text>
                            <Text
                              color="#868E96"
                              fontSize="18px"
                              fontWeight="600"
                            >
                              {formatDate(info?.dueDate)}
                            </Text>
                          </Box>
                        </Flex>

                        <Divider my="30px" />

                        <Text
                          mt="20px"
                          color="#495057"
                          fontSize="18px"
                          fontWeight="600"
                        >
                          Product Information
                        </Text>

                        <TableContainer mt="20px" borderRadius="10px">
                          <Table variant="unstyled">
                            <Thead bgColor="#F8F9FA">
                              <Tr>
                                <Th fontSize="10px">Quanitity</Th>
                                <Th fontSize="10px">Product</Th>
                                <Th fontSize="10px">Unit Price</Th>
                                <Th fontSize="10px">Amount</Th>
                              </Tr>
                            </Thead>
                            <Tbody fontSize="14px">
                              {info?.product.map((pro, index) => (
                                <Tr key={index}>
                                  <Td>{pro?.quantity}</Td>
                                  <Td>{pro?.name}</Td>
                                  <Td>{pro?.price}</Td>
                                  <Td>NGN {pro?.quantity * pro?.price}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>

                        <Divider my="30px" />

                        {/* <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text
                            color="#495057"
                            fontSize="18px"
                            fontWeight="600"
                          >
                            Subtotal
                          </Text>
                          <Text
                            color="#495057"
                            fontSize="18px"
                            fontWeight="600"
                          >
                            $900
                          </Text>
                        </Flex> */}
                        {/* <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          mt="20px"
                        >
                          <Text
                            color="#495057"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            Tax(2.5%)
                          </Text>
                          <Text
                            color="#495057"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            $75
                          </Text>
                        </Flex> */}
                        {/* <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          mt="20px"
                        >
                          <Text
                            color="#495057"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            Discount(10%)
                          </Text>
                          <Text
                            color="#495057"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            $90
                          </Text>
                        </Flex> */}
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          mt="30px"
                        >
                          <Text
                            color="#495057"
                            fontSize="20px"
                            fontWeight="600"
                          >
                            Total
                          </Text>
                          <Text
                            color="#495057"
                            fontSize="20px"
                            fontWeight="600"
                          >
                            NGN {info?.amount / 100}
                          </Text>
                        </Flex>
                      </Box>

                      <Button
                        leftIcon={<FaRegFilePdf />}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        // mt="20px"
                        border="2px"
                        onClick={handleDownloadPDF}
                        m="30px"
                      >
                        Download PDF
                      </Button>
                    </Box>
                    <Box
                      width={["100%", "100%", "100%", "37%"]}
                      border="1px solid #DEE2E6"
                      borderRadius="8px"
                      py="30px"
                      px="20px"
                      h="fit-content"
                    >
                      <Text color="#495057" fontSize="18px" fontWeight="600">
                        Share Invoice
                      </Text>
                      <Text color="#495057" fontSize="14px" fontWeight="400">
                        Share using a link provided below or share across social
                        media platforms
                      </Text>

                      <InputGroup size="sm" mt="20px">
                        <Input
                          variant="filled"
                          pr="4.5rem"
                          type="text"
                          placeholder="Enter password"
                          value={value}
                          readOnly
                          borderRadius="8px"
                        />
                      </InputGroup>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default ViewInvoice;
