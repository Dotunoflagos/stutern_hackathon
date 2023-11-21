import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Image,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { IconType } from "react-icons";
import Navbar from "./Navbar";
import { Kluster } from "../assets";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
];

const activeStyle: React.CSSProperties = {
  color: "#201344",
  background: "white",
  display: "flex",
  alignItems: "center",
  padding: "10px",
  margin: "10px 5px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="whitesmoke">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        // bg="blackAlpha.300"
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        // size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" position="relative">
        <Box>{children}</Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      bgColor="#201344"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={Kluster} w={["200px", "200px", "200px", "100%"]} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <div>
        {LinkItems.map((link) => (
          <div key={link.name}>
            <NavLink
              onClick={onClose}
              to={link.path}
              style={({ isActive }) =>
                isActive
                  ? activeStyle
                  : {
                      ...activeStyle,
                      background: "none",
                      color: "white",
                    }
              }
            >
              <Flex>
                <Icon
                  mr="4"
                  mt="1"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={link.icon}
                />

                {link.name}
              </Flex>
            </NavLink>
          </div>
        ))}
      </div>
    </Box>
  );
};
