import exampleData1 from './data_Exemple1.json'

type Log = {
    date: Date,
    DeviceType: string,
    Device: string,
    Action: string,
    UserFirstName?: string,
    UserLastName?: string
}

export const getData1 = (): Log[] => exampleData1.map( content => ({...content, date:new Date(content.date)}) )
