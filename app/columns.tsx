import { Badge } from "@/components/ui/badge"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Activity, Briefcase, Calendar, TrendingUp, User } from "lucide-react"

export interface Person {
  id: number
  rstName: string
  lastName: string
  age: number
  visits: number
  status: "active" | "inactive" | "pending"
  progress: number
  department: "engineering" | "marketing" | "sales" | "design"
  createdAt: string
  avatar: string
}

export const columns: ColumnDef<Person>[] = [
  {
    id: "avatar",
    header: "",
    accessorKey: "avatar",
    cell: ({ row }) => (
      <img src={row.original.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" />
    ),
    filterFn: "filterRows",
    meta: { export: { pdf: false } },
  },
  {
    id: "firstName",
    accessorKey: "firstName",
    header: () => (
      <span className="flex items-center gap-2">
        <User />
        First Name
      </span>
    ),
    meta: { align: "center", export: { pdf: { header: "First Name" } } },
    filterFn: "filterRows",
  },
  {
    id: "lastName",
    accessorKey: "lastName",
    header: "Last Name",
    meta: { align: "center" },
    filterFn: "filterRows",
  },
  {
    id: "age",
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <span className="font-semibold text-blue-600">{row.getValue("age")}</span>,
    meta: { align: "center", export: { pdf: { header: "Age" } } },
    filterFn: "filterRows",
  },
  {
    id: "visits",
    accessorKey: "visits",
    header: () => (
      <span className="flex items-center gap-2">
        <Activity />
        Visits
      </span>
    ),
    meta: { align: "center", export: { pdf: { header: "Visits" } } },
    filterFn: "filterRows",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("status")} className="capitalize">
        {row.getValue("status")}
      </Badge>
    ),
    filterFn: "filterRows",
    meta: { export: { pdf: { header: "Status" } } },
  },
  {
    id: "progress",
    accessorKey: "progress",
    header: () => (
      <span className="flex items-center gap-2">
        <TrendingUp />
        Progress
      </span>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${row.getValue("progress")}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{row.getValue("progress")}%</span>
      </div>
    ),
    filterFn: "filterRows",
    meta: { export: { pdf: { header: "Progress" } } },
  },
  {
    id: "department",
    accessorKey: "department",
    header: () => (
      <span className="flex items-center gap-2">
        <Briefcase />
        Department
      </span>
    ),
    cell: ({ row }) => {
      const department = row.getValue("department") as string
      const iconClass = "w-5 h-5 mr-2"
      const icons = {
        engineering: <Activity className={iconClass} />,
        marketing: <TrendingUp className={iconClass} />,
        sales: <User className={iconClass} />,
        design: <Calendar className={iconClass} />,
      }
      return (
        <div className="flex items-center font-medium">
          {icons[department as keyof typeof icons]}
          {department}
        </div>
      )
    },
    filterFn: "filterRows",
    meta: { export: { pdf: { header: "Department" } } },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => (
      <span className="flex items-center gap-2">
        <Calendar />
        Created At
      </span>
    ),
    accessorFn: (row) => format(new Date(row.createdAt), "MM/dd/yyyy"),
    cell: ({ row }) => <span className="text-sm text-gray-500">{row.getValue("createdAt")}</span>,
    filterFn: "filterRows",
    meta: { export: { pdf: { header: "Created At" } } },
  },
]
