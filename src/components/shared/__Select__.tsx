// * React
import React from "react";

// * NPM
import {
  Checkbox,
  For,
  HStack,
  ListCollection,
  Select,
} from "@chakra-ui/react";

// * Store
import { useFilterStore } from "@/store/useFilterStore";

export default function __Select__({
  collection,
  label,
}: {
  collection: ListCollection;
  label: string;
}) {
  // ? Store States
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const filter = useFilterStore((state) => state.filter);

  return (
    <Select.Root
      collection={collection}
      multiple
      size="md"
      variant="subtle"
      value={activeFilters[label] ?? []}
      onValueChange={(e) => {
        if (e.value.length === 0) {
          delete activeFilters[label];
          filter({ ...activeFilters });
        } else filter({ ...activeFilters, [label]: e.value });
      }}
    >
      <Select.HiddenSelect />
      <Select.Label fontWeight="bold">{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={`Select ${label}`} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content rounded="xl">
          <For each={collection.items}>
            {(transactionType, key) => (
              <Select.Item
                item={transactionType}
                key={key}
                mx={1}
                px={5}
                py={4}
                rounded="lg"
              >
                <HStack>
                  <Checkbox.Root
                    checked={
                      activeFilters[label]?.includes(transactionType.value) ??
                      false
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label ml={2}>
                      {transactionType.label}
                    </Checkbox.Label>
                  </Checkbox.Root>
                </HStack>
              </Select.Item>
            )}
          </For>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
}
