import { Calendar } from "@/components/ui/calendar";
import { Column } from "@tanstack/react-table";

export default function FilterList({ column }: {column: Column<any, unknown>}) {
    return (
        <Calendar></Calendar>
    );
}