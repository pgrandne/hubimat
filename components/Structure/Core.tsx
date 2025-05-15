"use client";

import { cn } from "@/lib/utils";
import { Toaster } from "../ui/sonner";
import AdvancedTable from "./components/AdvancedTable";
import { Hardware, columns } from "./components/AdvancedTable/columns";

function getData(): Hardware[] {
  return [
    {
      id: "728ed52f",
      category: "Surveillance",
      object_type: {name: "Caméra", icon_source: "https://www.seekpng.com/png/detail/151-1518297_security-camera-icon-surveillance-camera-icon-white.png"},
      label: "Caméra 1",
      description: "Caméra pointant sur la porte d'entrée.",
      parameters: {type: "Surveillance", protocol: "Nedap", utl: 3},
      tests: true,
      instance: 1
    },
    {
      id: "d4z6a854d",
      category: "Accès",
      object_type: {name: "Porte", icon_source: "https://static.vecteezy.com/system/resources/previews/022/045/918/original/door-icon-style-vector.jpg"},
      label: "Porte d'entrée",
      description: "",
      parameters: {type: "Point d'accès", protocol: "Wiegand", utl: 56},
      tests: true,
      instance: 1
    },
    {
      id: "f65eza4h",
      category: "Surveillance",
      object_type: {name: "Caméra", icon_source: "https://www.seekpng.com/png/detail/151-1518297_security-camera-icon-surveillance-camera-icon-white.png"},
      label: "Caméras hall",
      description: "Caméras pointant sur le hall.",
      parameters: {type: "Surveillance", protocol: "Nedap", utl: 8},
      tests: false,
      instance: 3
    }
  ]
}

export const Core = () => {
  const data = getData()

  // <div
  //   className={cn("p-3 relative configuration-big-plan z-50 big-plan")}
  // ></div>
  return (
    <div className="container py-8" style={{width:'100%', margin:'0.8rem', borderWidth:'1px', borderRadius:'0.5em'}}>
        <AdvancedTable columns={columns} data={data}></AdvancedTable>
    </div>
  )

}
