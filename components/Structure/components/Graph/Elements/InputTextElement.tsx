import { useState } from "react";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

function InputTextElement({ id, onChange } : { id: string, onChange: (elementId:string, value:any) => void }) {
    const [description, setDescription] = useState<string>("")

    return (
        <div className="w-full h-fit rounded-lg hover:bg-opacity-30 hover:bg-gray-800 p-0 m-0">
            <AutosizeTextarea value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder="Ajouter une description à la zone de saisie"
                className="w-full h-fit wrap-anywhere italic placeholder:not-italic bg-transparent focus:bg-background"
                onBlur={() => onChange(id, description)}
            />        
        </div>
    )
}

export default InputTextElement