import { Badge } from "@/components/ui/badge"
import { Log } from "@/data/example1"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Activity, Briefcase, Calendar, TrendingUp, User } from "lucide-react"

export const columns: ColumnDef<Log>[] = [
  {
    id: "date",
    accessorKey: "date",
    header: () => (
      <span className="flex items-center gap-2">
        <Calendar />
        Date
      </span>
    ),
    accessorFn: (row) => format(new Date(row.date), "MM/dd/yyyy"),
    cell: ({ row }) => <span className="text-sm text-gray-500">{row.getValue("date")}</span>,
    filterFn: "filterRows",
    meta: { export: { pdf: { header: "Date" } } },
  },
  {
    id: "DeviceType",
    accessorKey: "DeviceType",
    header: () => (
      <span className="flex items-center gap-2">
        <User />
        Type d'appareil
      </span>
    ),
    meta: { align: "center", export: { pdf: { header: "Type d'appareil" } } },
    filterFn: "filterRows",
  },
  {
    id: "Device",
    accessorKey: "Device",
    header: "Appareil",
    meta: { align: "center" },
    filterFn: "filterRows",
  },
  {
    id: "Action",
    accessorKey: "Action",
    header: "Action effectuée",
    cell: ({ row }) => <span className="font-semibold text-blue-600">{row.getValue("Action")}</span>,
    meta: { align: "center", export: { pdf: { header: "Action" } } },
    filterFn: "filterRows",
  },
  {
    id: "UserFirstName",
    accessorKey: "UserFirstName",
    header: () => (
      <span className="flex items-center gap-2">
        <Activity />
        Prénom
      </span>
    ),
    meta: { align: "center", export: { pdf: { header: "Prénom" } } },
    filterFn: "filterRows",
  },
  {
    id: "UserLastName",
    accessorKey: "UserLastName",
    header: () => (
      <span className="flex items-center gap-2">
        <Briefcase />
        Nom
      </span>
    ),
    cell: ({ row }) => {
      const name = row.getValue("UserLastName") as string
      const iconClass = "w-5 h-5 mr-2"
      return (
        <div className="flex items-center font-medium">
          <Activity className={iconClass} />
          {name}
        </div>
      )
    },
    filterFn: "filterRows",
    meta: { export: { pdf: { header: "Department" } } },
  },
]
