import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Column } from "@tanstack/react-table";
import { ArrayFilterFunction } from "./AdvancedTable";
import { disablingProps } from "./DisableDropDownMenuItem";
import { useEffect, useState } from "react";

const toNumberRange = (object: any): NumberRangeType => {
  return { min: object?.min, max: object?.max };
};

export type NumberRangeType = {
  min: number | undefined;
  max: number | undefined;
};

export const NumberFilterFunction = (row: any, columnId: string, filterValue: NumberRangeType | Array<number>) => {
  const value : number = row.original[columnId]
  const filterValueRange = toNumberRange(filterValue)

  return Array.isArray(filterValue)
    ? ArrayFilterFunction(row, columnId, filterValue.map(String))
    : (filterValueRange.min == undefined || filterValueRange.min <= value) && (filterValueRange.max == undefined || value <= filterValueRange.max)
}

export default function FilterNumber({
  column,
  isMenuOpen,
}: {
  column: Column<any, unknown>
  isMenuOpen: boolean
}) {

  const [min, setMin] = useState<number | undefined>((column.getFilterValue() as NumberRangeType)?.min)
  const [max, setMax] = useState<number | undefined>((column.getFilterValue() as NumberRangeType)?.max)

  const updateFilter = () => {
    if (min == undefined && max == undefined) column.setFilterValue(undefined)
    else column.setFilterValue({"min": min, "max": max})
  }

  useEffect(() => {if (!isMenuOpen) updateFilter()}, [isMenuOpen])

  return (
    <>
      <DropdownMenuItem {...disablingProps} style={{ pointerEvents: "none" }}>
        Min :
        <Input type="number"
          style={{ pointerEvents: "auto" }}
          defaultValue={(column.getFilterValue() as NumberRangeType)?.min}
          onChange={e => setMin((e.target.value != '') ? Number(e.target.value) : undefined)}
          onKeyDown={e => {if (e.key == "Enter") updateFilter()}}
        />
      </DropdownMenuItem>
      <DropdownMenuItem {...disablingProps} style={{ pointerEvents: "none" }}>
        Max :
        <Input type="number"
          style={{ pointerEvents: "auto" }}
          defaultValue={(column.getFilterValue() as NumberRangeType)?.max}
          onChange={e => setMax((e.target.value != '') ? Number(e.target.value) : undefined)}
          onKeyDown={e => {if (e.key == "Enter") updateFilter()}}
        />
      </DropdownMenuItem>
    </>
  );
}
