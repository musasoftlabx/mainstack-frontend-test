// * React
import React from "react";

// * NPM
import {
  Box,
  For,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

export default function __TableSkeleton__() {
  const dummyList = new Array(5).fill(0);

  return (
    <For each={dummyList}>
      {(_, key: number) => (
        <HStack key={key} gap={10} my={5}>
          <HStack gap="5" width={300}>
            <SkeletonCircle size="12" />
            <Stack flex={1}>
              <Skeleton height="3" />
              <Skeleton height="3" />
            </Stack>
          </HStack>

          <Box flex={1} />

          <Stack flex={0.1}>
            <Skeleton height="3" />
            <Skeleton height="3" />
          </Stack>
        </HStack>
      )}
    </For>
  );
}
