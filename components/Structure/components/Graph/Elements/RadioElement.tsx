import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EditableText from "../EditableText";
import { Label } from "@/components/ui/label";
import LinkableWrapper from "./LinkableWrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/contextMenu";

function RadioElement({ id, defaultValue, onChange } : { id: string, defaultValue: any, onChange: (elementId:string, value:any) => void }) {

    const [items, setItems] = useState<{value:string, linkedStep?:string}[]>([{value:"", linkedStep:undefined},{value:"", linkedStep:undefined}])
    const [title, setTitle] = useState<string>("")

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>onChange(id, {title: title, items:items}),[title, items])

    return (
        <div className="w-full rounded-lg hover:bg-opacity-30 hover:bg-gray-800">
            <RadioGroup key={`radio`} defaultValue="option-one" className="mr-auto gap-0">
                <EditableText placeholder="Ajouter un titre" onChange={setTitle}/>
                { items.map(({value:itemText, linkedStep}, index: number) =>
                    <LinkableWrapper key={"radio_item-"+String(index)+"-"+itemText} className="flex items-center space-x-2"
                        defaultValue={linkedStep??""}
                        onChange={newStepId => setItems(items.map( (item,i) => i===index ? {...item, linkedStep:newStepId} : item ))}
                    >
                        <RadioGroupItem value={`option-${index}`} id={`option-${index}`} className="pointer-events-none" />
                        <Label htmlFor={itemText} onClick={e => e.preventDefault()} className="flex items-center w-full">
                            <ContextMenu key={`context_menu-${index}-${itemText}`}>
                                <ContextMenuTrigger className="w-full">
                                    <EditableText placeholder={`Choix n°${index+1}`} defaultValue={itemText} 
                                        onChange={ value => {
                                            setItems(items.map( (item,i) => i===index ? {...item, value} : item ))
                                        }}
                                    />
                                </ContextMenuTrigger>
                            <ContextMenuContent className="w-52">
                                <ContextMenuItem variant="destructive" onClick={()=>setItems(items.filter((_, i) => i !== index))}>Supprimer {`Choix n°${index+1}`}</ContextMenuItem>
                            </ContextMenuContent>
                            </ContextMenu>
                        </Label>
                    </LinkableWrapper>
                )}
            </RadioGroup>
            <Button variant="ghost" className="w-full flex items-center border border-dashed px-1 py-1 h-fit text-xs bg-transparent"
                onClick={() => setItems(items.concat({value:"", linkedStep:undefined}))}
            ><Plus className="h-5 w-5 mr-2"/>Ajouter un élément</Button>
        </div>
    )
}

export default RadioElement