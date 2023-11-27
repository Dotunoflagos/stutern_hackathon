import { Box, Button, Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { CiBellOn } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";

interface Props extends FlexProps {
  onOpen?: () => void;
}

const Header = ({ onOpen, ...rest }: Props) => {
  const [firstname, setFirstname] = useState("");
  useEffect(() => {
    const userDataString = localStorage.getItem("user");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const { firstname } = userData;
      setFirstname(firstname);
    }
  }, []);
  const name = `Welcome Back, ${firstname}`;

  const location = useLocation();

  // Extract the pathname from the location
  const { pathname } = location;

  return (
    <div>
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        w="100%"
        mt={{ base: "0", md: "20px" }}
        {...rest}
      >
        <Box mt={["20px", "0", "0", "0"]}>
          <Text
            fontSize={["16px", "20px", "24px", "24px"]}
            fontWeight="600"
            color={"grey.700"}
            mb={"0.2rem"}
          >
            {pathname === "/dashboard" && `${name}`}
            {pathname === "/client" && "Client List"}
            {pathname === "/invoice" && "Invoices"}
          </Text>
          <Text
            fontSize={["12px", "14px", "16px", "16px"]}
            fontWeight="400"
            color="grey.600"
          >
            {pathname === "/view-invoice" || pathname === "/add-invoice"
              ? ""
              : "Review the information you have provided and proceed"}
          </Text>
        </Box>
        <Flex alignContent={"center"} gap="10px">
          <Flex
            w={["25px", "25px", "40px", "40px"]}
            h={["25px", "25px", "40px", "40px"]}
            borderRadius="50%"
            bg="#F1F3F5"
            justifyContent="center"
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={CiBellOn} />
          </Flex>
          {pathname === "/client" && (
            <Button
              leftIcon={<AddIcon />}
              size={["xs", "xs", "md", "md"]}
              // colorScheme="blue"
              color={"white"}
              bg={"primary.600"}
                _hover={{
                  bg: "primary.700",
                }}
              variant="solid"
              fontSize="12px"
              onClick={onOpen}
            >
              New Client
            </Button>
          )}
          {pathname !== "/client" && (
            <NavLink to="/add-invoice">
              <Button
                leftIcon={<AddIcon />}
                size={["xs", "xs", "md", "md"]}
                // colorScheme="blue"
                bg={"primary.600"}
                _hover={{
                  bg: "primary.700",
                }}
                color={"white"}
                variant="solid"
                fontSize="12px"
              >
                New Invoice
              </Button>
            </NavLink>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
