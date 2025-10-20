import { Dispatch, SetStateAction, useEffect, useState } from "react";

// * NPM
import {
  Avatar,
  Badge,
  Box,
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
import {
  HiArrowDownLeft,
  HiArrowUpLeft,
  HiArrowUpRight,
} from "react-icons/hi2";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { LuDownload } from "react-icons/lu";

// * Stores
import { useFilterStore } from "@/store/useFilterStore";
import RevenueDrawer from "./RevenueDrawer";

export type TransactionsProps = {
  amount: number;
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };
  payment_reference: string;
  status: string;
  type: "deposit" | "withdrawal";
  date: string;
};

export default function TransactionsTable({
  activeFiltersCount,
  isRevenueDrawerOpen,
  setIsRevenueDrawerOpen,
}: {
  activeFiltersCount: number;
  isRevenueDrawerOpen: boolean;
  setIsRevenueDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // ? Store States
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const filter = useFilterStore((state) => state.filter);

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

        <Table.Root size="lg">
          <Table.Body>
            {isSuccess &&
              filtered.map((item: TransactionsProps, key: number) => (
                <Table.Row key={key}>
                  <Table.Cell>
                    <HStack gap={5}>
                      <Avatar.Root
                        size="xl"
                        variant="subtle"
                        colorPalette={item.type === "deposit" ? "green" : "red"}
                      >
                        {item.type === "deposit" ? (
                          <HiArrowDownLeft />
                        ) : (
                          <HiArrowUpRight />
                        )}
                      </Avatar.Root>

                      {item.type === "deposit" ? (
                        <Stack>
                          <Text>{item.metadata?.product_name}</Text>
                          <Text>{item.metadata?.name}</Text>
                        </Stack>
                      ) : (
                        <Stack>
                          <Text>Cash {item.type}</Text>
                          <Text
                            css={{
                              color:
                                item.status === "successful" ? "green" : "red",
                            }}
                          >
                            {capitalize(item.status)}
                          </Text>
                        </Stack>
                      )}
                    </HStack>
                  </Table.Cell>

                  <Table.Cell>
                    <Stack alignItems="end">
                      <Text fontWeight="bold">
                        <FormatNumber
                          value={item.amount}
                          style="currency"
                          currency="USD"
                        />
                      </Text>
                      <Text>{dayjs(item.date).format("MMM DD, YYYY")}</Text>
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
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
