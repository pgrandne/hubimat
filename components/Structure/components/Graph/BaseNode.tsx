import { memo, useState } from "react";
 
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

enum FormElement {
  checklist = "Check-list",
  boolean = "Boolean",
  radio = "Radio",
}
 
const BaseNodeDemo = memo(({ selected }: NodeProps) => {
    const nodeId = useNodeId()
    const [addElementDialogOpen, setAddElementDialogOpen] = useState(false)
    const [elementList, setElementList] = useState<string[]>([])
    const [selectedField, setSelectedField] = useState("");

    return (
        <BaseNode selected={selected} className="p-2 w-[20rem] flex items-center flex-col cursor-default">
                <Handle type="target" position={Position.Top} isConnectable={false} className="opacity-0"/>
                <Handle type="source" position={Position.Bottom} isConnectable={false} className="opacity-0"/>
                
                <div key="step_number" className="m-3">Etape {nodeId}</div>

                {elementList.map((elementName, index) => {
                    switch (elementName) {
                        case "Select":
                            return (
                                <Select key={`select_${index}`} defaultValue={"1"}>
                                    <SelectTrigger className="mr-auto ml-4">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["1","2","3"].map(choix => <SelectItem key={`select_${index}_${choix}`} value={choix}>Choix {choix}</SelectItem>) }
                                    </SelectContent>
                                </Select>
                            )
                        case "checkbox":
                            return <span className="mr-auto ml-4"><Checkbox key={`checkbox_${index}`} className="mr-2" />A cocher</span>
                        case "text":
                            return <Input key={`input_${index}`} type="text" placeholder="Enter text here" className="w-[90%] mr-auto ml-4" />
                        case FormElement.radio:
                            return <RadioGroup defaultValue="option-one" className="opacity-50 mr-auto ml-4">
                                            Titre
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
                        default:
                            return <></>;
                    }
                }).map((e, index) => <>{e}<div key={`separator_${index}`} className="h-[1rem]"/></>)}
                {elementList.length > 0 && <Button key={`validate`} className="ml-auto mr-4" disabled={true}>Valider</Button>}

                <Dialog open={addElementDialogOpen} onOpenChange={(open) => {setAddElementDialogOpen(open); setSelectedField("");}}>
                    <DialogTrigger className="w-[90%] h-[2.5rem] mt-3 border rounded-md text-lg">
                        +
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
                                {["Select", "checkbox", "text"].map(elementName =>
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
        </BaseNode>
    );
});

BaseNodeDemo.displayName = "BaseNode"
export default BaseNodeDemo;