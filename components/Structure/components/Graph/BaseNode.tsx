import { memo, useRef, useState } from "react";
 
import { Handle, NodeProps, Position, useNodeId } from "@xyflow/react";
import { BaseNode } from "@/components/ui/base-node";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import EditableText from "./EditableText"

enum FormElement {
  checklist = "Check-list",
  boolean = "Boolean",
  radio = "Radio",
  select = "Select",
  checkbox = "Check-box",
  text = "Texte"
}

 
const BaseNodeDemo = memo(({ data, selected, positionAbsoluteY }: NodeProps) => {
    const nodeId = useNodeId()
    const [addElementDialogOpen, setAddElementDialogOpen] = useState(false)
    const [addStepDialogOpen, setAddStepDialogOpen] = useState(false)
    const [elementList, setElementList] = useState<string[]>([])
    const [selectedField, setSelectedField] = useState("");
    const nodeRef = useRef()
    const [isOver, setIsOver] = useState("")

    return (
        <BaseNode ref={nodeRef} selected={selected} className="p-2 w-[20rem] flex items-center flex-col cursor-default" onVolumeChange={(v) => console.log(v)}>
                <Handle type="target" position={Position.Top} isConnectable={false} className="opacity-0"/>
                <Handle type="source" position={Position.Bottom} isConnectable={false} className="opacity-0"/>
                
                <div key="step_number" className="m-3">Etape {nodeId}</div>

                {elementList.map((elementName, index) => {
                    switch (elementName) {
                        case "Select":
                            return (
                                <Select key={`select_${index}`} defaultValue={"1"}>
                                    <SelectTrigger className="mr-auto ml-4 mb-3 pointer-events-none opacity-50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["1","2","3"].map(choix => <SelectItem key={`select_${index}_${choix}`} value={choix}>Choix {choix}</SelectItem>) }
                                    </SelectContent>
                                </Select>
                            )
                        case FormElement.checkbox:
                            return <span className="mr-auto ml-4 mb-3 pointer-events-none opacity-50"><Checkbox key={`checkbox_${index}`} className="mr-2" />A cocher</span>
                        case FormElement.text:
                            return <Input key={`input_${index}`} type="text" placeholder="Enter text here" className="w-[90%] mr-auto ml-4 mb-3 pointer-events-none opacity-50" />
                        case FormElement.radio:
                            return (<div className="w-full border border-transparent hover:border-white" onPointerEnter={(e) => setIsOver(`radio_${index}`)} onPointerLeave={() => setIsOver("")}>
                                
                                <RadioGroup key={`radio_${index}`} defaultValue="option-one" className="opacity-50 mr-auto ml-4 mb-3">
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
                                        {isOver === `radio_${index}` && <Button className="mr-auto">+</Button>}
                                        </div>)
                        default:
                            return <></>;
                    }
                })}
                {elementList.length > 0 && <Button key={`validate`} className="ml-auto mr-4" disabled={true}>Valider</Button>}
                
                <div className="flex w-full gap-4">
                <Dialog open={addElementDialogOpen} onOpenChange={(open) => {setAddElementDialogOpen(open); setSelectedField("");}}>
                    <DialogTrigger className="w-full h-[2.5rem] mt-3 border rounded-md text-md">
                        Ajouter un champ
                    </DialogTrigger>
                    <DialogContent className="max-w-[80%] max-h-[80%] aspect-square flex flex-col gap-4">
                        { selectedField==="" && <>
                            <DialogHeader>
                                <DialogTitle>Ajouter un élément</DialogTitle>
                                <DialogDescription>
                                Tst
                                </DialogDescription>
                            </DialogHeader>

                            <Input type="text" placeholder="Rechercher" className="w-full border mt-3" />

                            <div className="w-full flex flex-wrap min-h-fit-content mt-5">
                            
                            {/* <Select value={selectedField} onValueChange={setSelectedField}>
                                <SelectTrigger className="w-full border rounded-md p-2">
                                    {selectedField || "Choisissez un Type de Champ"}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="check-list">✅ Check-list - Liste de tâche(s) à effectuer</SelectItem>
                                    <SelectItem value="boolean">🔘 Choix - Bouton &quot;Boolean&quot; (2 options)</SelectItem>
                                    <SelectItem value="radio">📻 Choix - Bouton Radio (1 parmi plusieurs)</SelectItem>
                                    <SelectItem value="single-choice-list">📋 Choix - Liste (1 choix parmi plusieurs)</SelectItem>
                                    <SelectItem value="multi-selection-list">📌 Choix - Liste multi-sélection</SelectItem>
                                    <SelectItem value="commands">⚙️ Commande(s) - Exécution de commandes</SelectItem>
                                    <SelectItem value="text-info">📝 Texte - Information / Consigne</SelectItem>
                                    <SelectItem value="text-input">✍️ Texte - Zone de saisie</SelectItem>
                                </SelectContent>
                            </Select> */}
                            <Card className="m-auto p-0 w-[12rem] h-[12rem] cursor-pointer mb-5" onClick={() => {setElementList(elementList.concat(["checklist"])); setAddElementDialogOpen(false)}}>
                                <CardHeader className="px-4 pt-4 pb-0 mb-2">
                                    <CardTitle className="text-lg">✅ Check-list</CardTitle>
                                    <CardDescription className="text-sm">Liste de tâche(s) à effectuer</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* <div className="absolute inset-x-5 inset-y-0 bottom-5 bg-gray-500 opacity-50"></div> */}
                                    <div className="border px-3 py-1">
                                    <div className="opacity-50 pointer-events-none"><Checkbox /> Tâche 1</div>
                                    <div className="opacity-50 pointer-events-none"><Checkbox /> Tâche 2</div>
                                    <div className="opacity-50 pointer-events-none"><Checkbox /> Tâche 3</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="m-auto p-0 w-[12rem] h-[12rem] cursor-pointer mb-5" onClick={() => {setElementList(elementList.concat(["boolean"])); setAddElementDialogOpen(false)}}>
                                <CardHeader className="px-4 pt-4 pb-0 mb-2">
                                    <CardTitle className="text-lg">🔘 Choix</CardTitle>
                                    <CardDescription className="text-sm">Bouton &quot;Boolean&quot; (2 options)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="border p-3">
                                        <RadioGroup defaultValue="option-one" className="opacity-50">
                                            <div className="flex items-center space-x-2 pointer-events-none">
                                                <RadioGroupItem value="option-one" id="option-one" />
                                                <Label htmlFor="option-one">Option une</Label>
                                            </div>
                                            <div className="flex items-center space-x-2 pointer-events-none">
                                                <RadioGroupItem value="option-two" id="option-two" />
                                                <Label htmlFor="option-two">Option deux</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="m-auto p-0 w-[12rem] h-[12rem] cursor-pointer mb-5" onClick={() => setSelectedField(FormElement.radio)}>
                                <CardHeader className="px-4 pt-4 pb-0 mb-2">
                                    <CardTitle className="text-lg">📻 Choix multiples</CardTitle>
                                    <CardDescription className="text-sm">Bouton Radio (1 parmi plusieurs)</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="border p-3">
                                        <RadioGroup defaultValue="option-one" className="opacity-50">
                                            <div className="flex items-center space-x-2 pointer-events-none">
                                                <RadioGroupItem value="option-one" id="option-one" />
                                                <Label htmlFor="option-one">Choix un</Label>
                                            </div>
                                            <div className="flex items-center space-x-2 pointer-events-none">
                                                <RadioGroupItem value="option-two" id="option-two" />
                                                <Label htmlFor="option-two">Choix deux</Label>
                                            </div>
                                            <div className="flex items-center space-x-2 pointer-events-none">
                                                <RadioGroupItem value="option-two" id="option-two" />
                                                <Label htmlFor="option-two">Choix trois</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </CardContent>
                            </Card>
                                {[FormElement.select, FormElement.checkbox, FormElement.text].map(elementName =>
                                    <Button key={`button_${elementName}`} variant={'outline'} className="w-[12rem] h-[12rem] m-auto mb-5"
                                        onClick={()=>{ setElementList(elementList.concat([elementName])); setAddElementDialogOpen(false)}}
                                    >
                                        {elementName}
                                    </Button>)
                                }
                            </div>
                            <div className="w-[28rem] flex">
                                
                            </div>
                        </>}

                        { selectedField === FormElement.radio && <>
                            <DialogHeader>
                                <DialogTitle>Ajouter un élément Radio</DialogTitle>
                                <DialogDescription>
                                    Boutons Radio (1 parmi plusieurs)
                                </DialogDescription>
                            </DialogHeader>
                            <Input type="text" placeholder="Titre" className="w-full border" />
                            
                            <Button className="w-[60%] mx-auto" variant={"outline"}>(+) Ajouter un choix</Button>
                        </>}
                        { selectedField !== "" && <>
                            <div className="mt-auto ml-auto">
                                <span><Checkbox className="mr-2" />Champ obligatoire</span>
                                <Button className="w-[10rem] ml-4" variant={"outline"} onClick={() => {
                                    setElementList(elementList.concat(selectedField))
                                    setAddElementDialogOpen(false)
                                }}>Ajouter</Button>
                            </div>
                            
                        </>}
                        
                    </DialogContent>
                </Dialog>

                <Dialog open={addStepDialogOpen} onOpenChange={setAddStepDialogOpen}>
                    <DialogTrigger className="w-full h-[2.5rem] mt-3 border rounded-md text-md">
                        Nouvelle étape
                    </DialogTrigger>
                    <DialogContent className="max-h-[60%] aspect-[9/16]  flex flex-col gap-4">
                        <DialogHeader className="mb-4">
                            <DialogTitle>Connecter une nouvelle étape</DialogTitle>
                            <DialogDescription>
                                Explications de comment ça marche
                            </DialogDescription>
                        </DialogHeader>
                        
                        {elementList.map((elementName, index) => {
                            switch (elementName) {
                                case "Select":
                                    return (
                                        <div className="flex w-full gap-4 items-center">
                                            <Select key={`select_${index}`} defaultValue={"1"}>
                                                <SelectTrigger className="mr-auto ml-4">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["1","2","3"].map(choix => <SelectItem key={`select_${index}_${choix}`} value={choix}>Choix {choix}</SelectItem>) }
                                                </SelectContent>
                                            </Select>
                                            <span className="mr-auto ml-4 flex items-center"><Switch key={`slider_${index}`} className="mr-2" />Ignorer</span>
                                        </div>
                                    )
                                case FormElement.checkbox:
                                    return (<div className="flex w-full gap-4 items-center">
                                        <span className="mr-auto ml-4"><Checkbox key={`checkbox_${index}`} className="mr-2" />A cocher</span>
                                        <span className="mr-auto ml-4 flex items-center"><Switch key={`slider_${index}`} className="mr-2" />Ignorer</span>
                                    </div>)
                                case FormElement.radio:
                                    return (<div className="flex w-full gap-4 items-center">
                                        <RadioGroup defaultValue="option-one-new-step" className="mr-auto ml-4">
                                            Titre
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="option-one-new-step" id="option-one-new-step" />
                                                <Label htmlFor="option-one">Choix un</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="option-two-new-step" id="option-two-new-step" />
                                                <Label htmlFor="option-two">Choix deux</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="option-three-new-step" id="option-three-new-step" />
                                                <Label htmlFor="option-three">Choix trois</Label>
                                            </div>
                                        </RadioGroup>
                                        <span className="mr-auto ml-4 flex items-center"><Switch key={`slider_${index}`} className="mr-2" />Ignorer</span>
                                    </div>)
                                default:
                                    return <></>;
                            }
                        }).map((e, index) => <>{e}<div key={`separator_${index}`} className="h-[1rem]"></div></>)}

                        <div className="mt-auto ml-auto">
                            <Button className="w-[10rem] ml-4" variant={"outline"} onClick={() => {
                                data.createNewStep((positionAbsoluteY ?? 0) + ((nodeRef.current) ? nodeRef.current.getBoundingClientRect().height : 0))
                                setAddStepDialogOpen(false)
                            }}>Créer une nouvelle étape</Button>
                        </div>
                    </DialogContent>
                </Dialog>
                </div>
        </BaseNode>
    );
});

BaseNodeDemo.displayName = "BaseNode"
export default BaseNodeDemo;