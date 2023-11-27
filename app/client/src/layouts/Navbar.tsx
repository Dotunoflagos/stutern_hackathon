import {
  IconButton,
  Flex,
  FlexProps,
  Box,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { QLogo } from "../assets";
import { User } from "../assets/index";
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
        display={{ base: "flex", md: "none" }}
      >
        <IconButton
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Flex gap="10px">
          <Image src={QLogo} w={"24px"} />
          <Text fontSize="16px" fontWeight={"600"}>
            Quik Invoice
          </Text>
        </Flex>
        <Flex
          w="36px"
          h="36px"
          borderRadius="50%"
          bg="#F1F3F5"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={CiBellOn} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
