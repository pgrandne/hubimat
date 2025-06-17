"use client";

import React, { useState } from 'react';
import ReactFlowCust from './components/Graph/ReactFlowCust';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { }, type: "baseNode", selectable: false },
];

export const Core = () => {
  const [nodes, setNodes] = useState(initialNodes)

  return (
    <div className="container py-8 flex" style={{ flexFlow:'column', width: '100%', margin: '0.8rem', borderWidth: '1px', borderRadius: '0.5em' }}>
      <ReactFlowCust nodes={nodes} edges={ Array.from({ length: nodes.length-1}, (_, index) => ({ id: `e${index+1}-${index+2}`, source: String(index+1), target: String(index+2) })) } createNode={ async (posY: number) => setNodes(nodes.concat({ id: String(nodes.length+1), position: { x: 0, y: posY+80 }, data: { }, type: "baseNode", selectable: false })) } />
    </div>
  )

}

// Auto-layout example https://reactflow.dev/examples/layout/auto-layout