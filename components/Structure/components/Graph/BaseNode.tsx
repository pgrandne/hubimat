import { memo, useState } from "react";
 
import { Handle, NodeProps, Position, useNodeId } from "@xyflow/react";
import { BaseNode } from "@/components/ui/base-node";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 
const BaseNodeDemo = memo(({ selected }: NodeProps) => {
    const nodeId = useNodeId()
    const [addElementDialogOpen, setAddElementDialogOpen] = useState(false)
    const [elementList, setElementList] = useState<string[]>([])

  return (
    <BaseNode selected={selected} className="p-2 w-[20rem] flex items-center flex-col">
            <Handle type="source" position={Position.Bottom} />
            <div className="m-3">Etape {nodeId}</div>

            {elementList.map((elementName, index) => {
                switch (elementName) {
                    case "Select":
                        return (
                            <Select key={`select_${index}`} defaultValue={"1"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {["1","2","3"].map(choix => <SelectItem key={`select_${index}_${choix}`} value={choix}>Choix {choix}</SelectItem>) }
                                </SelectContent>
                            </Select>
                        )
                    case "checkbox":
                        return <span><Checkbox key={`checkbox_${index}`} className="mr-2" />A cocher</span>
                    case "text":
                        return <Input key={`input_${index}`} type="text" placeholder="Enter text here" />
                    case "validate":
                        return <Button key={`validate_${index}`}>Valider</Button>
                    default:
                        return <></>;
                }
            }).map((e, index) => <>{e}<div key={`separator_${index}`} className="h-[1rem]"></div></>)}

            <Dialog open={addElementDialogOpen} onOpenChange={setAddElementDialogOpen}>
                <DialogTrigger className="w-[90%] h-[2.5rem] mt-3 border rounded-md text-lg">
                    +
                    {/* <Button variant={'outline'} className="w-full"></Button> */}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Ajouter un élément</DialogTitle>
                    <DialogDescription className="w-full flex h-[20rem]">
                        {["Select", "checkbox", "text", "validate"].map(elementName => <Button key={`button_${elementName}`} variant={'outline'} className="w-[5rem] h-[5rem] m-auto"
                            onClick={()=>{ setElementList(elementList.concat([elementName])); setAddElementDialogOpen(false)}}
                        >
                            {elementName}
                        </Button>)}
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Handle type="target" position={Position.Top} />
    </BaseNode>
  );
});

BaseNodeDemo.displayName = "BaseNode"
export default BaseNodeDemo;