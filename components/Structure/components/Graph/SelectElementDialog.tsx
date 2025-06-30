import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SquareCheckBig, Plus, Search, TextCursorInput } from "lucide-react";
import { useState } from "react";
import ElementCard from "./ElementCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export enum FormElement {
  checklist = "Check-list",
  boolean = "Boolean",
  radio = "Radio",
  select = "Select",
  checkbox = "Check-box",
  text = "Texte",
  inputText = "Saisie utilisateur",
}

export default function SelectElementDialog({className, addElement} : {className: string, addElement: (elementName:string) => void}) {
    const [open, setOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState("")

    return (
        <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
            <DialogTrigger
                className={cn("w-full flex text-center text-sm rounded-lg border border-dashed px-1 py-1.5 h-fit border-gray-500 text-gray-500 opacity-50",
                    "hover:opacity-100 hover:border-transparent hover:bg-[#242930] transition-[border-transparent] transition-[opacity]",
                    className)}>
                <span className="mr-auto ml-auto flex items-center"><Plus className="h-5 w-5 mr-2"/>Ajouter un champ</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-[20px] leading-[100%] tracking-[0%] align-middle mb-4">
                        Ajouter un champ
                    </DialogTitle>
                    <div className="relative w-full max-w-[300px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Chercher un Type de Champ"
                            className="ml-0 pl-10 w-full"
                        />
                    </div>
                </DialogHeader>
                
                <div className="flex flex-wrap gap-y-4 justify-between">
                    <ElementCard title="Check-list" description="Liste de tâche(s) à effectuer"
                        selected={selectedCard===FormElement.radio} setSelected={() => setSelectedCard(FormElement.radio)}
                    >
                        <SquareCheckBig className="h-5 w-5 text-primary" />
                    </ElementCard>
                    <ElementCard title='Choix - Bouton "Boolean"' description="Choix entre deux possibilités"
                        selected={selectedCard===FormElement.boolean} setSelected={() => setSelectedCard(FormElement.boolean)}
                    >
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                            <div className="w-4 h-4 rounded-full bg-gray-400" />
                        </div>
                    </ElementCard>
                    <ElementCard title="Texte - Zone de saisie" description="Champ permettant à l’utilisateur de saisir des informations."
                        selected={selectedCard===FormElement.inputText} setSelected={() => setSelectedCard(FormElement.inputText)}
                    >
                        <TextCursorInput className="h-5 w-5 text-primary" />
                    </ElementCard>
                </div>
                
                <DialogFooter>
                    <Button variant="destructive" onClick={()=>setOpen(false)}>Annuler</Button>
                    <Button onClick={() => {setOpen(false); setSelectedCard(""); addElement(selectedCard)}}>Ajouter</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}