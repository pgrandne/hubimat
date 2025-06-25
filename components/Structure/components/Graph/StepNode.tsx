import { memo, useEffect, useRef, useState } from "react";

import { Handle, NodeProps, Position } from "@xyflow/react";
import { BaseNode } from "@/components/ui/base-node";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EditableText from "./EditableText";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { ChevronDown, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

enum FormElement {
  checklist = "Check-list",
  boolean = "Boolean",
  radio = "Radio",
  select = "Select",
  checkbox = "Check-box",
  text = "Texte"
}

const StepNode = memo(({ id, data, selected, positionAbsoluteY }: NodeProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (nodeRef.current) {
        console.log('Loaded StepNode ', id);
      }
    }, [id]);

    const [open, setOpen] = useState(true)
    
    return (
        <BaseNode ref={nodeRef} selected={selected} className={cn("p-2 w-[20rem] flex cursor-default hover:ring-0", data.visibility??"")}>
          <Handle type="target" position={Position.Top} isConnectable={false} className="opacity-0"/>
          <Handle type="source" position={Position.Bottom} isConnectable={false} className="opacity-0"/>

          <CircleCheck className="mt-1" />
          <div className="flex items-center flex-col w-full">
            <EditableText placeholder="Ajouter le nom de l'étape"/>
            { open && <>
              <div className="w-full border border-transparent hover:border-white">
                <RadioGroup key={`radio`} defaultValue="option-one" className="mr-auto ml-4 gap-0">
                  <EditableText placeholder="Ajouter un titre" />
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" className="pointer-events-none" />
                      <Label htmlFor="option-one" onClick={e => e.preventDefault()}><EditableText placeholder={"Choix un"} /></Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two" onClick={e => e.preventDefault()}><EditableText placeholder={"Choix deux"} /></Label>
                  </div>
                  <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three" onClick={e => e.preventDefault()}><EditableText placeholder={"Choix trois"} /></Label>
                  </div>
                </RadioGroup>
              </div>
            </> }
          </div>
          <Button variant="ghost" className="rounded-full py-0" onClick={() => setOpen(!open)}>
            <ChevronDown
              className="h-4 w-4"
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0)",
                transition: "all 0.2s linear",
              }}
            />
          </Button>
          
        </BaseNode>
    );
});

StepNode.displayName = "StepNode"
export default StepNode;