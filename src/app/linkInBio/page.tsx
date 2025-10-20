"use client";

// * NPM
import { Center, Heading } from "@chakra-ui/react";

// * Components
import __Appbar__ from "@/components/shared/__Appbar__";
import __Sidebar__ from "@/components/shared/__Sidebar__";

export default function MediaKit() {
  return (
    <>
      <__Appbar__ />

      <__Sidebar__ />

      <Center height="80vh">
        <Heading size="2xl">Media Kit Page</Heading>
      </Center>
    </>
  );
}
