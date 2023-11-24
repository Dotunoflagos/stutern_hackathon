import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import AddClient from "../components/AddClient";

interface IChildren {
  children: React.ReactNode;
}
export const AuthPageLayout = ({ children }: IChildren) => {
  return (
    <Box>
      <Sidebar>
        <Box>
          <AddClient />
          {children}
        </Box>
      </Sidebar>
    </Box>
  );
};

export const NonAuthPageLayout = ({ children }: IChildren) => {
  return (
    <Box display={"flex"} flexDirection="column" w="100%">
      {children}
    </Box>
  );
};
