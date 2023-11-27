import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Fintech: <br />
            <Text as={"span"} color={"green.400"}>
              Simplifying Small Business Payments
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Build an application that enables small businesses to manage their
            payments efficiently. This app should allow business owners to
            create profiles for each of their clients, track payment
            transactions, and receive real-time alerts for unpaid invoices.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <NavLink to="/login" className="li">
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Get Started
              </Button>
            </NavLink>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
