import { memo, useRef, useState } from "react";
 
import { Handle, NodeProps, Position } from "@xyflow/react";
import { BaseNode } from "@/components/ui/base-node";

enum FormElement {
  checklist = "Check-list",
  boolean = "Boolean",
  radio = "Radio",
  select = "Select",
  checkbox = "Check-box",
  text = "Texte"
}

const StepNode = memo(({ data, selected, positionAbsoluteY }: NodeProps) => {
    
    return (
        <BaseNode selected={selected} className="p-2 w-[20rem] flex items-center flex-col cursor-default">
                <Handle type="target" position={Position.Top} isConnectable={false} className="opacity-0"/>
                <Handle type="source" position={Position.Bottom} isConnectable={false} className="opacity-0"/>
        </BaseNode>
    );
});

StepNode.displayName = "StepNode"
export default StepNode;