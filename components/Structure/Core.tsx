"use client";

import { getData1 } from "@/data/example1"
import { Examples } from "../../app/examples"


export const Core = async () => {
  const initialData = await getData1().then((res) => res)

  return (
    <div className="container py-8" style={{width:'100%', margin:'0.8rem', borderWidth:'1px', borderRadius:'0.5em'}}>
        <Examples initialData={initialData} />
    </div>
  )

}

export const dynamic = "force-dynamic"