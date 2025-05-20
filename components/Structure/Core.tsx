"use client";

import { cn } from "@/lib/utils";
import AdvancedTable from "./components/AdvancedTable";
import exampleData4 from './../../data/data_Exemple4.json'
import { actionColumn, ArrayFilterFunction, DateInRangeFilter, selectColumn } from "./components/AdvancedTable/ColumnHelper";
import HeaderCell from "./components/AdvancedTable/HeaderCell";
import { Button } from "../ui/button";
import { useState } from 'react';
import { getData1 } from "@/data/exemple1";


// Define data type
export type Hardware = {
  id: string
  category: string
  hardwareType: HardwareType
  label: string
  description: string
  hardwareParameters: HardwareParameters
  tests: boolean
  instance: number
}

export type HardwareType = {
  name: string,
  icon_source: string,
  toString: Function
}

export type HardwareParameters = {
  type: string,
  protocol: string,
  utl: number
}

// get the data and map it to its type (if we don't do that fields will be undefined when trying to cast to a custom type)
function getData4(): Hardware[] {
  return exampleData4.map((content): Hardware => content)
}

export const Core = () => {
  const data1 = getData1()
  // const data2 = getData2()
  // const data3 = getData3()
  const data4 = getData4()
  const [exampleChoice, setexampleChoice] = useState(1);
  // <div
  //   className={cn("p-3 relative configuration-big-plan z-50 big-plan")}
  // ></div>
  return (
    <div className="container py-8" style={{width:'100%', margin:'0.8rem', borderWidth:'1px', borderRadius:'0.5em'}}>
        
          { [1,2,3,4].map((i) =>
            <Button variant="outline" onClick={() => setexampleChoice(i)} style={{marginRight:"1em", marginBottom:"2em"}}>
              Exemple {i}
            </Button>)
          }
        
        {(exampleChoice == 1) && <AdvancedTable columns={
          // Build the table here following tanstack ColumnDef doc
          // Prebuilt components are available in ColumnHelper file :
          //    - selectColumn : allow each row to be selected with a checkbox
          //    - actionColumn : generic row actions
          //    - <HeaderCell table={} column={} /> : A ready to use header cell with sorting, filtering
          //      and grouping options (props enableSorting, enableFiltering, enableGrouping)
          // If we want to be able to have mutliple filters (searching different values at the same time)
          // we have to use the prebuilt ArrayFilterFunction function.
          // If the column values are of type Date, use DateInRangeFilter filter.
          // This implementation allows for complete customisation. Especially on how to render cells,
          // enabling custom objects with custom rendering.
          [
            selectColumn,
            {
              accessorKey: "category",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Catégorie (Device type Group)" />,
            },
            {
              accessorKey: "hardwareType",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Icône et Type d'objet" />,
              aggregationFn: (columnId, leafRows, childRows) => "",
              cell: ({ row }) => {
                const hardwareType: HardwareType = row.getValue("hardwareType")
                return <span><img src={hardwareType.icon_source} style={{maxWidth:'50px', display: 'inline', marginRight:'1em'}}></img>{hardwareType.name}</span>
              }
            },
            {
              accessorKey: "label",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Label de l'objet" />,
            },
            {
              accessorKey: "description",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Description" enableSorting={true} enableFiltering={false} enableGrouping={false} />,
            },
            {
              accessorKey: "hardwareParameters",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Paramètre(s) Interface" />,
              aggregationFn: (columnId, leafRows, childRows) => "",
              cell: ({ row }) => { 
                const hardwareParameters: HardwareParameters = row.getValue("hardwareParameters")
                return hardwareParameters.type + " - " + hardwareParameters.protocol + " | "+ hardwareParameters.utl
              }
            },
            {
              accessorKey: "tests",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Tests" />,
              cell: ({ row }) => {
                const testsOK: boolean = row.getValue("tests")
                return testsOK ? "☑" : "☒"
              }
            },
            {
              accessorKey: "instance",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Instance" />
            },
            actionColumn
          ]
        } data={data4}></AdvancedTable> }
        
        {(exampleChoice == 2) && <AdvancedTable columns={
          [
            selectColumn,
            {
              accessorKey: "date",
              filterFn: DateInRangeFilter,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Date" />,
            },
            {
              accessorKey: "DeviceType",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Type d'appareil" />,
            },
            {
              accessorKey: "Device",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Appareil" />,
            },
            {
              accessorKey: "Action",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Action effectuée" />
            },
            {
              accessorKey: "UserFirstName",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Prénom" />
            },
            {
              accessorKey: "UserLastName",
              filterFn: ArrayFilterFunction,
              header: ({ table, column }) => <HeaderCell table={table} column={column} name="Nom" />
            },
            actionColumn
          ]
        } data={data1}></AdvancedTable> }
    </div>
  )

}
