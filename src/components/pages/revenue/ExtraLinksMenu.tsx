// * NPM
import {
  Avatar,
  Button,
  For,
  HStack,
  Image,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";

// * Icons
import { LuChevronDown } from "react-icons/lu";

// * Types
import { ExtraLinksProps } from "@/types";

// * Constants
const extraLinks: ExtraLinksProps[] = [
  {
    icon: "link",
    title: "Link in Bio",
    subtitle: "Manage your Link in Bio",
  },
  {
    icon: "store",
    title: "Store",
    subtitle: "Manage your Store activities",
  },
  {
    icon: "media",
    title: "Media Kit",
    subtitle: "Manage your Media Kit",
  },
  {
    icon: "invoicing",
    title: "Invoicing",
    subtitle: "Manage your Invoices",
  },
  {
    icon: "bookings",
    title: "Bookings",
    subtitle: "Manage your Bookings",
  },
];

export default function ExtraLinksMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          fontSize={16}
          size="lg"
          variant="solid"
          css={{ borderRightRadius: 30 }}
        >
          Link in Bio
          <LuChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner width={350}>
          <Menu.Content rounded="xl" px={2}>
            <For each={extraLinks}>
              {({ icon, title, subtitle }: ExtraLinksProps, key: number) => (
                <Menu.Item
                  key={key}
                  value={title}
                  my={2}
                  rounded="xl"
                  css={{
                    "&:hover": {
                      background: "transparent",
                      border: "1px solid rgba(0,0,0,.1)",
                      "&:after": { content: "'>'" },
                    },
                  }}
                >
                  <HStack gap={5} p={3}>
                    <Avatar.Root size="xl" variant="outline" shape="rounded">
                      <Image src={`images/${icon}.png`} height={5} />
                    </Avatar.Root>

                    <Stack gap={0}>
                      <Text fontWeight="bold" fontSize={16}>
                        {title}
                      </Text>
                      <Text>{subtitle}</Text>
                    </Stack>
                  </HStack>
                </Menu.Item>
              )}
            </For>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
