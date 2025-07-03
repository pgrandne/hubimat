import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ArrayFilterFunction } from "./AdvancedTable";
import { disablingProps } from "./DisableDropDownMenuItem";
import { useState } from "react";

const toNumberRange = (object: any): NumberRangeType => {
  return { min: object?.min, max: object?.max };
};

export type NumberRangeType = {
  min: number | undefined;
  max: number | undefined;
};

export const NumberFilterFunction = (
  row: any,
  columnId: string,
  filterValue: NumberRangeType | Array<number>
) => {
  const value: number = row.original[columnId];
  const filterValueRange = toNumberRange(filterValue);

  return Array.isArray(filterValue)
    ? ArrayFilterFunction(row, columnId, filterValue.map(String))
    : (filterValueRange.min == undefined || filterValueRange.min <= value) &&
        (filterValueRange.max == undefined || value <= filterValueRange.max);
};

export default function FilterNumber({
  columnFilter,
  setColumnFilter,
}: {
  columnFilter: any;
  setColumnFilter: Function;
}) {
  const [min, setMin] = useState<number | undefined>(
    (columnFilter as NumberRangeType)?.min
  );
  const [max, setMax] = useState<number | undefined>(
    (columnFilter as NumberRangeType)?.max
  );

  const updateFilter = (newMin?: number, newMax?: number) => {
    if (newMin == undefined && newMax == undefined) setColumnFilter(undefined);
    else setColumnFilter({ min: newMin, max: newMax });
    setMin(newMin);
    setMax(newMax);
  };

  return (
    <>
      <DropdownMenuItem {...disablingProps} style={{ pointerEvents: "none" }}>
        Min :
        <Input
          type="number"
          style={{ pointerEvents: "auto" }}
          defaultValue={min}
          onChange={(e) =>
            updateFilter(
              e.target.value != "" ? Number(e.target.value) : undefined,
              max
            )
          }
        />
      </DropdownMenuItem>
      <DropdownMenuItem {...disablingProps} style={{ pointerEvents: "none" }}>
        Max :
        <Input
          type="number"
          style={{ pointerEvents: "auto" }}
          defaultValue={max}
          onChange={(e) =>
            updateFilter(
              min,
              e.target.value != "" ? Number(e.target.value) : undefined
            )
          }
        />
      </DropdownMenuItem>
    </>
  );
}
