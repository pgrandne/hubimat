import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Column } from "@tanstack/react-table";
import { ArrayFilterFunction } from "./AdvancedTable";
import { disablingProps } from "./DisableDropDownMenuItem";

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
}: {
  column: Column<any, unknown>;
}) {
  return (
    <>
      <DropdownMenuItem {...disablingProps} style={{ pointerEvents: "none" }}>
        Min :
        <Input type="number"
          style={{ pointerEvents: "auto" }}
          defaultValue={(column.getFilterValue() as NumberRangeType)?.min}
          onChange={(e) => {
            const newValue = (e.target.value != '') ? Number(e.target.value) : undefined
            const max = (column.getFilterValue() as NumberRangeType)?.max
            column.setFilterValue({"min": newValue, "max": max})
            if (newValue == undefined && max == undefined) column.setFilterValue(undefined)
          }}
        />
      </DropdownMenuItem>
      <DropdownMenuItem {...disablingProps} style={{ pointerEvents: "none" }}>
        Max :
        <Input type="number"
          style={{ pointerEvents: "auto" }}
          defaultValue={(column.getFilterValue() as NumberRangeType)?.max}
          onChange={(e) => {
            const newValue = (e.target.value != '') ? Number(e.target.value) : undefined
            const min = (column.getFilterValue() as NumberRangeType)?.min
            column.setFilterValue({"min": min, "max": newValue})
            if (newValue == undefined && min == undefined) column.setFilterValue(undefined)
          }}
        />
      </DropdownMenuItem>
    </>
  );
}
