"use client";

// * NPM
import { Center, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";

// * Components
import __Appbar__ from "@/components/shared/__Appbar__";
import __Sidebar__ from "@/components/shared/__Sidebar__";

export default function Home() {
  return (
    <>
      <__Appbar__ />

      <__Sidebar__ />

      <Center height="80vh">
        <VStack gap={10}>
          <Image src="images/logo.png" height={100} width={100} />

          <VStack mt={-10}>
            <Heading size="4xl">Mainstack Test Project</Heading>
            <Text textStyle="lg">
              A test project to evaluate my skills in an advertised job by
              Mainstack
            </Text>
          </VStack>

          <HStack gap={10}>
            <VStack border="1px solid #e0e0e0" p={5} rounded="2xl">
              <Heading size="2xl">Start working time</Heading>
              <Text textStyle="lg" color="green">
                Saturday, 18th October 2025 at 11:00 hrs
              </Text>
            </VStack>

            <VStack border="1px solid #e0e0e0" p={5} rounded="2xl">
              <Heading size="2xl">End working time</Heading>
              <Text textStyle="lg" color="red">
                Monday, 20th October 2025 at 20:00 hrs
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Center>
    </>
  );
}
