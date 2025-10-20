// * React
import React, { useState } from "react";

// * NPM
import { Input, InputGroup, Popover, Stack } from "@chakra-ui/react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import dayjs from "dayjs";

// * Icons
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

// * Store
import { useFilterStore } from "@/store/useFilterStore";

// * Styles
import "react-day-picker/style.css";

export default function __DatePicker__({
  placeholder,
}: {
  placeholder: "From" | "To";
}) {
  const defaultClassNames = getDefaultClassNames();

  // ? Store States
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const filter = useFilterStore((state) => state.filter);

  // ?  States
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <Stack flex={1}>
      <Popover.Root
        open={isPickerOpen}
        onOpenChange={(e) => setIsPickerOpen(e.open)}
        positioning={{ placement: "bottom-start" }}
      >
        <Popover.Trigger>
          <InputGroup
            endElement={
              isPickerOpen ? <RxCaretUp size={20} /> : <RxCaretDown size={20} />
            }
          >
            <Input
              defaultValue={
                activeFilters?.date?.[placeholder]?.toLocaleDateString() ?? null
              }
              placeholder={placeholder}
              size="md"
              variant="subtle"
              disabled={placeholder === "To" && !activeFilters?.date?.["From"]}
            />
          </InputGroup>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <DayPicker
                mode="single"
                navLayout="around"
                disabled={
                  placeholder === "From"
                    ? { after: dayjs().toDate() }
                    : {
                        before: dayjs(activeFilters?.date?.["From"]).toDate(),
                        after: dayjs().toDate(),
                      }
                }
                selected={activeFilters?.date?.[placeholder]}
                onSelect={(date) => {
                  setIsPickerOpen(false);

                  if (!date) {
                    delete activeFilters[placeholder];
                    filter({ ...activeFilters });
                  } else
                    filter({
                      ...activeFilters,
                      date: { ...activeFilters.date, [placeholder]: date },
                    });
                }}
                styles={{
                  root: { width: 100 },
                  month_caption: { fontWeight: 500, fontSize: 14 },
                  chevron: { color: "black" },
                  button_next: { background: "#000", color: "black" },
                  day: { width: 100 },
                  selected: { background: "#000", color: "#fff" },
                  today: { background: "#000", color: "#fff" },
                }}
                classNames={
                  {
                    //today: `${defaultClassNames} border-amber-500`,
                  }
                }
              />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </Stack>
  );
}
