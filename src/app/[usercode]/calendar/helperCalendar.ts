import moment from "moment";

export const getListOfDates = (date: Date, horarios: any[]) => {
    const today = moment(date);
    const days = [];

    for (let i = 1; i <= 7; i++) {
        const day = getDay(today.clone().add(i, "days").toDate(), horarios);

        if (day !== null) {
            days.push(day);
        }
    }

    return days;
};

const getDay = (date: Date, horarios: any[]) => {
    switch (date.getDay()) {
        case 1:
            return {
                day: "Monday",
                date: date.getDate(),
                month: getMonthName(date.getMonth() + 1),
                fullDate: `${date.getUTCFullYear()}-${
                    date.getUTCMonth() + 1
                }-${date.getDate()}`,
                hours: horarios[1],
            };
        case 2:
            return {
                day: "Tuesday",
                date: date.getDate(),
                month: getMonthName(date.getMonth() + 1),
                fullDate: `${date.getUTCFullYear()}-${
                    date.getUTCMonth() + 1
                }-${date.getUTCDate()}`,
                hours: horarios[2],
            };
        case 3:
            return {
                day: "Wednesday",
                date: date.getDate(),
                month: getMonthName(date.getMonth() + 1),
                fullDate: `${date.getUTCFullYear()}-${
                    date.getUTCMonth() + 1
                }-${date.getUTCDate()}`,
                hours: horarios[3],
            };
        case 4:
            return {
                day: "Thursday",
                date: date.getDate(),
                month: getMonthName(date.getMonth() + 1),
                fullDate: `${date.getUTCFullYear()}-${
                    date.getUTCMonth() + 1
                }-${date.getUTCDate()}`,
                hours: horarios[4],
            };
        case 5:
            return {
                day: "Friday",
                date: date.getDate(),
                month: getMonthName(date.getMonth() + 1),
                fullDate: `${date.getUTCFullYear()}-${
                    date.getUTCMonth() + 1
                }-${date.getUTCDate()}`,
                hours: horarios[5],
            };
        case 6:
            return {
                day: "Satunday",
                date: date.getDate(),
                month: getMonthName(date.getMonth() + 1),
                fullDate: `${date.getUTCFullYear()}-${
                    date.getUTCMonth() + 1
                }-${date.getUTCDate()}`,
                hours: horarios[6],
            };

        default:
            return null;
    }
};

const getMonthName = (month: number) => {
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "Unknown";
    }
};
