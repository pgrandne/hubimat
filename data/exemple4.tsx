import exampleData4 from '@/data/data_Exemple4.json'

// Define data type
export type Hardware = {
  id: string
  category: string
  hardwareType?: HardwareType
  label: string
  description: string
  hardwareParameters: HardwareParameters
  tests: boolean
  instance: number
}

export type HardwareType = {
  name: string,
  icon_source: string,
  toString: Function
}

export type HardwareParameters = {
  type: string,
  protocol: string,
  utl: number
}

// get the data and map it to its type (if we don't do that fields will be undefined when trying to cast to a custom type)
export function getData4(): Hardware[] {
  return exampleData4.map((content): Hardware => content)
}