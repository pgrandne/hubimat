"use client";

import React from 'react';
import { ReactFlow } from '@xyflow/react';
import BaseNodeDemo from './components/Graph/BaseNode';

import '@xyflow/react/dist/style.css';


const nodeTypes = {
  baseNode: BaseNodeDemo,
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { }, type: "baseNode", selectable: false },
  { id: '2', position: { x: 0, y: 300 }, data: { }, type: "baseNode", selectable: false },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export const Core = () => {

  return (
    <div className="container py-8 flex" style={{ flexFlow:'column', width: '100%', margin: '0.8rem', borderWidth: '1px', borderRadius: '0.5em' }}>
      <ReactFlow nodes={initialNodes} nodeTypes={nodeTypes} edges={initialEdges} proOptions={{ hideAttribution: true }} />
    </div>
  )

}