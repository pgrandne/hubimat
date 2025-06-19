import { memo, useEffect, useRef, useState } from "react";

import { Handle, NodeProps, Position } from "@xyflow/react";
import { BaseNode } from "@/components/ui/base-node";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EditableText from "./EditableText";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
    
    return (
        <BaseNode ref={nodeRef} selected={selected} className={cn("p-2 w-[20rem] flex items-center flex-col cursor-default hover:ring-0", data.visibility??"")}>
                <Handle type="target" position={Position.Top} isConnectable={false} className="opacity-0"/>
                <Handle type="source" position={Position.Bottom} isConnectable={false} className="opacity-0"/>

                <div className="w-full border border-transparent hover:border-white">
                  <RadioGroup key={`radio`} defaultValue="option-one" className="opacity-50 mr-auto ml-4 mb-3">
                    <EditableText initText={"Titre"} />
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" className="pointer-events-none" />
                        <Label htmlFor="option-one" onClick={e => e.preventDefault()}><EditableText initText={"Choix un"} /></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two" onClick={e => e.preventDefault()}><EditableText initText={"Choix deux"} /></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three" onClick={e => e.preventDefault()}><EditableText initText={"Choix trois"} /></Label>
                    </div>
                  </RadioGroup>
                </div>

        </BaseNode>
    );
});

StepNode.displayName = "StepNode"
export default StepNode;