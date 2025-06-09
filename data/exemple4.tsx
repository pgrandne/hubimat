import exampleData4 from './data_Exemple4.json'

type Log = {
    date: Date,
    DeviceType: string,
    Device: string,
    Action: string,
    UserFirstName?: string,
    UserLastName?: string
}

export function getData4(): Log[] {
    return exampleData4.map((content): Log => {
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