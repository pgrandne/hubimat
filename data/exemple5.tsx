import exampleData5 from '@/data/data_Exemple5.json'

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

export const getData5 = (): Hardware[] => exampleData5