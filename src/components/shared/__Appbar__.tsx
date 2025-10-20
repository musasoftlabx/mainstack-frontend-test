// * React
import React, { useState } from "react";

// * Next
import { usePathname } from "next/navigation";
import Link from "next/link";

// * NPM
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  For,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// * Components
import NavbarMenu from "@/components/pages/revenue/NavbarMenu";

// * Icons
import { BiMessageDetail } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { MdOutlineAnalytics, MdOutlinePeopleOutline } from "react-icons/md";
import { RiApps2AiLine } from "react-icons/ri";

// * Styles
import "react-day-picker/style.css";

// * Types
import { NavbarMenuItemsProps, ProfileProps } from "@/types";
import ExtraLinksMenu from "../pages/revenue/ExtraLinksMenu";

// * Stores
import { useAccountStore } from "@/store/useAccountStore";

const navbarLinks: NavbarMenuItemsProps[] = [
  { icon: <GoHome />, item: "Home", path: "/" },
  { icon: <MdOutlineAnalytics />, item: "Analytics", path: "/analytics" },
  { icon: <FaMoneyBills />, item: "Revenue", path: "/revenue" },
  { icon: <MdOutlinePeopleOutline />, item: "CRM", path: "/crm" },
  { icon: <RiApps2AiLine />, item: "Apps", path: "/apps" },
];

export default function __Appbar__() {
  // ? Hooks
  const pathname = usePathname();

  // ? Store States
  const credentials = useAccountStore((state) => state.credentials);

  // ? Store Actions
  const login = useAccountStore((state) => state.login);

  // ? States
  const [isExtraLinksVisible, setIsExtraLinksVisible] = useState(false);

  // ? Queries
  useQuery({
    queryKey: ["user"],
    queryFn: ({ queryKey }) =>
      axios(queryKey[0]).then(({ data }) => {
        login(data);
        return null;
      }),
  });

  return (
    <>
      <Box
        backgroundColor="#fff"
        position="fixed"
        pt={10}
        width="100%"
        zIndex={999}
      >
        <Container
          boxShadow="rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.1) 0px 18px 36px -18px"
          fluid
          rounded="full"
          maxW="8xl"
          py={4}
        >
          <HStack>
            <Link href="https://mainstack.com/" target="_blank">
              <Image src="images/logo.png" height={8} />
            </Link>

            <Box flex={1} />

            <ButtonGroup size="sm" variant="outline">
              <For each={navbarLinks}>
                {({ icon, item, path }: NavbarMenuItemsProps, key: number) => {
                  return item === "Apps" ? (
                    <ButtonGroup key={key} size="sm" variant="outline" attached>
                      <Button
                        fontSize={16}
                        size="lg"
                        css={
                          isExtraLinksVisible
                            ? { borderLeftRadius: 30 }
                            : { borderRadius: 30 }
                        }
                        variant={isExtraLinksVisible ? "solid" : "ghost"}
                        onClick={() => setIsExtraLinksVisible((prev) => !prev)}
                      >
                        {icon} {item}
                      </Button>

                      {isExtraLinksVisible && <ExtraLinksMenu />}
                    </ButtonGroup>
                  ) : (
                    <Link href={path!} key={key}>
                      <Button
                        rounded="full"
                        size="lg"
                        variant={pathname === path ? "solid" : "ghost"}
                        onClick={() => setIsExtraLinksVisible(false)}
                      >
                        {icon}
                        <Text fontWeight={500}>{item}</Text>
                      </Button>
                    </Link>
                  );
                }}
              </For>
            </ButtonGroup>

            <Box flex={1} />

            <ButtonGroup size="sm" variant="outline">
              <IconButton variant="plain" rounded="full" size="lg">
                <IoMdNotificationsOutline />
              </IconButton>

              <IconButton variant="plain" rounded="full" size="lg">
                <BiMessageDetail />
              </IconButton>

              <Box rounded="full" bgColor="gray/20">
                <HStack px={1}>
                  <Avatar.Root colorPalette="black" variant="solid">
                    <Avatar.Fallback
                      name={`${credentials?.firstName} ${credentials?.lastName}`}
                    />
                  </Avatar.Root>

                  <NavbarMenu />
                </HStack>
              </Box>
            </ButtonGroup>
          </HStack>
        </Container>
      </Box>

      <Box height={150} />
    </>
  );
}
