"use client";

import { Button } from "../ui/button";
import { useState } from 'react';
import { getData1 } from "@/data/exemple1";
import AdvancedTable from "./components/AdvancedTable";
import AdvancedTableCaption from "./components/AdvancedTable/AdvancedTableCaption";
import AdvancedTableCell from "./components/AdvancedTable/AdvancedTableCell";
import AdvancedTableHead, { sortType } from "./components/AdvancedTable/AdvancedTableHead";
import AdvancedTableHeader from "./components/AdvancedTable/AdvancedTableHeader";
import CellRawValue from "./components/AdvancedTable/CellRawValue";
import AdvancedTableBodyRow from "./components/AdvancedTable/AdvancedTableBodyRow";
import { Calendar, CircuitBoard, MemoryStick, MousePointerClick, User } from "lucide-react";
import { getData4, HardwareParameters, HardwareType } from "@/data/exemple4";


const defaultMethodFilter = () => {}


export const Core = () => {
  const data1 = getData1()
  // const data2 = getData2()
  // const data3 = getData3()
  const data4 = getData4()
  const [exampleChoice, setexampleChoice] = useState(1);

  return (
    <div className="container py-8 flex" style={{ flexFlow:'column', width: '100%', margin: '0.8rem', borderWidth: '1px', borderRadius: '0.5em' }}>
      <div>
        {[1, 2, 3, 4].map((i) =>
          <Button variant="outline" onClick={() => setexampleChoice(i)} style={{ marginRight: "1em", marginBottom: "2em" }}>
            Exemple {i}
          </Button>)
        }
      </div>
      
      
      { (exampleChoice==1) &&
      <AdvancedTable data={getData1()} enableGeneralSearch={true} enableRowSelection={true}>
        <AdvancedTableCaption>A list of Data.</AdvancedTableCaption>
        <AdvancedTableHeader>
          <AdvancedTableHead accessor="date">Date</AdvancedTableHead>
          <AdvancedTableHead accessor="DeviceType">Type d'appareil</AdvancedTableHead>
          <AdvancedTableHead accessor="Device">Appareil</AdvancedTableHead>
          <AdvancedTableHead accessor="Action">Action effectuée</AdvancedTableHead>
          <AdvancedTableHead accessor="UserFirstName">Prénom</AdvancedTableHead>
          <AdvancedTableHead accessor="UserLastName">Nom</AdvancedTableHead>
        </AdvancedTableHeader>
      </AdvancedTable>}

      { (exampleChoice==2) &&
      <AdvancedTable data={getData1()} enableGeneralSearch={true} enableRowSelection={true}>
        <AdvancedTableCaption>A list of Data.</AdvancedTableCaption>
        <AdvancedTableHeader>
          <AdvancedTableHead accessor="date" defaultSort={sortType.MinortoMayor} icon={<Calendar />}>Date</AdvancedTableHead>
          <AdvancedTableHead accessor="DeviceType" enableFiltering={false} enableSorting={false} enableGrouping={false} icon={<CircuitBoard />}>Type d'appareil</AdvancedTableHead>
          <AdvancedTableHead accessor="Device" defaultFilter={defaultMethodFilter} icon={<MemoryStick />}>Appareil</AdvancedTableHead>
          <AdvancedTableHead accessor="Action" enableFiltering={false} className="text-right" icon={<MousePointerClick />}>Action effectuée</AdvancedTableHead>
          <AdvancedTableHead accessor="UserFirstName" icon={<User />}>Prénom</AdvancedTableHead>
          <AdvancedTableHead accessor="UserLastName" icon={<User />}>Nom</AdvancedTableHead>
        </AdvancedTableHeader>
        <AdvancedTableBodyRow>
          <AdvancedTableCell accessor="date" valueEditFunction={(date: Date) => date.toLocaleString()} />
          <AdvancedTableCell accessor="DeviceType">--&gt;<CellRawValue/>&lt;--</AdvancedTableCell>
          <AdvancedTableCell accessor="Device" valueEditFunction={(deviceType:string) => {
            return <div key="thisneedsakey">coucou<br></br>{deviceType}<br></br></div>
          }}>
            <CellRawValue/>
            salut
          </AdvancedTableCell>
          <AdvancedTableCell accessor="Action" className="text-right"/>
        </AdvancedTableBodyRow>
      </AdvancedTable>}

      { (exampleChoice==3) &&
      <AdvancedTable data={[]} enableGeneralSearch={true} enableRowSelection={true}>
        <AdvancedTableCaption>A list of Data.</AdvancedTableCaption>
        <AdvancedTableHeader>
          <AdvancedTableHead accessor="date">Date</AdvancedTableHead>
          <AdvancedTableHead accessor="DeviceType">Type d'appareil</AdvancedTableHead>
          <AdvancedTableHead accessor="Device">Appareil</AdvancedTableHead>
          <AdvancedTableHead accessor="Action">Action effectuée</AdvancedTableHead>
        </AdvancedTableHeader>
      </AdvancedTable>}

      { (exampleChoice==4) &&
      <AdvancedTable data={getData4()} enableGeneralSearch={true} enableRowSelection={true}>
        <AdvancedTableCaption>A list of Data.</AdvancedTableCaption>
        <AdvancedTableHeader>
          <AdvancedTableHead accessor="id" hidden={true}>ID</AdvancedTableHead>
          <AdvancedTableHead accessor="category">Catégorie (Device type Group)</AdvancedTableHead>
          <AdvancedTableHead accessor="hardwareType" displayValueFunction={(hardwareType:HardwareType) => hardwareType.name}>Icône et Type d'objet</AdvancedTableHead>
          <AdvancedTableHead accessor="label">Label de l'objet</AdvancedTableHead>
          <AdvancedTableHead accessor="description">Description</AdvancedTableHead>
          <AdvancedTableHead accessor="hardwareParameters">Paramètre(s) Interface</AdvancedTableHead>
          <AdvancedTableHead accessor="tests">Tests</AdvancedTableHead>
          <AdvancedTableHead accessor="instance">Instance</AdvancedTableHead>
        </AdvancedTableHeader>
        <AdvancedTableBodyRow>
          <AdvancedTableCell
            accessor="hardwareType"
            valueEditFunction={(hardwareType:HardwareType) => { return <>
                <img src={hardwareType.icon_source} className="mr-2" style={{maxWidth:'50px'}} />
                {hardwareType.name}
              </> } }
            sortingFunction={(valueA: HardwareType, valueB: HardwareType) => { return (valueA.name < valueB.name) ? -1 : (valueA.name > valueB.name) ? 1 : 0 }}
          />
          <AdvancedTableCell
            accessor="hardwareParameters"
            valueEditFunction={(hardwareParameters:HardwareParameters) => hardwareParameters.type + " - " + hardwareParameters.protocol + " | "+ hardwareParameters.utl}
            sortingFunction={(valueA: HardwareParameters, valueB: HardwareParameters) => { return (valueA.type < valueB.type) ? -1 : (valueA.type > valueB.type) ? 1 : 0 }}
          />
        </AdvancedTableBodyRow>
      </AdvancedTable>}
    </div>
  )

}