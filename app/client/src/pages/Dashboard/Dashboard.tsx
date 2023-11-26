import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { TbFileInvoice } from "react-icons/tb";
import { TbGraph } from "react-icons/tb";
import { BsCashStack } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  const cards = [
    {
      name: "Total Invoices",
      amount: "$93,256",
      percent: "+5%",
      icon: TbFileInvoice,
    },
    {
      name: "Completed payments",
      amount: "$93,256",
      percent: "+5%",
      icon: BsCashStack,
    },
    {
      name: "Pending payments",
      amount: "$93,256",
      percent: "+5%",
      icon: CiClock2,
    },
  ];

  const invoices = [
    {
      name: "John Doe",
    },
    {
      name: "Adeyemi Sigurdsson",
    },
    {
      name: "Philly Guy",
    },
    {
      name: "Malone Kramer",
    },
    {
      name: "Steve Kenny",
    },
  ];
  return (
    <>
      {/* <Header name={name} /> */}
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
                <Flex alignItems={"flex-end"} justifyContent={"space-between"}>
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
                    <Text color="#475367" fontSize="12px" whiteSpace={"nowrap"}>
                      {card.name}
                    </Text>
                    <Text fontSize={"18px"} fontWeight={"600"}>
                      {card.amount}
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
                    <Icon as={TbGraph} /> {card.percent}Today
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
              <Box mt="20px">
                {invoices.map((inv, index) => (
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    key={index}
                    mb="4"
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
                        JD
                      </Flex>
                      <Box>
                        <Text fontSize={"14px"} fontWeight={"500"}>
                          {inv.name}
                        </Text>
                        <Text
                          fontSize={"12px"}
                          color={"#667185"}
                          fontWeight={"400"}
                        >
                          Invoice ID #20192 10 hours ago
                        </Text>
                      </Box>
                    </Flex>
                    <Text fontSize={"14px"} fontWeight={"600"}>
                      $1,800
                    </Text>
                  </Flex>
                ))}
              </Box>
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
    </>
  );
};

export default Dashboard;
