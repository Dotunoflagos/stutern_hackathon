import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { TbFileInvoice } from "react-icons/tb";
import { TbGraph } from "react-icons/tb";
import { BsCashStack } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import ReactApexChart from "react-apexcharts";
import {
  useGetAllInvoice,
  useGetCompletedInvoice,
  useGetPendingInvoice,
  useGetTotalInvoice,
} from "../../services/query/invoice-manager";
import { Loader } from "../../components/WithSuspense";

const Dashboard = () => {
  const { data, isLoading } = useGetTotalInvoice();

  const { data: pendingData, isLoading: pendingLoading } =
    useGetPendingInvoice();

  const { data: completedData, isLoading: completeLoading } =
    useGetCompletedInvoice();

  const { data: allInvoiceList, isLoading: invoiceLoading } =
    useGetAllInvoice();
  // console.log(allInvoiceList);

  const formattedTotal = (data?.totalAmount / 100).toLocaleString();
  const formattedPending = (pendingData?.pendingData / 100).toLocaleString();
  const formattedCompleted = (
    completedData?.completedData / 100
  ).toLocaleString();

  const cards = [
    {
      name: "Total Invoices",
      amount: formattedTotal === "NaN" ? "0" : formattedTotal,
      percent: data?.numberOfInvoices,
      icon: TbFileInvoice,
    },
    {
      name: "Completed payments",
      amount: formattedPending === "NaN" ? "0" : formattedPending,
      percent: data?.numberOfInvoices,
      icon: BsCashStack,
    },
    {
      name: "Pending payments",
      amount: formattedCompleted === "NaN" ? "0" : formattedCompleted,
      percent: data?.numberOfInvoices,
      icon: CiClock2,
    },
  ];
  return (
    <>
      {invoiceLoading || completeLoading || pendingLoading || isLoading ? (
        <Loader />
      ) : (
        <Box mt="2rem">
          <Box>
            <Flex
              justifyContent={"space-between"}
              align={"center"}
              gap="10px"
              flexWrap={"wrap"}
            >
              {cards.map((card, index) => (
                <Box
                  key={index}
                  borderRadius={"12px"}
                  border="1px solid #DEE2E6"
                  p="12px"
                  height="140px"
                  width={["100%", "100%", "100%", "32%"]}
                >
                  <Flex
                    alignItems={"flex-end"}
                    justifyContent={"space-between"}
                  >
                    <Flex flexDirection={"column"} gap="10px">
                      <Flex
                        w="40px"
                        h="40px"
                        borderRadius="50%"
                        border="1px solid #E4E7EC"
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Icon
                          fontSize={"20px"}
                          color={"#868E96"}
                          as={card.icon}
                        />
                      </Flex>
                      <Text
                        color="#475367"
                        fontSize="12px"
                        whiteSpace={"nowrap"}
                      >
                        {card.name}
                      </Text>
                      <Text fontSize={"18px"} fontWeight={"600"}>
                        NGN {card.amount}
                      </Text>
                    </Flex>
                    <Flex
                      borderRadius="10px"
                      bg="#E7F6EC"
                      fontSize="12px"
                      color="#036B26"
                      fontWeight="600"
                      p="1"
                      alignItems={"center"}
                      gap="2px"
                    >
                      <Icon as={TbGraph} /> +{card.percent} Today
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>

          <Box mt="30px">
            <Flex
              justifyContent={"space-between"}
              // align={"center"}
              gap="10px"
              flexWrap={"wrap"}
            >
              <Box
                borderRadius={"12px"}
                border="1px solid #DEE2E6"
                p="16px"
                minH="140px"
                width={["100%", "100%", "100%", "48%"]}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text fontSize="18px" fontWeight="600">
                    Invoice Payment History
                  </Text>
                  <Text color="#5C7CFA " fontSize="14px" fontWeight="600">
                    See all
                  </Text>
                </Flex>
                {allInvoiceList?.length > 0 ? (
                  <Box mt="20px">
                    {allInvoiceList?.map((inv: any, index: any) => (
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        key={index}
                        mb="6"
                      >
                        <Flex gap="10px">
                          <Flex
                            w="40px"
                            h="40px"
                            borderRadius="50%"
                            bg="#94D82D"
                            color="white"
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            {inv?.firstname[0]}
                            {inv?.lastname[0]}
                          </Flex>
                          <Box>
                            <Text fontSize={"14px"} fontWeight={"500"}>
                              {inv.firstname} {inv.lastname}
                            </Text>
                            <Text
                              fontSize={"12px"}
                              color={"#667185"}
                              fontWeight={"400"}
                            >
                              Invoice ID: {inv?.invoiceNumber}
                            </Text>
                          </Box>
                        </Flex>
                        <Text fontSize={"14px"} fontWeight={"600"}>
                          NGN {inv?.amount / 100}
                        </Text>
                      </Flex>
                    ))}
                  </Box>
                ) : (
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    h="100%"
                  >
                    <Box textAlign={"center"}>
                      <Text color="#344054" fontWeight="600">
                        No data to show
                      </Text>
                      <Text color="#667185" fontSize="12px">
                        Create a client profile and start sending invoices
                      </Text>
                    </Box>
                  </Flex>
                )}
              </Box>
              <Box
                borderRadius={"12px"}
                border="1px solid #DEE2E6"
                p="12px"
                minH="140px"
                width={["100%", "100%", "100%", "48%"]}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text fontSize="18px" fontWeight="600">
                    Payment Analytics
                  </Text>
                  <Text color="#5C7CFA " fontSize="14px" fontWeight="600">
                    See all
                  </Text>
                </Flex>
                <Box mt="20px">
                  <ReactApexChart
                    options={{
                      chart: {
                        type: "area",
                      },
                      stroke: {
                        curve: "smooth",
                      },
                      fill: {
                        type: "gradient",
                        gradient: {
                          shadeIntensity: 1,
                          opacityFrom: 1,
                          opacityTo: 1,
                          stops: [100, 90, 100],
                        },
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      xaxis: {
                        categories: [
                          " Jan",
                          " Feb",
                          " Mar",
                          " Apr",
                          " May",
                          " Jun",
                          " Jul",
                        ],
                      },
                    }}
                    series={[
                      {
                        name: "Series 1",
                        data: [90, 40, 65, 70, 20, 40, 50],
                      },
                    ]}
                    type="area"
                    height={300}
                  />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
