// * React
import React from "react";

// * Next
import Link from "next/link";

// * NPM
import {
  Box,
  ButtonGroup,
  Float,
  For,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

// * Types
import { NavbarMenuItemsProps } from "@/types";

// * Constants
const sidebarLinks: NavbarMenuItemsProps[] = [
  { icon: "link", item: "Link in Bio", path: "/linkInBio" },
  { icon: "store", item: "Store", path: "/store" },
  { icon: "media", item: "Media Kit", path: "/mediaKit" },
  { icon: "invoicing", item: "Invoicing", path: "/invoicing" },
];

export default function __Sidebar__() {
  return (
    <Float placement="middle-start" left={50} top="50vh">
      <Box
        boxShadow="rgba(50, 50, 93, 0.4) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 10px 18px 20px -18px"
        backgroundColor="#fff"
        px={1}
        py={3}
        rounded="full"
        zIndex={999}
      >
        <ButtonGroup size="sm" variant="outline" flexDirection="column">
          <For each={sidebarLinks}>
            {({ icon, item, path }: NavbarMenuItemsProps, key: number) => (
              <Link href={path!} key={key}>
                <Tooltip
                  showArrow
                  content={item}
                  contentProps={{
                    borderRadius: 10,
                    fontSize: 16,
                    px: 3,
                    py: 4,
                  }}
                  positioning={{ placement: "right" }}
                >
                  <IconButton
                    variant="ghost"
                    rounded="full"
                    size="xl"
                    css={{
                      filter: "grayscale(1)",
                      "&:hover": { filter: "grayscale(0)" },
                    }}
                  >
                    <Image src={`images/${icon}.png`} height={5} />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </For>
        </ButtonGroup>
      </Box>
    </Float>
  );
}
