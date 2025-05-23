import { Examples } from "./_components/examples"

export default async function EnhancedTableExamples() {
  const initialData = await fetch("http://localhost:3000/api/fake-data?count=1000").then((res) => res.json())

  return <Examples initialData={initialData} />
}

export const dynamic = "force-dynamic"
