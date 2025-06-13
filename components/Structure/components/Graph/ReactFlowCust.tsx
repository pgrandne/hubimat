import { Edge, Node, ReactFlow } from "@xyflow/react";
import BaseNodeDemo from "./BaseNode";
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  baseNode: BaseNodeDemo,
};

export default function ReactFlowCust({ nodes, edges, createNode }: { nodes: Node[], edges:Edge[], createNode: () => {} }) {return <ReactFlow nodes={nodes.map(n => ({ ...n, data: {...(n.data), createNewStep: createNode } }))} nodeTypes={nodeTypes} edges={edges} proOptions={{ hideAttribution: true }} />}