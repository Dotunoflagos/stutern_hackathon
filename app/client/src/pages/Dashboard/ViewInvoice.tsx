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
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewInvoice = () => {
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
        pdf.save("Quick Invoice.pdf");
      });
    }
  };

  const [value] = useState("Currently Unavailable");

  return (
    <div>
      <Box>
        <Box>
          <Text
            color="#5C7CFA"
            fontWeight="600"
            fontSize={["14px", "14px", "20px", "20px"]}
          >
            Invoice for Cheyenne Mango Industries
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
                    <Text color="#868E96" fontSize="14px" fontWeight="400">
                      Invoice ID
                    </Text>
                    <Text color="#868E96" fontSize="18px" fontWeight="600">
                      000101
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
                      Unpaid
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
                    <Text color="#868E96" fontSize="14px" fontWeight="400">
                      From
                    </Text>
                    <Text color="#868E96" fontSize="18px" fontWeight="600">
                      John Doe
                    </Text>
                    <Text color="#868E96" fontSize="14px" fontWeight="400">
                      johnDoe@gmail.com
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
                    <Text color="#868E96" fontSize="18px" fontWeight="600">
                      23/11/2023
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  justifyContent={"space-between"}
                  alignItems="center"
                  mt="20px"
                >
                  <Box>
                    <Text color="#868E96" fontSize="14px" fontWeight="400">
                      To
                    </Text>
                    <Text color="#868E96" fontSize="18px" fontWeight="600">
                      Cheyenne Mango Industries
                    </Text>
                    <Text color="#868E96" fontSize="14px" fontWeight="400">
                      Mango2013@gmail.com
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
                    <Text color="#868E96" fontSize="18px" fontWeight="600">
                      30/11/2023
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
                        <Th></Th>
                        <Th fontSize="10px">Quanitity</Th>
                        <Th fontSize="10px">Product</Th>
                        <Th fontSize="10px">Unit Price</Th>
                      </Tr>
                    </Thead>
                    <Tbody fontSize="14px">
                      <Tr>
                        <Td>1</Td>
                        <Td>Crayfish</Td>
                        <Td>$900</Td>
                        <Td>$900</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                <Divider my="30px" />

                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text color="#495057" fontSize="18px" fontWeight="600">
                    Subtotal
                  </Text>
                  <Text color="#495057" fontSize="18px" fontWeight="600">
                    $900
                  </Text>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt="20px"
                >
                  <Text color="#495057" fontSize="14px" fontWeight="500">
                    Tax(2.5%)
                  </Text>
                  <Text color="#495057" fontSize="14px" fontWeight="500">
                    $75
                  </Text>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt="20px"
                >
                  <Text color="#495057" fontSize="14px" fontWeight="500">
                    Discount(10%)
                  </Text>
                  <Text color="#495057" fontSize="14px" fontWeight="500">
                    $90
                  </Text>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt="30px"
                >
                  <Text color="#495057" fontSize="20px" fontWeight="600">
                    Total
                  </Text>
                  <Text color="#495057" fontSize="20px" fontWeight="600">
                    $1165
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
                Share using a link provided below or share across social media
                platforms
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
      </Box>
    </div>
  );
};

export default ViewInvoice;
