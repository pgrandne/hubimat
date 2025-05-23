"use client";

import { Button } from "../ui/button";
import { useState } from 'react';
import { getData1 } from "@/data/exemple1";
import exampleData4 from '@/data/data_Exemple4.json'
import AdvancedTable from "./components/AdvancedTable";
import AdvancedTableCaption from "./components/AdvancedTable/AdvancedTableCaption";
import AdvancedTableCell from "./components/AdvancedTable/AdvancedTableCell";
import AdvancedTableHead, { sortType } from "./components/AdvancedTable/AdvancedTableHead";
import AdvancedTableHeader from "./components/AdvancedTable/AdvancedTableHeader";
import AdvancedTableRow from "./components/AdvancedTable/AdvancedTableRow";
import CellRawValue from "./components/AdvancedTable/CellRawValue";
import AdvancedTableBodyRow from "./components/AdvancedTable/AdvancedTableBodyRow";
import { Calendar, CircuitBoard, MemoryStick, MousePointerClick, User } from "lucide-react";


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



const defaultMethodFilter = () => {}

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

  return (
    <div className="container py-8" style={{ width: '100%', margin: '0.8rem', borderWidth: '1px', borderRadius: '0.5em' }}>
      {[1, 2, 3, 4].map((i) =>
        <Button variant="outline" onClick={() => setexampleChoice(i)} style={{ marginRight: "1em", marginBottom: "2em" }}>
          Exemple {i}
        </Button>)
      }
      
      { (exampleChoice==1) &&
      <AdvancedTable data={getData1()} enableGeneralSearch={true} enableRowSelection={true}>
        <AdvancedTableCaption>A list of Data.</AdvancedTableCaption>
        <AdvancedTableHeader>
          <AdvancedTableHead>Date</AdvancedTableHead>
          <AdvancedTableHead>Type d'appareil</AdvancedTableHead>
          <AdvancedTableHead>Appareil</AdvancedTableHead>
          <AdvancedTableHead>Action effectuée</AdvancedTableHead>
          <AdvancedTableHead>Prénom</AdvancedTableHead>
          <AdvancedTableHead>Nom</AdvancedTableHead>
        </AdvancedTableHeader>
        <AdvancedTableBodyRow>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
        </AdvancedTableBodyRow>
      </AdvancedTable>}

      { (exampleChoice==2) &&
      <AdvancedTable data={getData1()} enableGeneralSearch={true} enableRowSelection={true}>
        <AdvancedTableCaption>A list of Data.</AdvancedTableCaption>
        <AdvancedTableHeader>
          <AdvancedTableHead defaultSort={sortType.MinortoMayor} icon={<Calendar />}>Date</AdvancedTableHead>
          <AdvancedTableHead enableFiltering={false} enableSorting={false} enableGrouping={false} icon={<CircuitBoard />}>Type d'appareil</AdvancedTableHead>
          <AdvancedTableHead defaultFilter={defaultMethodFilter} icon={<MemoryStick />}>Appareil</AdvancedTableHead>
          <AdvancedTableHead enableFiltering={false} className="text-right" icon={<MousePointerClick />}>Action effectuée</AdvancedTableHead>
          <AdvancedTableHead icon={<User />}>Prénom</AdvancedTableHead>
          <AdvancedTableHead icon={<User />}>Nom</AdvancedTableHead>
        </AdvancedTableHeader>
        <AdvancedTableBodyRow>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell>--&gt;<CellRawValue/>&lt;--</AdvancedTableCell>
          <AdvancedTableCell valueEditFunction={(deviceType:string)=> { return <div>coucou<br></br>{deviceType}<br></br></div> }}><CellRawValue/>salut</AdvancedTableCell>
          <AdvancedTableCell className="text-right"></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
        </AdvancedTableBodyRow>
      </AdvancedTable>}

      { (exampleChoice==4) &&
      <AdvancedTable data={getData4()} enableGeneralSearch={true} enableRowSelection={true}>
        <AdvancedTableCaption>A list of Data.</AdvancedTableCaption>
        <AdvancedTableHeader>
          <AdvancedTableHead hidden={true}>ID</AdvancedTableHead>
          <AdvancedTableHead>Catégorie (Device type Group)</AdvancedTableHead>
          <AdvancedTableHead displayValueFunction={(hardwareType:HardwareType) => hardwareType.name}>Icône et Type d'objet</AdvancedTableHead>
          <AdvancedTableHead>Label de l'objet</AdvancedTableHead>
          <AdvancedTableHead>Description</AdvancedTableHead>
          <AdvancedTableHead>Paramètre(s) Interface</AdvancedTableHead>
          <AdvancedTableHead>Tests</AdvancedTableHead>
          <AdvancedTableHead>Instance</AdvancedTableHead>
        </AdvancedTableHeader>
        <AdvancedTableBodyRow>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell 
            valueEditFunction={(hardwareType:HardwareType) => { return <div className="text-left ml-4">
                <img src={hardwareType.icon_source} style={{maxWidth:'50px', display: 'inline', marginRight:'1em'}} />
                {hardwareType.name}
              </div> } }
            sortingFunction={(valueA: HardwareType, valueB: HardwareType) => { return (valueA.name < valueB.name) ? -1 : (valueA.name > valueB.name) ? 1 : 0 }}
          ></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell
            valueEditFunction={(hardwareParameters:HardwareParameters) => hardwareParameters.type + " - " + hardwareParameters.protocol + " | "+ hardwareParameters.utl}
            sortingFunction={(valueA: HardwareParameters, valueB: HardwareParameters) => { return (valueA.type < valueB.type) ? -1 : (valueA.type > valueB.type) ? 1 : 0 }}
          ></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
          <AdvancedTableCell></AdvancedTableCell>
        </AdvancedTableBodyRow>
      </AdvancedTable>}
    </div>
  )

}