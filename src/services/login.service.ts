export const loginAdmin = async (email: string, password: string) => {
    if (email === "" || password === "") {
        return null;
    }

    const userbase = email.split("@")[0];

    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/admins/${userbase}.json`
        );

        const data = await response.json();

        if (data === null) {
            console.log({ data, response });
            return null;
        }

        if (data.pass !== password) {
            return null;
        }

        const user = {
            email: data.email,
            name: data.name,
        };

        return user;
    } catch (error) {
        return null;
    }
};
