import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Column } from "@tanstack/react-table";
import { useState } from "react";
import { unknown } from "zod";

const toDate = (unknown: any): Date | undefined => {
if (typeof unknown?.getMonth === 'function') {
    try {
    return unknown
} catch (error) {}
}
return undefined
}
const toDateRange = (unknown: any) => {
    return {"start": unknown?.start, "end": unknown?.end}
}

export type DateRangeType = {"start": Date | undefined, "end": Date | undefined}

export const DateFilterFunction = (row: any, columnId: string, filterValue: Date | DateRangeType) => {
    const date : Date = row.original[columnId]
    const filterValueDate = toDate(filterValue)
    const filterValueRange = toDateRange(filterValue)

    return filterValueDate != undefined
      ? date.getDate() === filterValueDate.getDate() && date.getMonth() === filterValueDate.getMonth() && date.getFullYear() == filterValueDate.getFullYear()
      : filterValueRange.start <= date && date <= filterValueRange.end
}

export const isDate = (object: any) : boolean => (toDate(object) != undefined)

export default function FilterList({
  column,
}: {
  column: Column<any, unknown>;
}) {
  const [filterSelected, setSelectedFilter] = useState(column.getFilterValue() == undefined ? "all" : toDateRange(column.getFilterValue()).start != undefined ? "range" : "specific");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(toDate(column.getFilterValue()));
  const [selectedRange, setSelectedRange] = useState<DateRangeType>(toDateRange(column.getFilterValue()))


  console.log(selectedDate, selectedRange)
  return (
    <>
      <Select
        onValueChange={
            (value) => {
                if (value == "all") column.setFilterValue(undefined)
                if (value == "range") column.setFilterValue([undefined, undefined])
                setSelectedFilter(value)
            }
        }
        defaultValue={filterSelected}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Sélectionner tout</SelectItem>
            <SelectItem value="specific">Date spécifique</SelectItem>
            <SelectItem value="range">Période</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {filterSelected == "specific" && (
        <DatePicker setDate={(date) => {
            setSelectedDate(date)
            column.setFilterValue(date)
        }} date={selectedDate}></DatePicker>
      )}
      {filterSelected == "range" && (
        <>
        <DatePicker setDate={(date) => {
            setSelectedRange({"start": date, "end": selectedRange.end})
            column.setFilterValue({"start": date, "end": selectedRange.end})
            }} date={selectedRange.start}></DatePicker>
        <DatePicker setDate={(date) => {
            setSelectedRange({"start": selectedRange.start, "end": date})
            column.setFilterValue({"start": selectedRange.start, "end": date})
        }} date={selectedRange.end}></DatePicker>
      </>)}
    </>
)
}
