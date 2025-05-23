import exampleData1 from './data_Exemple1.json'

export type Log = {
    date: Date,
    DeviceType: string,
    Device: string,
    Action: string,
    UserFirstName: string,
    UserLastName: string
}

export function getData1(): Log[] {
    return exampleData1.map((content): Log => {
        let { date, ...rest } = content
        var dateObj = new Date(content.date);
        if (!date.toString().includes("+"))
            dateObj.setTime(dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000);
        return {
            date: dateObj,
            ...rest
        }
    })
}