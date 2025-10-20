// * NPM
import {
  Button,
  ButtonGroup,
  CloseButton,
  createListCollection,
  Drawer,
  Heading,
  HStack,
  Portal,
  Stack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import lowerCase from "lodash/lowerCase";

// * Custom Components
import __DatePicker__ from "../../shared/__DatePicker__";
import __Select__ from "../../shared/__Select__";

// * Store
import { useFilterStore } from "@/store/useFilterStore";
import { Dispatch, SetStateAction } from "react";

// * Types
import { TransactionsProps } from "./TransactionsTable";

// * Constants
const transactionTypes = createListCollection({
  items: [
    { label: "Store Transactions", value: "Store Transactions" },
    { label: "Get Tipped", value: "Get Tipped" },
    { label: "Withdrawals", value: "Withdrawals" },
    { label: "Chargebacks", value: "Chargebacks" },
    { label: "Cashbacks", value: "Cashbacks" },
    { label: "Refer & Earn", value: "Refer & Earn" },
  ],
});

const transactionStatuses = createListCollection({
  items: [
    { label: "Successful", value: "successful" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
  ],
});

export default function RevenueDrawer({
  activeFiltersCount,
  filtered,
  transactions,
  isRevenueDrawerOpen,
  setIsRevenueDrawerOpen,
  setFiltered,
}: {
  activeFiltersCount: number;
  filtered: TransactionsProps[];
  transactions: TransactionsProps[];
  isRevenueDrawerOpen: boolean;
  setIsRevenueDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setFiltered: Dispatch<SetStateAction<TransactionsProps[]>>;
}) {
  // ? Store States
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const filter = useFilterStore((state) => state.filter);

  // ? Functions
  const handleToday = () =>
    filter({
      ...activeFilters,
      date: {
        ...activeFilters.date,
        From: dayjs().toDate(),
        To: dayjs().toDate(),
      },
    });

  const handleLast7Days = () =>
    filter({
      ...activeFilters,
      date: {
        ...activeFilters.date,
        From: dayjs().subtract(7, "d").toDate(),
        To: dayjs().toDate(),
      },
    });

  const handleThisMonth = () =>
    filter({
      ...activeFilters,
      date: {
        ...activeFilters.date,
        From: dayjs().startOf("M").toDate(),
        To: dayjs().endOf("M").toDate(),
      },
    });

  const handleLast3Months = () =>
    filter({
      ...activeFilters,
      date: {
        ...activeFilters.date,
        From: dayjs().subtract(3, "M").toDate(),
        To: dayjs().toDate(),
      },
    });

  const handleClearFilters = () => {
    filter({});
    setFiltered(transactions);
  };

  const handleApplyFilters = () => {
    // setFiltered(
    //   filtered.filter(
    //     (item) =>
    //       activeFilters["Transaction Status"].includes(item.status) && item
    //   )
    // );

    setFiltered(
      filtered.filter(
        (item) =>
          lowerCase(activeFilters["Transaction Type"]).includes(item.type) &&
          item
      )
    );
  };

  return (
    <Drawer.Root
      open={isRevenueDrawerOpen}
      onOpenChange={(e) => setIsRevenueDrawerOpen(e.open)}
      size="md"
    >
      <Portal>
        <Drawer.Backdrop />

        <Drawer.Positioner p={5}>
          <Drawer.Content rounded="xl">
            <Drawer.Header>
              <Drawer.Title fontSize={24} fontWeight="bold">
                Filter{activeFiltersCount > 0 && `s (${activeFiltersCount})`}
              </Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              <ButtonGroup size="sm" variant="outline">
                <Button
                  rounded="full"
                  fontWeight="semibold"
                  onClick={handleToday}
                >
                  Today
                </Button>
                <Button
                  rounded="full"
                  fontWeight="semibold"
                  onClick={handleLast7Days}
                >
                  Last 7 days
                </Button>
                <Button
                  rounded="full"
                  fontWeight="semibold"
                  onClick={handleThisMonth}
                >
                  This month
                </Button>
                <Button
                  rounded="full"
                  fontWeight="semibold"
                  onClick={handleLast3Months}
                >
                  Last 3 months
                </Button>
              </ButtonGroup>

              <Stack gap={8} mt={8}>
                <Stack>
                  <Heading fontWeight="bold" size="sm">
                    Date Range
                  </Heading>
                  <HStack gap={3}>
                    <__DatePicker__ placeholder="From" />
                    <__DatePicker__ placeholder="To" />
                  </HStack>
                </Stack>

                <__Select__
                  label="Transaction Type"
                  collection={transactionTypes}
                />

                <__Select__
                  label="Transaction Status"
                  collection={transactionStatuses}
                />
              </Stack>
            </Drawer.Body>

            <Drawer.Footer>
              <Button
                variant="outline"
                size="xl"
                rounded="full"
                flex={1}
                onClick={handleClearFilters}
              >
                Clear
              </Button>
              <Button
                size="xl"
                rounded="full"
                flex={1}
                disabled={JSON.stringify(activeFilters) === "{}"}
                onClick={handleApplyFilters}
              >
                Apply
              </Button>
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="xl" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
