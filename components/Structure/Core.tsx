"use client";

import { ConnectionLineType, ReactFlow, useEdgesState, useNodesState, useStore } from '@xyflow/react';
import React, { useEffect, useState } from 'react';
import StepNode from './components/Graph/StepNode';
import PlusNode from './components/Graph/PlusNode';
import dagre from '@dagrejs/dagre';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  stepNode: StepNode,
  plusNode: PlusNode
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { }, type: "stepNode", selectable: false },
  { id: '2', position: { x: 0, y: 0 }, data: { }, type: "plusNode", selectable: false },
  { id: '3', position: { x: 0, y: 0 }, data: { }, type: "stepNode", selectable: false },
  { id: '4', position: { x: 0, y: 0 }, data: { }, type: "plusNode", selectable: false },
];
const connectionLineType = ConnectionLineType.SmoothStep
const initialEdges = [
  {id:'e1-2', source:'1', target:'2', type: connectionLineType, hidden:true},
  {id:'e1-3', source:'1', target:'3', type: connectionLineType, hidden:true},
  {id:'e3-4', source:'3', target:'4', type: connectionLineType, hidden:true},
  {id:'e1-4', source:'1', target:'4', type: connectionLineType, hidden:true},
]

const useNodesDimensions = () => {
  return useStore((state) => {
    const nodes = state.nodes
    return nodes.map(
      node => node?.measured?.width && node?.measured?.height
        ? { key: node.id, width: node.measured.width, height: node.measured.height }
        : null
    )
  })
}

const getLayoutedElements = (nodes: any[], edges: {id:string, source:string, target:string, type:ConnectionLineType, hidden:boolean}[], nodeSizes: {[key: string]: {width:number, height:number}} = {}, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, node?.measured);
  });
 
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
 
  dagre.layout(dagreGraph);
 
  const newNodes = nodes.map((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      position: {
        x: nodeWithPosition.x - (node.measured.width/2),
        y: nodeWithPosition.y - (node.measured.height/2),
      },
      data: {
        ...node.data,
        visibility:"visible"
      }
    };
    return newNode;
  });
 
  return { nodes: newNodes, edges: edges.map(e => ({...e, hidden: false})) };
};

function dimArraysEqual<T>(a: any[], b: any[]): boolean {
  return a.length === b.length && a.every((val, i) => val.width === b[i].width && val.height === b[i].height);
}

export const Core = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodesDim, setNodesDim] = useState<{ width: number; height: number; }[]>([])
  
  // const onConnect = useCallback(
  //   (params: any) =>
  //     setEdges((eds) =>
  //       addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
  //     ),
  //   [setEdges],
  // );

  // const onLayout = useCallback(
  //   (direction: string | undefined) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //       nodes,
  //       edges,
  //       direction,
  //     );
 
  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges, setNodes, setEdges],
  // );
  
  const nodesDimensions = useNodesDimensions();

  useEffect(() => {
    if (nodesDimensions.every(dim => dim != null) && !dimArraysEqual(nodesDimensions, nodesDim) ) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        Object.assign({}, ...nodesDimensions.map(v => ({[v.key]:{width:v.width, height:v.height}})))
      )
      setNodesDim(nodesDimensions)
      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    }
  }, [edges, nodes, nodesDim, nodesDimensions, setEdges, setNodes])

  return (
    <div className="container py-8 flex" style={{ flexFlow:'column', width: '100%', margin: '0.8rem', borderWidth: '1px', borderRadius: '0.5em' }}>

      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        proOptions={{ hideAttribution: true }}
      />
      
    </div>
  )

}