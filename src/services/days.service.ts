export const getDay = async (dayDate: string, hour: string) => {
    const response = await fetch(
        `https://success-academy-test-default-rtdb.firebaseio.com/days/${dayDate}/${hour}.json`
    );
    const data = await response.json();
    return data;
};

export const registerDayEndHour = async (
    dayDate: string,
    hour: string,
    id: string
) => {
    const response = await fetch(
        `https://success-academy-test-default-rtdb.firebaseio.com/days/${dayDate}/${hour
            .replaceAll(":", "")
            .replaceAll(" ", "")}.json`,
        {
            method: "POST",
            body: JSON.stringify({
                id,
            }),
        }
    );
    const data = await response.json();
    return data;
};
