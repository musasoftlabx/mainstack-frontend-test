"use client";

// * NPM
import { Center, Heading } from "@chakra-ui/react";

// * Components
import __Appbar__ from "@/components/shared/__Appbar__";

export default function CRM() {
  return (
    <>
      <__Appbar__ />

      <Center height="80vh">
        <Heading size="2xl">CRM Page</Heading>
      </Center>
    </>
  );
}
