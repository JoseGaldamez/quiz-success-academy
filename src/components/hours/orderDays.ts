export const orderHorarioDay = (horarios: string[]): string[] => {
    const result: string[] = [];

    if (horarios.includes("08:00 am - 09:00 am"))
        result.push("08:00 am - 09:00 am");
    if (horarios.includes("09:00 am - 10:00 am"))
        result.push("09:00 am - 10:00 am");
    if (horarios.includes("10:00 am - 11:00 am"))
        result.push("10:00 am - 11:00 am");
    if (horarios.includes("11:00 am - 12:00 am"))
        result.push("11:00 am - 12:00 am");
    if (horarios.includes("12:00 am - 01:00 pm"))
        result.push("12:00 am - 01:00 pm");
    if (horarios.includes("01:00 pm - 02:00 pm"))
        result.push("01:00 pm - 02:00 pm");
    if (horarios.includes("02:00 pm - 03:00 pm"))
        result.push("02:00 pm - 03:00 pm");
    if (horarios.includes("03:00 pm - 04:00 pm"))
        result.push("03:00 pm - 04:00 pm");
    if (horarios.includes("04:00 pm - 05:00 pm"))
        result.push("04:00 pm - 05:00 pm");
    if (horarios.includes("05:00 pm - 06:00 pm"))
        result.push("05:00 pm - 06:00 pm");

    return result;
};
