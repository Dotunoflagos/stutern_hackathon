import React, { Suspense } from "react";
import { Box, CircularProgress } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100vh" }}
    >
      <CircularProgress isIndeterminate color="black" />
    </Box>
  );
};
const WithSuspense = (Component: React.FC) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default WithSuspense;
