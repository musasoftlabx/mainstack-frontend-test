// * NPM
import {
  Avatar,
  For,
  HStack,
  IconButton,
  Image,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";

// * Icons
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoSettingsOutline, IoNewspaperOutline } from "react-icons/io5";
import { LiaToolboxSolid } from "react-icons/lia";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { RiBug2Line } from "react-icons/ri";
import { PiSignOut } from "react-icons/pi";

// * Types
import { NavbarMenuItemsProps } from "@/types";

// * Stores
import { useAccountStore } from "@/store/useAccountStore";

// * Constants
const navbarMenuItems: NavbarMenuItemsProps[] = [
  { icon: <IoSettingsOutline size={20} />, item: "Settings" },
  { icon: <IoNewspaperOutline size={20} />, item: "Purchase History" },
  { icon: <LiaToolboxSolid size={20} />, item: "Refer and Earn" },
  { icon: <AiOutlineAppstoreAdd size={20} />, item: "Integrations" },
  { icon: <RiBug2Line size={20} />, item: "Report Bug" },
  { icon: <MdOutlineSwitchAccount size={20} />, item: "Switch Account" },
  { icon: <PiSignOut size={20} />, item: "Sign Out" },
];

export default function NavbarMenu() {
  // ? Store States
  const credentials = useAccountStore((state) => state.credentials);

  return (
    <Menu.Root positioning={{ placement: "top-start" }}>
      <Menu.Trigger asChild>
        <IconButton variant="plain" rounded="full" size="lg">
          <Image src={`images/menu.png`} height={6} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner width={350}>
          <Menu.Content rounded="xl">
            <Menu.Item value="" my={4}>
              <HStack gap={5}>
                <Avatar.Root colorPalette="black" size="xl" variant="solid">
                  <Avatar.Fallback
                    name={`${credentials?.firstName} ${credentials?.lastName}`}
                  />
                </Avatar.Root>

                <Stack>
                  <Text fontWeight="bold" textStyle="xl">
                    {`${credentials?.firstName} ${credentials?.lastName}`}
                  </Text>
                  <Text textStyle="md" mt={-1}>
                    {credentials?.emailAddress}
                  </Text>
                </Stack>
              </HStack>
            </Menu.Item>

            <For each={navbarMenuItems}>
              {({ icon, item }: NavbarMenuItemsProps, key: number) => (
                <Menu.Item value={item} key={key} my={2} rounded="full">
                  <HStack gap={5} p={3}>
                    {icon}
                    <Text textStyle="md" fontWeight={500}>
                      {item}
                    </Text>
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
