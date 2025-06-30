import EditableText from "../EditableText";
import { Button } from "@/components/ui/button";
import LinkableWrapper from "./LinkableWrapper";
import { useEffect, useState } from "react";

function BooleanElement({id,onChange}:{id:string,onChange:(elementId:string, value:any)=>void}) {
    const [data, setData] = useState<{linkedSteps:{yes?:string, no?:string}, title:string}>({linkedSteps:{yes:undefined, no:undefined}, title:""})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => onChange(id, data), [data])

    return (
        <div className="w-full rounded-lg hover:bg-opacity-30 hover:bg-gray-800 my-2 space-y-2">
            <EditableText placeholder="Ajouter un titre" onChange={value => setData({...data, title:value})} />
            <LinkableWrapper onChange={newStepId => setData({...data, linkedSteps:{...data.linkedSteps, yes:newStepId}})}>
                <Button variant="secondary" className="py-0 px-2 w-fit h-fit mr-auto">Oui</Button>
            </LinkableWrapper>
            <LinkableWrapper onChange={newStepId => setData({...data, linkedSteps:{...data.linkedSteps, no:newStepId}})}>
                <Button variant="secondary" className="py-0 px-2 w-fit h-fit mr-auto">Non</Button>
            </LinkableWrapper>            
        </div>
    )
}

export default BooleanElement