"use client";

// * React
import { useState } from "react";

// * NPM
import {
  Box,
  Button,
  Container,
  FormatNumber,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Stat,
  VStack,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountUp from "react-countup";

// * Stores
import { useFilterStore } from "@/store/useFilterStore";

// * Chakra Components
import { InfoTip } from "@/components/ui/toggle-tip";

// * Shared Components
import __Appbar__ from "@/components/shared/__Appbar__";
import __Sidebar__ from "@/components/shared/__Sidebar__";

// * Page Components
import TransactionsChart from "@/components/pages/revenue/TransactionsChart";
import TransactionsTable from "@/components/pages/revenue/TransactionsTable";

// * Types
import { WalletProps } from "@/types";

export default function Home() {
  // ? Store States
  const activeFilters = useFilterStore((state) => state.activeFilters);

  // ? States
  const [isRevenueDrawerOpen, setIsRevenueDrawerOpen] = useState(false);

  // ? Queries
  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: ({ queryKey }) => axios<WalletProps>(queryKey[0]),
    select: ({ data }) => data,
  });

  // ? Constants
  const activeFiltersCount = Object.keys(activeFilters).length;

  return (
    <>
      <__Appbar__ />

      <__Sidebar__ />

      <Container>
        <Stack gap={50}>
          <SimpleGrid columns={{ base: 2, md: 12 }} gap={{ base: 5, md: 4 }}>
            <GridItem colSpan={{ base: 1, md: 10 }}>
              <Stack gap={10}>
                <HStack gap={10}>
                  <Box>
                    <Stat.Root>
                      <Stat.Label>Available Balance</Stat.Label>
                      <Stat.ValueText fontSize={30} fontWeight={900}>
                        <CountUp
                          start={0}
                          end={wallet?.balance ?? 0}
                          duration={1}
                          decimals={2}
                          decimal="."
                          prefix="USD "
                        >
                          {({ countUpRef }) => <span ref={countUpRef} />}
                        </CountUp>
                      </Stat.ValueText>
                    </Stat.Root>
                  </Box>
                  <Button rounded="full" size="xl" px={10}>
                    Withdraw
                  </Button>
                </HStack>

                <TransactionsChart />
              </Stack>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <VStack gap={14}>
                {wallet &&
                  Object.keys(wallet).map((item, key) => {
                    if (item !== "balance") {
                      let statTitle: string = "";
                      let value: number = 0;

                      switch (item) {
                        case "ledger_balance":
                          statTitle = "Ledger Balance";
                          value = wallet.ledger_balance;
                          break;
                        case "total_payout":
                          statTitle = "Total Payout";
                          value = wallet.total_payout;
                          break;
                        case "total_revenue":
                          statTitle = "Total Revenue";
                          value = wallet.total_revenue;
                          break;
                        case "pending_payout":
                          statTitle = "Pending Payout";
                          value = wallet.pending_payout;
                          break;
                      }

                      return (
                        <Stat.Root key={key}>
                          <Stat.Label>
                            {statTitle}
                            <Box flex={1} justifyContent="flex-end" />
                            <InfoTip>{statTitle}</InfoTip>
                          </Stat.Label>
                          <Stat.ValueText fontWeight={800}>
                            <FormatNumber
                              value={value}
                              style="currency"
                              currency="USD"
                              currencyDisplay="code"
                            />

                            {/* <CountUp
                              start={0}
                              end={value ?? 0}
                              duration={1}
                              decimals={2}
                              decimal="."
                              prefix="USD "
                            >
                              {({ countUpRef }) => <span ref={countUpRef} />}
                            </CountUp> */}
                          </Stat.ValueText>
                        </Stat.Root>
                      );
                    }
                  })}
              </VStack>
            </GridItem>
          </SimpleGrid>

          <TransactionsTable
            activeFiltersCount={activeFiltersCount}
            isRevenueDrawerOpen={isRevenueDrawerOpen}
            setIsRevenueDrawerOpen={setIsRevenueDrawerOpen}
          />
        </Stack>
      </Container>
    </>
  );
}
