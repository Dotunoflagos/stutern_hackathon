import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import Navbar from "./Navbar";
import { QLogo } from "../assets";
import { MdSpaceDashboard } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings2 } from "react-icons/lu";
import useCustomToast from "../utils/notification";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: MdSpaceDashboard, path: "/dashboard" },
  { name: "Invoice", icon: TbFileInvoice, path: "/ll" },
  { name: "Clients", icon: HiOutlineUserGroup, path: "/jj" },
  { name: "Setting", icon: LuSettings2, path: "/bb" },
];

const activeStyle: React.CSSProperties = {
  color: "black",
  background: "#DEE2E6",
  fontSize: "16px",
  // fontWeight: "600",
  display: "flex",
  alignItems: "center",
  padding: "10px",
  margin: "10px 0",
  // borderRadius: "5px",
  cursor: "pointer",
};

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
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
  const { successToast } = useCustomToast();
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
    // Fetch the data from localStorage
    // const userDataString = localStorage.getItem("user");

    // if (userDataString) {
    // Parse the JSON string to get the user data
    // const userData = JSON.parse(userDataString);

    // Extract firstname and lastname from user data
    // const { firstname, lastname } = userData;

    // Update state with the values
    // setFirstname(firstname);
    // setLastname(lastname);
    // }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("agentID");
    localStorage.removeItem("role");
    successToast("Logout Successful");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];

  let timer: any;

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();

      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });

      // logout();
    }, 300000);
  };
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };
  return (
    <Box
      transition="3s ease"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      bgColor="#F8F9FA"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        px="8"
        justifyContent="space-between"
        borderBottom={"1px solid #F1F3F5"}
      >
        <Flex gap="10px">
          <Image src={QLogo} w={"24px"} />
          <Text fontSize="16px" fontWeight={"600"}>
            Quick Invoice
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box pl="8" height={"100%"} position={"relative"}>
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
                      color: "#868E96",
                    }
              }
            >
              <Flex alignItems={"center"}>
                <Icon
                  mr="4"
                  fontSize="20"
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
        <Box position={"absolute"} top="75%">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <Flex mr="4">
                <Flex alignItems={"center"} gap={"10px"}>
                  <Box
                    w="32px"
                    h="32px"
                    borderRadius="50%"
                    bgColor="#495057"
                  ></Box>
                  <Text fontSize={"14px"}>John Doe</Text>
                </Flex>
              </Flex>
            </MenuButton>
            <MenuList bg="white">
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};
