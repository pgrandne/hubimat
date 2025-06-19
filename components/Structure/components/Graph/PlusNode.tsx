import { memo, useEffect, useRef, useState } from "react";
 
import { Handle, NodeProps, Position, useReactFlow, ConnectionLineType } from "@xyflow/react";
import { BaseNode } from "@/components/ui/base-node";

const PlusNode = memo(({ data, selected, positionAbsoluteX, positionAbsoluteY, id, width, height }: NodeProps) => {
  const { setNodes, setEdges } = useReactFlow();

  const handleAdd = () => {
    const newNode = {
      id: `${Date.now()}`,
      data: { visibility: 'invisible' },
      position: { x: positionAbsoluteX - 160 + (width?width/2:0), y: positionAbsoluteY + (height?height/2:0)},
      type: 'stepNode',
    };
    const newEdge = {id:`e${newNode.id}-${id}`, source:newNode.id, target:id, type: ConnectionLineType.SmoothStep, hidden: true};

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds.map(ed => ed.target===id ? {...ed, target:newNode.id} : ed ), newEdge]);
  };

  return (
      <BaseNode selected={selected} onClick={handleAdd} className="p-2 w-[3rem] aspect-square rounded-full flex items-center flex-col cursor-pointer bg-transparent border-dashed">
        <Handle type="target" position={Position.Top} isConnectable={false} className="opacity-0">LBLBLB</Handle>
        <Handle type="source" position={Position.Bottom} isConnectable={false} className="opacity-0"/>
        <div className="flex justify-center items-center w-full h-full text-xl">
          +
        </div>
      </BaseNode>
  );
});

PlusNode.displayName = "PlusNode"
export default PlusNode;