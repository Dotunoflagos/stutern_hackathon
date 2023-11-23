import {
  IconButton,
  Flex,
  FlexProps,
  Box,
  Text,
  Image,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { QLogo } from "../assets";
import { User } from "../assets/index";
import { AddIcon } from "@chakra-ui/icons";
import { CiBellOn } from "react-icons/ci";

type MenuListItemType = {
  icon: string;
  label: string;
  path?: string;
  action?: "COLOR_MODE" | "LOG_OUT";
};

export const menuLists: MenuListItemType[] = [
  {
    icon: User,
    label: "User Profile",
    path: "/user-profile",
  },
];

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Box ml={{ base: 0, md: 60 }}>
      <Flex
        px="4"
        py="2"
        alignItems="center"
        justifyContent={"space-between"}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Flex gap="10px" display={{ base: "flex", md: "none" }}>
          <Image src={QLogo} w={"24px"} />
          <Text fontSize="16px" fontWeight={"600"}>
            Quick Invoice
          </Text>
        </Flex>
        <Flex
          w="36px"
          h="36px"
          borderRadius="50%"
          bg="#F1F3F5"
          justifyContent="center"
          alignItems="center"
          display={{ base: "flex", md: "none" }}
        >
          <Icon as={CiBellOn} />
        </Flex>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        w="100%"
        px="3"
        mt={{ base: "0", md: "20px" }}
      >
        <Box mt={["20px", "0", "0", "0"]}>
          <Text fontSize={["16px", "20px", "24px", "24px"]} fontWeight="600">
            Welcome Back, John
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
            // height={["10px", "20px", "36px", "36px"]}
          >
            New invoice
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
