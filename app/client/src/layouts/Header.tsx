import { Box, Button, Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { CiBellOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";

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
          <Text fontSize={["16px", "20px", "24px", "24px"]} fontWeight="600">
            {pathname === "/dashboard" && `${name}`}
            {pathname === "/client" && "Client List"}
            {pathname === "/invoice" && "Invoices"}
          </Text>
          <Text
            fontSize={["12px", "14px", "16px", "16px"]}
            fontWeight="400"
            color="#868E96"
          >
            Review the information you have provided and proceed
          </Text>
        </Box>
        <Flex alignContent={"center"} gap="10px">
          <Flex
            w="25px"
            h="25px"
            borderRadius="50%"
            bg="#F1F3F5"
            justifyContent="center"
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={CiBellOn} />
          </Flex>
          <Button
            leftIcon={<AddIcon />}
            size="xs"
            colorScheme="blue"
            variant="solid"
            fontSize="12px"
            onClick={onOpen}
          >
            New invoice
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
