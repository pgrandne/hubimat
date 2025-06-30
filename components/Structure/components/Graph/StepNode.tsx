import { memo, useEffect, useRef, useState } from "react";
 
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { BaseNode } from "@/components/ui/base-node";
import { Button } from "@/components/ui/button";
import EditableText from "./EditableText"
import { ChevronDown, CircleCheck } from "lucide-react";
import RadioElement from "./Elements/RadioElement";
import BooleanElement from "./Elements/BooleanElement";
import InputTextElement from "./Elements/InputTextElement";
import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/contextMenu";
import SelectElementDialog, { FormElement } from "./SelectElementDialog";

const StepNode = memo(({ id, data, selected, positionAbsoluteY }: NodeProps) => {
    const [open, setOpen] = useState(true)
    const { getNodes, setNodes } = useReactFlow();
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (nodeRef.current) {
        console.log('Loaded StepNode ', id);
      }
    }, [id]);

    const [title , setTitle] = useState("")
    const [errorTitle , setErrorTitle] = useState(false)
    useEffect(() => { if (!errorTitle) {
        setNodes(prevNodes => prevNodes.map((node) => {
            const n = (node.id === id ? { ...node, data: {...node.data, title:title}} : node)
            return n
        }))
    }},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, errorTitle])

    const [elementList, setElementList] = useState<{ [elementId: string]: {type: string, data: any} }>({})
    const handleChange = (elementId:string, data:any) => {
        setElementList({ ...elementList, [elementId]:{...elementList[elementId], data}})
    }
    const createElement = (elementType: string, elementId: string, elementData: any) => {
        let element
        switch (elementType) {
            case FormElement.radio:
                element = <RadioElement key={elementId} id={elementId} defaultValue={elementData} onChange={handleChange} />
                break
            case FormElement.boolean:
                element = <BooleanElement key={elementId} id={elementId} onChange={handleChange} />
                break
            case FormElement.inputText:
                element = <InputTextElement key={elementId} id={elementId} onChange={handleChange} />
                break
        }
        return element
    }

    useEffect(()=>console.log(elementList), [elementList])

    return (
        <BaseNode ref={nodeRef} selected={selected} className={cn("p-2 w-[20rem] flex cursor-default hover:ring-0", data.visibility??"")}>
            <Handle type="target" position={Position.Top} isConnectable={false} className="opacity-0"/>
            <Handle type="source" position={Position.Bottom} isConnectable={false} className="opacity-0"/>
            
            <CircleCheck className="mt-1" />

            <div className="flex items-center flex-col w-full">

                <EditableText placeholder="Ajouter le nom de l'étape"
                    onChange={value => {
                        if (getNodes().map(node => node.data.title).includes(value)) {
                            alert("Une étape possède déjà ce nom. Veuillez renommer.")
                            setErrorTitle(true)
                            setTitle("[error] " + value)
                        }
                        else {
                            setErrorTitle(false)
                            setTitle(value)
                        }
                    }}
                />

                { open && Object.keys(elementList).map(
                    (elementId : string) =>
                        <ContextMenu key={`${elementList[elementId].type}-${elementId}`}>
                            <ContextMenuTrigger className="w-full">
                                { createElement(elementList[elementId].type, elementId, elementList[elementId].data) }
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-52">
                                <ContextMenuItem variant="destructive"
                                    onClick={() => setElementList(prev => {
                                        const { [elementId]: _, ...rest } = prev;
                                        return rest;
                                    })}
                                >Supprimer {elementList[elementId].type}</ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                )}
                    
                <SelectElementDialog className="mt-3" addElement={elementType => setElementList(prev => ({...prev, [String(Date.now())]: { type: elementType, data: undefined }}))} />
            </div>
             
            <Button variant="ghost" className="rounded-full py-0 px-2 h-8" onClick={() => setOpen(!open)}>
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