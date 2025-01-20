import { AdminModel } from "@/models/admins.model";

export const getAdmins = async () => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/admins.json`
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const addNewAdmin = async (user: AdminModel) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/admins/${user.user}.json`,
            {
                method: "PUT",
                body: JSON.stringify(user),
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};

export const getAdminByCode = async (id: string) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/admins/${id}.json`
        );

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const udpateAdmin = async (userID: string, user: AdminModel) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/admins/${userID}.json`,
            {
                method: "PUT",
                body: JSON.stringify(user),
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};

export const deleteAdmin = async (userID: string) => {
    try {
        const response = await fetch(
            `https://success-academy-test-default-rtdb.firebaseio.com/admins/${userID}.json`,
            {
                method: "DELETE",
            }
        );
        return true;
    } catch (error) {
        return null;
    }
};
