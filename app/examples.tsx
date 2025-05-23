"use client"

import { EnhancedTable } from "@/components/enhanced-table/composition-pattern"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Row } from "@tanstack/react-table"
import { useState } from "react"
import TableSkeleton from "../loading"
import { type Person, columns } from "./columns"

interface ExamplesProps {
  initialData: Person[]
}

export function Examples({ initialData }: ExamplesProps) {
  const [data, setData] = useState<Person[]>(initialData)
  const [dataCount, setDataCount] = useState<number>(1000)
  const [headerVariant, setHeaderVariant] = useState<"default" | "dropdown">("default")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function fetchData() {
    setIsLoading(true)
    const newData = await fetch(`http://localhost:3000/api/fake-data?count=${dataCount}`, {
      cache: "no-cache",
    }).then((res) => res.json())
    setData(newData)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-end space-x-2">
        <Input
          type="number"
          value={dataCount}
          onChange={(e) => setDataCount(Number(e.target.value))}
          className="w-32"
        />

        <Button onClick={fetchData} disabled={isLoading}>
          {isLoading ? "Loading..." : "Refresh Data"}
        </Button>
      </div>

      {!isLoading ? (
        <Tabs defaultValue="full-featured">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="full-featured">Full Featured</TabsTrigger>
            <TabsTrigger value="sortable">Sortable Columns</TabsTrigger>
            <TabsTrigger value="reorderable">Reorderable Rows</TabsTrigger>
          </TabsList>
          <TabsContent value="full-featured">
            <Card>
              <CardHeader>
                <CardTitle>Full Featured Table</CardTitle>
                <CardDescription>
                  This example showcases all available features of the EnhancedTable component.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedTable.Root
                  data={data}
                  columns={columns}
                  enableExpansion
                  enableSelection
                  enableEditing
                  enableColumnReorder
                >
                  <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-4">
                    <div className="flex flex-wrap gap-2">
                      <EnhancedTable.Toolbar.ViewOptions />
                      <EnhancedTable.Toolbar.ExpandCollapse />
                      <Select
                        value={headerVariant}
                        onValueChange={(value: "default" | "dropdown") => setHeaderVariant(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select header style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default Header</SelectItem>
                          <SelectItem value="dropdown">Dropdown Header</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2">
                      <EnhancedTable.Toolbar.ExportTable />
                      <EnhancedTable.Filters.Dialog />
                      <EnhancedTable.Filters.Sheet />
                      <EnhancedTable.Filters.Clear />
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <EnhancedTable.Table>
                      <EnhancedTable.Header variant={headerVariant} />
                      <EnhancedTable.Body customRowStyles={customRowStyles} />
                    </EnhancedTable.Table>
                  </div>
                  <EnhancedTable.Pagination />
                </EnhancedTable.Root>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sortable">
            <Card>
              <CardHeader>
                <CardTitle>Sortable Columns Table</CardTitle>
                <CardDescription>
                  This example demonstrates a table with sortable columns without row reordering.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedTable.Root data={data} columns={columns} enableColumnReorder>
                  <div className="flex justify-between items-center mb-4">
                    <EnhancedTable.Toolbar.ExportTable />
                  </div>
                  <div className="rounded-md border">
                    <EnhancedTable.Table>
                      <EnhancedTable.Header />
                      <EnhancedTable.Body customRowStyles={customRowStyles} />
                    </EnhancedTable.Table>
                  </div>
                  <EnhancedTable.Pagination />
                </EnhancedTable.Root>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reorderable">
            <Card>
              <CardHeader>
                <CardTitle>Reorderable Rows Table</CardTitle>
                <CardDescription>
                  This example shows a table with reorderable rows without column sorting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedTable.Root data={data} columns={columns} enableRowReorder rowReorderKey="lastName">
                  <div className="flex justify-between items-center mb-4">
                    <EnhancedTable.Toolbar.ExportTable />
                  </div>
                  <div className="rounded-md border">
                    <EnhancedTable.Table>
                      <EnhancedTable.Header />
                      <EnhancedTable.Body customRowStyles={customRowStyles} />
                    </EnhancedTable.Table>
                  </div>
                  <EnhancedTable.Pagination />
                </EnhancedTable.Root>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <TableSkeleton />
      )}
    </div>
  )
}

const customRowStyles = (row: Row<Person>) => {
  const baseStyles = "transition-colors hover:bg-opacity-20"
  const statusStyles = {
    active: "hover:bg-green-100 dark:hover:bg-green-900/50",
    inactive: "hover:bg-red-100 dark:hover:bg-red-900/50",
    pending: "hover:bg-yellow-100 dark:hover:bg-yellow-900/50",
  }

  return `${baseStyles} ${statusStyles[row.original.status]}`
}
