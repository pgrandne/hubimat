import exampleData4 from './data_Exemple4.json'

type Log = {
    date: Date,
    DeviceType: string,
    Device: string,
    Action: string,
    UserFirstName?: string,
    UserLastName?: string
}

export const getData4 = (): Log[] => exampleData4.map( content => ({...content, date:new Date(content.date)}) )