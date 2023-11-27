import { useEffect, useRef } from "react";
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
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const timeoutId = useRef<number | null>(null);

  const { data, isLoading, refetch } = useGetTotalInvoice();

  const {
    data: pendingData,
    isLoading: pendingLoading,
    refetch: pendingRefetch,
  } = useGetPendingInvoice();

  const {
    data: completedData,
    isLoading: completeLoading,
    refetch: completeRefetch,
  } = useGetCompletedInvoice();

  const {
    data: allInvoiceList,
    isLoading: invoiceLoading,
    refetch: allRefetch,
  } = useGetAllInvoice();
  // console.log(allInvoiceList);

  useEffect(() => {
    const fetchDataWithTimeout = async () => {
      // Trigger the refetch for each type of data
      refetch();
      pendingRefetch();
      completeRefetch();
      allRefetch();
      // console.log("Timessss");

      // Set a timeout for the next refetch (adjust the time as needed)
      timeoutId.current = setTimeout(fetchDataWithTimeout, 60000); // 60000 milliseconds = 1 minute
    };

    // Start the initial refetch
    fetchDataWithTimeout();

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [data]);

  const formattedTotal = (data?.totalAmount / 100).toLocaleString();
  const formattedPending = (pendingData?.totalAmount / 100).toLocaleString();
  const formattedCompleted = (
    completedData?.totalAmount / 100
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
      amount: formattedCompleted === "NaN" ? "0" : formattedCompleted,
      percent: completedData?.numberOfInvoices,
      icon: BsCashStack,
    },
    {
      name: "Pending payments",
      amount: formattedPending === "NaN" ? "0" : formattedPending,
      percent: pendingData?.numberOfInvoices,
      icon: CiClock2,
    },
  ];

  // const getLast7Days = () => {
  //   const today = new Date();
  //   const last7Days = Array.from({ length: 7 }, (_, index) => {
  //     const day = new Date(today);
  //     day.setDate(today.getDate() - index);
  //     return day.toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //     });
  //   });
  //   return last7Days.reverse();
  // };

  const processData = () => {
    // Create an object to store the sum of amounts for each day
    const amountsByDay: { [day: string]: number } = {};

    // Process each invoice in the data
    if (allInvoiceList?.length > 0) {
      allInvoiceList?.forEach((invoice: any) => {
        // Extract the day from the createdAt field
        const day = new Date(invoice.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        // Initialize the sum for the day if it doesn't exist
        amountsByDay[day] = amountsByDay[day] || 0;

        // Add the amount of the current invoice to the sum for the day
        amountsByDay[day] += invoice.amount / 100;
      });
    }

    // Extract the days and amounts as arrays for ApexCharts
    const categories = Object.keys(amountsByDay);
    const seriesData = Object.values(amountsByDay);

    return { categories, seriesData };
  };

  const { categories, seriesData } = processData();

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

          <Box mt="40px">
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
                minH="300px"
                width={["100%", "100%", "100%", "48%"]}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text fontSize="18px" fontWeight="600">
                    Invoice Payment History
                  </Text>
                  <NavLink to="/invoice">
                    <Text color="#5C7CFA " fontSize="14px" fontWeight="600">
                      See all
                    </Text>
                  </NavLink>
                </Flex>
                {allInvoiceList?.length > 0 ? (
                  <Box mt="20px">
                    {allInvoiceList
                      ?.slice(0, 6)
                      ?.map((inv: any, index: any) => (
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
                minH="300px"
                width={["100%", "100%", "100%", "48%"]}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text fontSize="18px" fontWeight="600">
                    Payment Analytics
                  </Text>
                  {/* <Text color="#5C7CFA " fontSize="14px" fontWeight="600">
                    See all
                  </Text> */}
                </Flex>
                <Box mt="20px">
                  <ReactApexChart
                    options={{
                      chart: {
                        type: "area",
                        toolbar: {
                          show: false,
                        },
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
                        categories,
                      },
                    }}
                    series={[
                      {
                        name: "Total Amount",
                        data: seriesData,
                        // data: [90, 40, 65, 70, 20, 40, 50],
                      },
                    ]}
                    type="area"
                    height={400}
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
