// * NPM
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

// * Icons
import { RiFilePaper2Line } from "react-icons/ri";

export default function EmptyFilters() {
  return (
    <Center height="50vh">
      <Stack gap={6} width={400}>
        <Avatar.Root size="xl" variant="subtle" rounded="xl">
          <RiFilePaper2Line />
        </Avatar.Root>

        <Heading size="2xl" fontWeight="bold">
          No matching transactions found for the selected filter
        </Heading>
        <Text textStyle="md">
          Change your filters to see more results, or add a new product
        </Text>
        <Box mt={2}>
          <Button variant="subtle" rounded="full" size="xl">
            <Text fontWeight="bold" fontSize={14}>
              Clear Filter
            </Text>
          </Button>
        </Box>
      </Stack>
    </Center>
  );
}
