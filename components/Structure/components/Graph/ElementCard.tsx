import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ReactNode, useState } from "react";

function ElementCard({children, title, description, selected, setSelected} : {children:ReactNode, title:string, description:string, selected:boolean, setSelected:()=>void}) {

    return (
        <div className="relative">
            {selected &&
                <div className="absolute top-0 right-0 text-primary bg-gray-500 rounded-full">
                    <Check className="h-6 w-6" />
                </div>
            }
            <Card className="mt-2 mr-2 w-[13.5rem] h-[10rem] p-0 bg-transparent border border-gray-800 hover:cursor-pointer hover:border-gray-500"
                onClick={setSelected}
            >
            <CardHeader className="flex flex-col items-start space-y-2 p-4">
                {children}
                <CardTitle className="text-foreground text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            </Card>
        </div>
        
    )
}

export default ElementCard