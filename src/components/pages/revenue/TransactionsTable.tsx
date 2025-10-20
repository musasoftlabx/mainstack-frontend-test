// * React
import { Dispatch, SetStateAction, useState } from "react";

// * NPM
import {
  Avatar,
  Badge,
  Button,
  DownloadTrigger,
  FormatNumber,
  Heading,
  HStack,
  Stack,
  StackSeparator,
  Table,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import capitalize from "lodash/capitalize";
import dayjs from "dayjs";

// * Icons
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";
import { LuDownload } from "react-icons/lu";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

// * Shared Components
import __TableSkeleton__ from "@/components/shared/skeletons/__TableSkeleton__";

// * Page Components
import EmptyFilters from "./EmptyFilters";
import RevenueDrawer from "./RevenueDrawer";

// * Types
import { TransactionsProps } from "@/types";

export default function TransactionsTable({
  activeFiltersCount,
  isRevenueDrawerOpen,
  setIsRevenueDrawerOpen,
}: {
  activeFiltersCount: number;
  isRevenueDrawerOpen: boolean;
  setIsRevenueDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // ? States
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [filtered, setFiltered] = useState<TransactionsProps[]>([]);

  // ? Queries
  const { isFetching, isSuccess } = useQuery({
    queryKey: ["transactions"],
    queryFn: ({ queryKey }) =>
      axios<TransactionsProps[]>(queryKey[0]).then(({ data }) => {
        setTransactions(data);
        setFiltered(data);
        return null;
      }),
  });

  return (
    <>
      <Stack separator={<StackSeparator />}>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Heading fontWeight="bold" textStyle="2xl">
              {filtered?.length ?? 0} Transactions
            </Heading>
            <Text>Your transactions for the last 7 days</Text>
          </Stack>

          <HStack gap={3}>
            <Button
              variant="subtle"
              rounded="full"
              size="xl"
              onClick={() => setIsRevenueDrawerOpen(true)}
            >
              Filter
              {activeFiltersCount > 0 && (
                <>
                  {"s"}
                  <Badge variant="solid" rounded="full">
                    {activeFiltersCount}
                  </Badge>
                </>
              )}
              {isRevenueDrawerOpen ? <RxCaretUp /> : <RxCaretDown />}
            </Button>

            <DownloadTrigger
              data="To fill"
              fileName="sample.txt"
              mimeType="text/plain"
              asChild
            >
              <Button variant="subtle" rounded="full" size="xl">
                Export List
                <LuDownload />
              </Button>
            </DownloadTrigger>
          </HStack>
        </Stack>

        {isFetching ? (
          <__TableSkeleton__ />
        ) : (
          <>
            {filtered.length === 0 ? (
              <EmptyFilters />
            ) : (
              <Table.Root size="lg">
                <Table.Body>
                  {isSuccess &&
                    filtered.map((item: TransactionsProps, key: number) => (
                      <Table.Row key={key}>
                        <Table.Cell css={{ borderBottomWidth: 0 }}>
                          <HStack gap={5}>
                            <Avatar.Root
                              size="xl"
                              variant="subtle"
                              colorPalette={
                                item.type === "deposit" ? "green" : "red"
                              }
                            >
                              {item.type === "deposit" ? (
                                <HiArrowDownLeft />
                              ) : (
                                <HiArrowUpRight />
                              )}
                            </Avatar.Root>

                            {item.type === "deposit" ? (
                              <Stack gap={1}>
                                <Text>{item.metadata?.product_name}</Text>
                                <Text textStyle="sm">
                                  {item.metadata?.name}
                                </Text>
                              </Stack>
                            ) : (
                              <Stack gap={1}>
                                <Text>Cash {item.type}</Text>
                                <Text
                                  textStyle="sm"
                                  css={{
                                    color:
                                      item.status === "successful"
                                        ? "green"
                                        : "red",
                                  }}
                                >
                                  {capitalize(item.status)}
                                </Text>
                              </Stack>
                            )}
                          </HStack>
                        </Table.Cell>

                        <Table.Cell css={{ borderBottomWidth: 0 }}>
                          <Stack alignItems="end">
                            <Text fontWeight="bold">
                              <FormatNumber
                                value={item.amount}
                                style="currency"
                                currency="USD"
                              />
                            </Text>
                            <Text>
                              {dayjs(item.date).format("MMM DD, YYYY")}
                            </Text>
                          </Stack>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table.Root>
            )}
          </>
        )}
      </Stack>

      <RevenueDrawer
        activeFiltersCount={activeFiltersCount}
        isRevenueDrawerOpen={isRevenueDrawerOpen}
        filtered={filtered}
        transactions={transactions}
        setIsRevenueDrawerOpen={setIsRevenueDrawerOpen}
        setFiltered={setFiltered}
      />
    </>
  );
}
